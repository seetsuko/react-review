import { configureStore } from "@reduxjs/toolkit";
// authSlicer→authReducerはわかりやすいように名前変えてるだけ
import paginationReducer from "./paginationSlice";

// storeは状態のこと。どの状態を保持しているか管理する
export const store = configureStore({
  // state状態を更新するための裏側の仕組み
  reducer: {
    // 状態の名前：スライス名
    pagination: paginationReducer
  },
})

// どのコンポーネントでもつかえるようにしたいので
// index.jsにimport Providerとstoreを書く 