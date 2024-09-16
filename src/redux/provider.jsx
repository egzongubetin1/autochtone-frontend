"use client";
import { Provider } from "react-redux";
import React from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { store } from "./store";
import client from "../services/AuthService/queryClient";
import AuthWrapper from "../route/auth/AuthWrapper";

export function Providers({ children }) {
  return (
    <Provider
      store={store}
      serverState={{
        auth: { user: null, isAuthenticated: false, fetchStatus: "pending" },
        cart: { cart: [], total: 0, subTotal: 0, status: "idle", error: null },
        wishlist: { wishlistItems: [], loading: false, error: null },
      }}
    >
      <QueryClientProvider client={client}>
        <AuthWrapper>{children}</AuthWrapper>
      </QueryClientProvider>
    </Provider>
  );
}
