//SDK利用準備
import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import type { Image } from "../types/image";

const client = createClient({
  serviceDomain: import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.MICROCMS_API_KEY,
});

//型定義
export type Wooparoo = {
  wooparoo_id: number;
  name: string;
  image?: Image;
  egg_image?: Image;
  type: string[];
  time: string[];
};
export type WooparooResponse = {
  contents: Wooparoo[];
}

//APIの呼び出し
export const getWooparoos = async (queries?: MicroCMSQueries) => {
  try {
    // 2つのリクエストを並列で実行
    const [firstBatch, secondBatch] = await Promise.all([
      client.get<WooparooResponse>({
        endpoint: "wooparoos",
        queries: { ...queries, limit: 100, offset: 0 },
      }),
      client.get<WooparooResponse>({
        endpoint: "wooparoos",
        queries: { ...queries, limit: 100, offset: 101 },
      }),
    ]);

    // データの結合
    const combinedContents = [...firstBatch.contents, ...secondBatch.contents];

    return combinedContents;
  } catch (error) {
    console.error("Error fetching wooparoos:", error);
    return [];
  }
};
