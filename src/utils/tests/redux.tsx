import { PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { store } from "@/store.ts";

export function StoreDecorator({ children }: PropsWithChildren) {
  return <Provider store={store}>{children}</Provider>;
}
