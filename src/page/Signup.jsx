import { useState } from "react";
import { NavLink } from "react-router-dom";


export const Signup = () =>{

  // ユーザー情報作成APIを使って、ユーザー作成画面を作成する
  // ユーザアイコンも登録できるようにする
  // 最近のスマホで撮影した写真などだと高画質でデータがとても大きいケースがあります。そのまま送ってしまうと重くなってしまう原因になってしまうのでサーバにアップロードする前にJavaScript側でリサイズしましょう。
  // いくつかライブラリはありますがCompressor.jsあたりがいいかと思います。
  
  // エラー時のUIも実装するようにしましょう
  // バリデーションを実装する

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  // const [errorMessage,setErrorMessage] = useState("");
  
  const data = {
    name: name,
    email: email,
    password: password
  }
  console.log(data)

  const handleSubmit = (e) =>{
    axios.post("https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users",data)
    .then(()=>{
      console.log(data)
    })
    
    e.preventDefault();
    
  }


  return (
    <div>
      <h2> 新規登録</h2>
      {/* <p className='error-message'>{errorMessage}</p> */}
      <form onSubmit={handleSubmit} >
      <div >
          <label htmlFor="signup-name">ユーザー名</label>
          <input
            id="signup-name" 
            value={name} 
            onChange={(e) => setName(e.target.value)}/>
        </div>
        <div >
          <label htmlFor="login-email">メールアドレス</label>
          <input
            id="login-email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
        <label htmlFor="login-password">パスワード</label> 
        <input 
          type="password" 
          id="login-password" 
          value={password} 
          onChange={ (e) => setPassword(e.target.value)}/>
        </div>
        <div>
        <button id='submit' type="submit">登録</button>
        </div>
        </form>
         {/* ログイン画面へのリンクを配置する */}
        <NavLink to="/login">ログイン画面へ</NavLink>
    </div>
  )
}


