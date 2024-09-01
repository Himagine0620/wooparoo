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
  return await client.get<WooparooResponse>({ endpoint: "wooparoos", queries: { ...queries, limit: 100} });
};