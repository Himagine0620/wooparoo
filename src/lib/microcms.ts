//SDK利用準備
import type { MicroCMSQueries } from "microcms-js-sdk";
import { createClient } from "microcms-js-sdk";
import type { Image } from "../types/image";

const client = createClient({
  serviceDomain: process.env.MICROCMS_SERVICE_DOMAIN || import.meta.env.MICROCMS_SERVICE_DOMAIN,
  apiKey: process.env.MICROCMS_API_KEY || import.meta.env.MICROCMS_API_KEY,
});

//型定義
export type Wooparoo = {
  name: string;
  image: Image;
  egg_image: Image;
  type: string[];
  time: string[];
};
export type WooparooResponse = {
  contents: Wooparoo[];
}

//APIの呼び出し
export const getWooparoos = async (queries?: MicroCMSQueries) => {
  return await client.get<WooparooResponse>({ endpoint: "wooparoos", queries });
};