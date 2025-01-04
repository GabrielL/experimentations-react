import { HttpResponse, http } from "msw";

import { BACKEND } from "./const.ts";

export const handlers = [
  http.get(`${BACKEND}/`, () => HttpResponse.json({ status: "ok" })),
];
