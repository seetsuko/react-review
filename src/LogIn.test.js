import { render, screen } from '@testing-library/react';

import LogIn from './App';


describe("ログインコンポーネントテスト",()=>{
  
  test("ラベルが存在するか",()=>{
    render(<LogIn />);
    screen.getByLabelText("メールアドレス");
    screen.getByLabelText("パスワード");
  });
  test('入力フォームがあるか', () => {
    render(<LogIn />);
  // emailのみになっている
  screen.getAllByRole('textbox')
})
})