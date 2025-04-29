import { act, renderHook, waitFor } from "@testing-library/react";
import fetchMock from "jest-fetch-mock";

// eslint-disable-next-line import/no-restricted-paths
import { BACKEND } from "@/server/const.ts";
// eslint-disable-next-line import/no-restricted-paths
import * as data from "@/server/jokes.json";
import { store } from "@/store.ts";
import { StoreDecorator } from "@/utils/tests/redux.tsx";

import { useJokes } from "@services/jokeService.ts";
import { selectAllJokes } from "@services/jokeSlice.ts";

fetchMock.enableMocks();

beforeAll(() => {
  fetchMock.mockOnceIf(`${BACKEND}/goodJokes`, () =>
    Promise.resolve({
      status: 200,
      body: JSON.stringify(data),
    }),
  );
});

test("should be ok", () => {
  expect(true);
});

test("jokes should start empty", () => {
  const jokes = selectAllJokes(store.getState());
  expect(jokes).toEqual([]);
});

test("when loading is finished, jokes should be available", async () => {
  const { result } = renderHook(() => useJokes(), { wrapper: StoreDecorator });

  await waitFor(() => expect(result.current.isLoading).toBe(false));

  expect(result.current.jokes.length).toBeGreaterThan(0);
});

test("display a joke", async () => {
  const { result } = renderHook(() => useJokes(), { wrapper: StoreDecorator });

  await waitFor(() => expect(result.current.isLoading).toBe(false));

  act(() => {
    result.current.selectJoke(1);
    result.current.viewJoke();
  });

  expect(result.current.displayedJoke?.id).toBe(1);
});
