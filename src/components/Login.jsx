import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { url } from "../const"
import useCookies from "react-cookie/cjs/useCookies";
import { useDispatch,useSelector } from 'react-redux';
import { signIn } from '../redux/authSlice';
import { Header } from '../page/Header';


export const LogIn = () =>{

  const auth = useSelector((state) => state.auth.isSignIn)
  const navigation = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [ cookie,setCookie,remouveCookie ] = useCookies()
  const [ errorMessage,setErrorMessage] = useState("");

  const onSubmit = (data) =>{
    console.log(data)
    //   ユーザー認証APIを使って、ログイン画面を作成する
    axios
      .post(`${url}/signin`, data)
      .then((res) => {
        console.log(res.data.token)
        setCookie("token",res.data.token)
        dispatch(signIn())
        // UserHomeページへ遷移
        navigation("/")
      })
      // エラー時のUIも実装するようにしましょう
      .catch((err) => {
        setErrorMessage(`ログインに失敗しました。${err}`);
      });
  }
  


  return (
    <div className='main'>
      { auth && <Navigate to ="/"/> }
      <Header/>
      <h2> ログイン</h2>
      <p className="error">{errorMessage}</p>
      <form onSubmit={handleSubmit(onSubmit)} className="user-form">
        <div>
          <label htmlFor="login-email">メールアドレス</label>
          <input
            id="login-email" 
            // バリデーション
            {...register("email",{required:true})}/>
            {errors.email && <div className="error">メールアドレスを入力してください</div>}
        </div>
        <div>
        <label htmlFor="login-password">パスワード</label> 
        <input 
          type="password" 
          id="login-password" 
          // バリデーション
          {...register("password",{required:true})}
          />
          {errors.password && <div className="error">パスワードを入力してください</div>}
        </div>
        <div>
        <button id='submit' type="submit">ログイン</button>
        </div>
        {/* ユーザー作成画面へのリンクを配置する */}
        <Link to="/signup">ユーザー新規登録</Link>
      </form>
    </div>
  )
}

