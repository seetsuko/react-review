import { useState } from 'react';
import './App.css';

function App() {

  return (
    <div>
      <LogIn/>
    </div>
  )
}

export default App;


export const LogIn = () =>{

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
      <h1> ログイン</h1>
      <p className='error-message'>{errorMessage}</p>
      <form onSubmit={handleSubmit} >
        <div id='test'>
          <label for="login-email">メールアドレス</label>
          <input
            id="login-email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
        <label for="login-password">パスワード</label> 
        <input 
          type="password" 
          id="login-password" 
          value={password} 
          onChange={ (e) => setPassword(e.target.value)}/>
        </div>
        <div>
        <button id='submit' type="submit">ログイン</button>
        </div>
        </form>
    </div>
  )
}

