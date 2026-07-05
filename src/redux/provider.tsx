"use client"
import React from 'react'
import { Provider } from 'react-redux'
import { store } from "./store";

import Context_provider from "./Context_provider";

function Provider_parent({ children }: { children: React.ReactNode }) {

  return (
    <Provider store={store}>
      <Context_provider>
        {children}
      </Context_provider>
    </Provider>
  )
}

export default Provider_parent