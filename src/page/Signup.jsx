import "./Signup.css"
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

export const Signup = () =>{

  // ユーザー情報作成APIを使って、ユーザー作成画面を作成する
  
  // 最近のスマホで撮影した写真などだと高画質でデータがとても大きいケースがあります。そのまま送ってしまうと重くなってしまう原因になってしまうのでサーバにアップロードする前にJavaScript側でリサイズしましょう。
  // いくつかライブラリはありますがCompressor.jsあたりがいいかと思います。
  
  const { register, handleSubmit, formState: {errors} } = useForm();
  const [ iconUrl,setIconUrl ] = useState("")
  const [ cookie,setCookie ] = useState("")
  const [ errorMessage,setErrorMessage ] = useState("")
  const navigate = useNavigate()

  // 画像を表示できるようにする&Compressor.jsでリサイズ
  const handleIconChange = (e) =>{
    const iconFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(iconFile);
    setIconUrl(imageUrl)

    const img = new Compressor(data,{
      qualty: 0.6,
      success(result){
        //圧縮が完了した時の処理を記述する
      },
      maxWidth:1000,
      maxHeight: 400,
      mimeType: 'image/png',
      error(err) { 
        //エラー処理 
      },

    }) 
  }

  const onSubmit = (data) => {
    console.log(data);
    axios
    .post("https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users",data)
    .then((res)=>{
      setCookie(res.data.token)
      console.log(res.data.token)
      navigate("/")
    })
      // エラー時のUIも実装するようにしましょう
    .catch((err) => {
      setErrorMessage(`サインアップに失敗しました。 ${err}`)
    })
    }

    

  return (
    <div>
      <h2> 新規登録</h2>
      <p className='error-message'>{errorMessage}</p>
      <form onSubmit={ handleSubmit(onSubmit) } >
      {/* ユーザアイコンも登録できるようにする */}
        <div>
          <div>
            <img src={iconUrl} className="icon"/>
          </div>
          <input type="file" onChange={handleIconChange}/>
        </div>
        <div >
          <label htmlFor="signup-name">ユーザー名</label>
          <input
            id="signup-name" 
            // バリデーション
            {...register("name",{required:true})}
            />
            {errors.name && <div>ユーザー名を入力してください</div>}
        </div>
        <div >
          <label htmlFor="signup-email">メールアドレス</label>
          <input
            id="signup-email" 
            // バリデーション
            {...register("email",{required:true})}
            />
            {errors.email && <div>メールアドレスを入力してください</div>}
        </div>
        <div>
        <label htmlFor="signup-password">パスワード</label> 
        <input 
          type="password" 
          id="signup-password" 
          // バリデーション
          {...register("password",{required:true})}
          />
          {errors.password && <div>パスワードを入力してください</div>}
        </div>
        <div>
        <button id='signup-submit' type="submit">登録</button>
        </div>
        </form>
         {/* ログイン画面へのリンクを配置する */}
        <NavLink to="/login">ログイン画面へ</NavLink>
    </div>
  )
}


