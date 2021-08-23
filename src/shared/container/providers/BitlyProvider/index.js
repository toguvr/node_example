import { BitlyClient } from 'bitly';

const bitly = new BitlyClient(process.env.BITLY_AUTH_TOKEN, {});

export default async function shortUrl(url) {
  try {
    const result = await bitly.shorten(url);

    return result.link;
  } catch (e) {
    throw e;
  }
}
