import axios from "axios"
import "./NewReview.css"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { url } from "../const"
import { Header } from "./Header"

export const NewReview = () =>{

  const auth = useSelector((state) => state.auth.isSignIn)
  const navigation = useNavigate()
  const [ cookie ] = useCookies()
  const [ errorMessage,setErrorMessage ] = useState("")
  const { register, handleSubmit, formState: {errors} } = useForm()

    console.log(cookie.token)

  const onSubmit = async(data) =>{
    
  await axios
  .post(`${url}/books`,data,{
    headers: {
      "Authorization": `Bearer ${cookie.token}`,
      },
  })
  .then((res)=>{
    navigation("/")
  })
  .catch((err)=>{
    setErrorMessage("投稿に失敗しました。")
  })
}


  return(
    <div>
      <Header/>
      <h2>レビュー投稿画面</h2>
      {auth 
      ?<div>
        <p  className="error">{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)} className="container">
          <div>
            <label>タイトル</label><br/>
            <input 
              className="input-title"
              type="text"
              {...register("title",{required:true})}
            />
            {errors.title && <div className="error">タイトルを入力してください</div>}
          </div>
          <div>
            <label>URL</label><br/>
            <input 
              className="input-url"
              type="text"
              {...register("url",{required:true})}
            />
            {errors.url && <div className="error">URLを入力してください</div>}
          </div>
          <div>
            <label>書籍の詳細</label><br/>
            <input 
              className="input-detail"
              type="text"
              {...register("detail",{required:true})}
            />
            {errors.detail && <div className="error">書籍の詳細を入力してください</div>}
          </div>
          <div>
            <label>レビュー</label><br/>
            <input 
              className="input-review"
              type="text"
              {...register("review",{required:true})}
            />
            {errors.review && <div className="error">レビューを入力してください</div>}
          </div>
          <div>
          <button id='review-submit' type="submit">投稿</button>
          </div>
        </form>
      </div>
      :<p className="error">投稿するにはログインが必要です。</p>}
    </div>
  ) 
}