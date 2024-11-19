import { db } from '~/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { redis } from '~/utils/redis.server';
import type { LoaderData } from '~/types/currency';
import type { TypedResponse } from '@remix-run/cloudflare';
import { getCollection } from '~/lib/google.cloud';
export async function loader(): Promise<TypedResponse<LoaderData>> {
  try {
    const cachedData = await redis.get('exchange_rates');

    if (cachedData) {
      const parsedData = typeof cachedData === 'string' ? JSON.parse(cachedData) : cachedData;
      return new Response(
        JSON.stringify({
          rates: parsedData,
          source: 'cache',
        }),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ) as TypedResponse<LoaderData>;
    }

    
    const firestoreCollection = await getCollection();

    if (firestoreCollection.empty) {
      return new Response(
        JSON.stringify({
          rates: { latest: { currencies: {} } },
          error: 'Döviz kuru verisi bulunamadı',
          source: 'firestore',
        }),
        {
          status: 404,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ) as TypedResponse<LoaderData>;
    }

    
    // Cache the data
    await redis.set('exchange_rates', JSON.stringify(firestoreCollection), {
      ex: 3600,
    });

    return new Response(
      JSON.stringify({
        rates: firestoreCollection,
        source: 'firestore',
      }),
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ) as TypedResponse<LoaderData>;
  } catch (error: any) {
    console.error('Döviz kurları yüklenirken hata:', error);
    const errorMessage =
      error.code === 'permission-denied'
        ? 'Döviz kurlarına erişim izniniz bulunmuyor'
        : 'Döviz kurları yüklenemedi';

    return new Response(
      JSON.stringify({
        rates: { latest: { currencies: {} } },
        error: errorMessage,
        source: 'firestore',
      }),
      {
        status: error.code === 'permission-denied' ? 403 : 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ) as TypedResponse<LoaderData>;
  }
}
