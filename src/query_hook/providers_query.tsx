"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { useState } from "react";

function Providers_query({ children }: { children: React.ReactNode }) {
  const [query] = useState(new QueryClient());
  return <QueryClientProvider client={query}>{children}</QueryClientProvider>;
}

export default Providers_query;
