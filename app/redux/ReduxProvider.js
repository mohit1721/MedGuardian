"use client"; // ✅ This must be a client component

import { Provider } from "react-redux";
import store ,{persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

export default function ReduxProvider({ children }) {
  // return <Provider store={store}>{children}</Provider>;
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
