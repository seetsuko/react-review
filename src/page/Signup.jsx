import "./Signup.css"
import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import Compressor from "compressorjs";

export const Signup = () =>{

  // ユーザー情報作成APIを使って、ユーザー作成画面を作成する

  const { register, handleSubmit, formState: {errors} } = useForm();
  const [ iconUrl,setIconUrl ] = useState("https://4.bp.blogspot.com/-xz7m7yMI-CI/U1T3vVaFfZI/AAAAAAAAfWI/TOJPmuapl-c/s800/figure_standing.png")
  const [ cookie,setCookie ] = useState("")
  const [ errorMessage,setErrorMessage ] = useState("")
  const navigate = useNavigate()

  // 画像を表示できるようにする&Compressor.jsでリサイズ
  const handleIconChange = (e) =>{
    const iconFile = e.target.files[0];
    // 圧縮前のサイズ
    console.log(iconFile.size)

    new Compressor(iconFile,{
      qualty: 0.8,
      mimeType: 'auto',
      convertTypes: "image/jpeg",
      success(result){
        // 圧縮後のサイズ
        console.log(result.size);
        const imageUrl = URL.createObjectURL(result);
        setIconUrl(imageUrl)
      },
      
      error(err) { 
        console.log(err.message);
      },

    }) 
  }


  const onSubmit = async (data) => {
    console.log(data);
    axios
      .post("https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/users",data)
      .then((res)=>{
        setCookie(res.data.token)
        console.log("Token:"+res.data.token)
        // navigate("/")
      })
      await axios
      // アイコンのpostがうまくいかない
      .post("https://ifrbzeaz2b.execute-api.ap-northeast-1.amazonaws.com/uploads",{iconUrl:iconUrl})
      .then((res)=>
      console.log(res)
      )
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
            <img 
              alt="アイコン画像" 
              src={iconUrl} 
              className="icon"/>
          </div>
          <input type="file" onChange={handleIconChange }/>
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


