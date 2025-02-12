'use client';

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "@/redux/store";
import ServerLayout from "./serverLayout";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ServerLayout>{children}</ServerLayout>
      </PersistGate>
    </Provider>
  );
}
