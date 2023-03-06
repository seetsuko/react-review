import { createSlice } from "@reduxjs/toolkit";

// スライス作成
export const paginationSlice = createSlice({
  name: "pagination",
  // 初期状態を書く
  initialState:{
    offset: 0,
  },
  // stateの状態を更新するための関数みたいなもの
  // 裏側でaction creatorも自動で作られている
  reducers: {
    // (state)は現在の状態のstate
    pageQuery: (state,action) => {
      state.offset = (action.payload-1)*10 //受け取る字数で変わる
    }
  }
})

// exportでviewに受け渡して、どのコンポーネントでもつかえるようにする
export const { pageQuery } = paginationSlice.actions;
// authSliceのreducerをエクスポート
export default paginationSlice.reducer