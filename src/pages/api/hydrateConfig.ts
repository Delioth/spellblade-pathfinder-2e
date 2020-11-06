import { NextApiRequest, NextApiResponse } from "next";
import { hydratePageConfig } from "../[context]";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const config = JSON.parse(req.body);

  const pages = config.pages.map(hydratePageConfig);

  res.send({ pages: await Promise.all(pages) })
}