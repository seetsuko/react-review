import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookie = new Cookies()

const initialState = {
  isSignIn: cookie.get("token") !== undefined,
}

// スライス作成
export const authSlice = createSlice({
  name: "auth",
  // 初期状態を書く
  initialState,
  // stateの状態を更新するための関数みたいなもの
  // 裏側でaction creatorも自動で作られている
  reducers: {
    // (state)は現在の状態のstate
    signIn: (state) => {
      state.isSignIn = true
    },
    signOut: (state) => {
      state.isSignIn = false
    }
  }
})

// exportでviewに受け渡して、どのコンポーネントでもつかえるようにする
export const { signIn,signOut } = authSlice.actions;
// authSliceのreducerをエクスポート
export default authSlice.reducer