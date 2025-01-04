import { HttpResponse, http } from "msw";

import { BACKEND } from "./const.ts";
import jokes from "./jokes.json";

export const handlers = [
  http.get(`${BACKEND}/`, () => HttpResponse.json({ status: "ok" })),
  http.get(`${BACKEND}/goodJokes`, () => HttpResponse.json(jokes)),
];
