import { json, type LoaderFunctionArgs } from '@remix-run/node';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '~/lib/firebase';
import { redis } from '~/utils/redis.server';
import { slugToCode } from '~/utils/slugToCode';
import type { CurrencyRateLoaderData } from '~/types/currency';

export async function loader({ params }: LoaderFunctionArgs) {
  const { currency, rate } = params;
  const currencySlug = slugToCode(currency);

  console.log('Debug - Params:', { currency, rate, currencySlug });

  try {
    // Try to get exchange rates from Redis first
    const cachedData = await redis.get('exchange_rates');
    let exchangeRates;

    if (cachedData) {
      try {
        exchangeRates = JSON.parse(cachedData);
        console.log('Debug - Using cached data');
      } catch (e) {
        console.error('Debug - Failed to parse cached data:', e);
        exchangeRates = null;
      }
    }

    if (!exchangeRates) {
      console.log('Debug - Fetching from Firestore');
      // If no cached data or parse failed, fetch from Firestore
      const ratesCollection = collection(db, 'exchange_rates');
      const snapshot = await getDocs(ratesCollection);

      if (snapshot.empty) {
        console.log('Debug - Firestore snapshot is empty');
        throw new Response('Exchange rate data not available', {
          status: 404,
          statusText: 'Not Found',
        });
      }

      exchangeRates = {};
      snapshot.forEach((doc) => {
        exchangeRates[doc.id] = doc.data();
      });

      // Cache the data in Redis for 1 hour
      await redis.set('exchange_rates', JSON.stringify(exchangeRates), {
        ex: 3600,
      });
    }

    console.log('Debug - Exchange Rates:', exchangeRates);
    console.log('Debug - Looking for currency:', currencySlug);

    const currentRate = exchangeRates?.latest?.currencies?.[currencySlug];
    console.log('Debug - Current Rate:', currentRate);

    if (!currentRate) {
      console.log('Debug - Currency not found');
      throw new Response('Currency not found', {
        status: 404,
        statusText: 'Currency Not Found',
      });
    }

    const currencyCode = currentRate.code || currencySlug.toUpperCase();

    // Parse rate from URL
    const parts = rate?.split('-') || ['1'];
    const numericAmount = parts.length > 1 ? `${parts[0]}.${parts[1]}` : parts[0];
    const numericRate = parseFloat(numericAmount);

    if (isNaN(numericRate)) {
      console.log('Debug - Invalid rate value');
      throw new Response('Invalid rate value', {
        status: 400,
        statusText: 'Bad Request',
      });
    }

    const sellingRate = parseFloat(currentRate.selling_rate.replace(',', '.'));
    if (isNaN(sellingRate)) {
      console.log('Debug - Invalid selling rate');
      throw new Response('Invalid selling rate', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    }

    const calculation = {
      currencyCode,
      currencySlug,
      currencyName: currentRate.name,
      currencyHref: currency,
      rate: numericRate,
      converted: {
        TRY: numericRate * sellingRate,
        [currencyCode]: numericRate,
      },
      currentRate,
    };

    console.log('Debug - Final calculation:', calculation);

    return json<CurrencyRateLoaderData>({
      calculation,
      source: cachedData ? 'cache' : 'firestore',
    });
  } catch (error) {
    console.error('Debug - Currency rate loading error:', error);

    // Eğer error bir Response ise, direkt olarak fırlat
    if (error instanceof Response) {
      throw error;
    }

    // Diğer hatalar için genel bir hata mesajı
    throw new Response('Failed to load currency rate', {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
}
