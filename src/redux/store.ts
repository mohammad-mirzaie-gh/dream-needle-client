
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";
 
import authSlice from "./authSlice/authSlice";
import userSlice from "./userSlice/userSlice";
import modalSlice from "./modalSlice/modalSlice";
import categorySlice from "./category/categorySlice";
import productSlice from "./product/productSlice";
import templateSlice from "./templateSlice/templatesSlice";
import cartSlice from "./cartSlice/cartSlice";
import codepostSlice from "./codepostSlice/codepostSlice";
import orderSlice from "./orderSlice/orderSlice";
import paymentSlice from "./paymentSlice/paymentSlice";

export const store = configureStore({
    reducer: {
      authSlice,
      userSlice,
      modalSlice,
      categorySlice,
      productSlice,
      templateSlice,
      cartSlice,
      codepostSlice,
      orderSlice,
      paymentSlice
    },
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

