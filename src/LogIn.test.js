import { render, screen } from '@testing-library/react';
import Login from './App';


describe("ログインコンポーネントテスト",()=>{
  
  test("要素が存在するか",()=>{
    render(<Login />);
    // ラベル
    screen.getByLabelText("メールアドレス");
    screen.getByLabelText("パスワード")
    // 入力フォーム
    screen.getByPlaceholderText("login-email")
    screen.getByPlaceholderText("login-password")
    // ボタン
    screen.getByRole("button")
})
})