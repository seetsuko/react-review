import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Login = () =>{

//   ユーザー認証APIを使って、ログイン画面を作成する
// ユーザー作成画面へのリンクを配置する
// エラー時のUIも実装するようにしましょう
// バリデーションを実装する

  const { register, handleSubmit, formState: {errors} } = useForm();
  const [ errorMessage,setErrorMessage] = useState("");
  const [ cookie, setCookie ] = useState("")
  const navigate = useNavigate()

  axios.defaults.baseURL ="https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com"

  const onSubmit = (data) =>{
    console.log(data)
    axios
      .post("/signin", data)
      .then((res) => {
        // 認証トークン
        console.log("token", res.data.token)
        setCookie("token", res.data.token);
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`ログインに失敗しました。${err}`);
      });
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
        <NavLink to="/signup">ユーザー新規登録</NavLink>
    </div>
  )
}

