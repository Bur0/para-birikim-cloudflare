import { json } from "@remix-run/cloudflare";
import { redis } from "~/utils/redis.server";
import type { LoaderData } from "~/types/currency";
import { getCollection } from "~/lib/google.cloud";

const CACHE_KEY = "exchange_rates";
const CACHE_DURATION = 3600; // 1 saat

async function getCurrencyData() {
  try {
    // 1. Cache'den veriyi al
    const cachedData = await redis.get(CACHE_KEY);
    if (cachedData) {
      return {
        data: typeof cachedData === "string" ? JSON.parse(cachedData) : cachedData,
        source: "cache",
      };
    }

    // 2. Firestore'dan veriyi al
    const firestoreData = await getCollection();
    if (!firestoreData || !firestoreData.currencies) {
      throw new Error("Döviz kuru verisi bulunamadı");
    }

    // 3. Veriyi cache'le
    await redis.set(CACHE_KEY, JSON.stringify(firestoreData), {
      ex: CACHE_DURATION,
    });

    return { data: firestoreData, source: "firestore" };
  } catch (error: any) {
    throw {
      message:
        error.code === "permission-denied"
          ? "Döviz kurlarına erişim izniniz bulunmuyor"
          : "Döviz kurları yüklenemedi",
      status: error.code === "permission-denied" ? 403 : 500,
      code: error.code,
    };
  }
}

export async function loader() {
  try {
    const { data, source } = await getCurrencyData();
    return json<LoaderData>({ rates: data, source });
  } catch (error: any) {
    return json<LoaderData>(
      {
        rates: { currencies: {} },
        error: error.message,
        source: "error",
      },
      {
        status: error.status || 500,
      }
    );
  }
}
