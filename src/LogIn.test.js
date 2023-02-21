import { render, screen } from '@testing-library/react';
import {Login} from './page/Login';


describe("ログインコンポーネントテスト",()=>{
  
  test("要素が存在するか",()=>{
    render(<Login />);
    // ラベル
    screen.getByLabelText("メールアドレス");
    screen.getByLabelText("パスワード")
    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();
    // 入力フォーム
    screen.getByPlaceholderText("メールアドレス")
    screen.getByPlaceholderText("パスワード")
    expect(screen.getByPlaceholderText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("パスワード")).toBeInTheDocument();
    // ボタン
    screen.getByRole("button")
    expect(screen.getByRole("button")).toBeInTheDocument();

  })
})