import { createSlice } from "@reduxjs/toolkit";
// import { defaultMethod } from "react-router-dom/dist/dom";
// import { Cookies } from "react-cookie";


// const cookie = new Cookies();

// const initialState ={
//   isLogIn: cookie.get("token") !== undefined,
// };

// 認証用スライス作成
export const authSlice = createSlice({
  name: "auth",
  // 初期状態を書く
  // 指定があればinitialState: {value: 0,}のようにつかう
  initialState:{},
  // stateの状態を更新するための関数みたいなもの
  // 裏側でaction creatorも自動で作られている
  reducers: {
    // (state)は現在の状態のstate
    logIn: (state) => {
      // ログインの処理を書く
    },
    logOut: (state) => {
      // ログアウトの処理を書く
    },
  //   logIn: (state) => {
  //     state.isLogIn = true;
  //   },
  //   logOut: (state) => {
  //     state.isLogIn = false;
  //   }
  }
})

// exportでviewに受け渡して、どのコンポーネントでもつかえるようにする
// signIn, signOutのactionをエクスポート
export const { signIn, signOut } = authSlice.actions;
// authSliceのreducerをエクスポート
export default authSlice.reducer