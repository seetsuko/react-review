import { useState } from 'react';
import { Link,Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
// import { logIn } from "../redux/authSlice"


export const LogIn = () =>{

//   ユーザー認証APIを使って、ログイン画面を作成する

  const auth = useSelector((state)=>state.auth.isLogIn)
  const dispatch = useDispatch()
  // バリデーションを実装する
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [ errorMessage,setErrorMessage] = useState("");
  // const [ cookie, setCookie ] = useState("")

  axios.defaults.baseURL ="https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com"

  const onSubmit = (data) =>{
    console.log(data)
    axios
      .post("/signin", data)
      .then((res) => {
        // 認証トークン
        console.log("token", res.data.token)
        dispatch(logIn())
        // setCookie("token", res.data.token);
      })
      // エラー時のUIも実装するようにしましょう
      .catch((err) => {
        setErrorMessage(`ログインに失敗しました。${err}`);
      });
      if (auth) return <Navigate to="/"/>
  }
  


  return (
    <div>
      <h2> ログイン</h2>
      <p className='error-message'>{errorMessage}</p>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div id='test'>
          <label htmlFor="login-email">メールアドレス</label>
          <input
            id="login-email" 
            // バリデーション
            {...register("email",{required:true})}/>
            {errors.email && <div>メールアドレスを入力してください</div>}
        </div>
        <div>
        <label htmlFor="login-password">パスワード</label> 
        <input 
          type="password" 
          id="login-password" 
          // バリデーション
          {...register("password",{required:true})}
          />
          {errors.password && <div>パスワードを入力してください</div>}
        </div>
        <div>
        <button id='submit' type="submit">ログイン</button>
        </div>
        </form>
        {/* ユーザー作成画面へのリンクを配置する */}
        <Link to="/signup">ユーザー新規登録</Link>
    </div>
  )
}

