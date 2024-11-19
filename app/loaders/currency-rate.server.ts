import { json, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { redis } from "~/utils/redis.server";
import { slugToCode } from "~/utils/slugToCode";
import type { CurrencyRateLoaderData } from "~/types/currency";
import { getCollection } from "~/lib/google.cloud";

export async function loader({ params }: LoaderFunctionArgs) {
  const { currency, rate = "1" } = params;
  const currencySlug = slugToCode(currency);

  console.log("Debug - Params:", { currency, rate, currencySlug });

  try {
    // Redis'ten önce döviz kurlarını almayı dene
    const cachedData = await redis.get("exchange_rates");
    let exchangeRates;

    if (cachedData) {
      try {
        exchangeRates = cachedData;
        console.log("Debug - Cache'den veri alındı");
      } catch (e) {
        console.error("Debug - Cache verisi parse edilemedi:", e);
        exchangeRates = null;
      }
    }

    if (!exchangeRates) {
      console.log("Debug - Firestore'dan veri alınıyor");
      const firestoreData = await getCollection();

      if (!firestoreData || !firestoreData.currencies) {
        console.log("Debug - Firestore'dan veri alınamadı");
        throw new Response("Döviz kuru verisi bulunamadı", {
          status: 404,
          statusText: "Not Found",
        });
      }

      exchangeRates = firestoreData;

      // Veriyi Redis'te 1 saat süreyle cache'le
      await redis.set("exchange_rates", JSON.stringify(exchangeRates), {
        ex: 3600,
      });
    }

    // Döviz kuru hesaplaması
    const targetCurrency = exchangeRates.currencies[currencySlug];

    console.log("Debug - Hesaplanacak para birimi:", currency, targetCurrency);

    if (!targetCurrency) {
      throw new Response("Para birimi bulunamadı", {
        status: 404,
        statusText: "Not Found",
      });
    }

    let calculation;
    if (rate) {
      const rateNumber = parseFloat(rate.replace(",", "."));
      if (isNaN(rateNumber)) {
        throw new Response("Geçersiz miktar", {
          status: 400,
          statusText: "Bad Request",
        });
      }

      const buyingRate = parseFloat(
        targetCurrency.buying_rate.replace(",", ".")
      );
      const sellingRate = parseFloat(
        targetCurrency.selling_rate.replace(",", ".")
      );

      calculation = {
        currencyCode: currencySlug,
        currencySlug: currency,
        amount: rateNumber,
        buyingTotal: (rateNumber * buyingRate).toFixed(4),
        sellingTotal: (rateNumber * sellingRate).toFixed(4),
      };
    }

    return json<CurrencyRateLoaderData>({
      calculation: calculation!,
      currentRate: targetCurrency,
      source: cachedData ? "cache" : "firestore",
    });
  } catch (error: any) {
    console.error("Döviz kuru hesaplanırken hata:", error);

    if (error instanceof Response) {
      throw error;
    }

    throw new Response(
      error.code === "permission-denied"
        ? "Döviz kurlarına erişim izniniz bulunmuyor"
        : "Döviz kurları yüklenemedi",
      {
        status: error.code === "permission-denied" ? 403 : 500,
        statusText:
          error.code === "permission-denied"
            ? "Permission Denied"
            : "Internal Server Error",
      }
    );
  }
}
