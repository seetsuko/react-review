import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export const Login = () =>{

//   ユーザー認証APIを使って、ログイン画面を作成する
// ユーザー作成画面へのリンクを配置する
// エラー時のUIも実装するようにしましょう
// バリデーションを実装する


  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errorMessage,setErrorMessage] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(email== "" || password== ""){
      setErrorMessage("ログインに失敗しました")
    }else{
      setErrorMessage("")
    }
  }


  return (
    <div>
      <h2> ログイン</h2>
      <p className='error-message'>{errorMessage}</p>
      <form onSubmit={handleSubmit} >
        <div id='test'>
          <label htmlFor="login-email">メールアドレス</label>
          <input
            id="login-email" 
            placeholder="メールアドレス" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
        <label htmlFor="login-password">パスワード</label> 
        <input 
          type="password" 
          id="login-password" 
          placeholder="パスワード" 
          value={password} 
          onChange={ (e) => setPassword(e.target.value)}/>
        </div>
        <div>
        <button id='submit' type="submit">ログイン</button>
        </div>
        </form>
        {/* ユーザー作成画面へのリンクを配置する */}
        <NavLink to="/signup">ユーザー新規登録</NavLink>
    </div>
  )
}

