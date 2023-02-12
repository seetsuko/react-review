import { useState } from 'react';
import './App.css';

function App() {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [errorMessage,setErrorMessage] = useState("");

  const handleSubmit = (e) =>{
    e.preventDefault();
    if(email.length , password.length <= 0){
      setErrorMessage('ログインに失敗しました')
    }else{
      setErrorMessage("")
    }
  }


  return (
    <div>
      <h1> ログイン</h1>
      <p className='error-message'>{errorMessage}</p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>メールアドレス</label>
          <input id="input-email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
        <label>パスワード</label> 
        <input type="password" id="input-password" value={password} onChange={ (e) => setPassword(e.target.value)}/>
        </div>
        <div>
        <button id='submit' type="submit">ログイン</button>
        </div>
        </form>
    </div>
  )
}

export default App;
