import axios from "axios"
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
        <p  className='error-message'>{errorMessage}</p>
        <form onSubmit={handleSubmit(onSubmit)} >
          <div>
            <label>タイトル</label>
            <input 
              type="text"
              {...register("title",{required:true})}
            />
            {errors.title && <div>タイトルを入力してください</div>}
          </div>
          <div>
            <label>URL</label>
            <input 
              type="text"
              {...register("url",{required:true})}
            />
            {errors.url && <div>URLを入力してください</div>}
          </div>
          <div>
            <label>書籍の詳細</label>
            <input 
              type="text"
              {...register("detail",{required:true})}
            />
            {errors.detail && <div>書籍の詳細を入力してください</div>}
          </div>
          <div>
            <label>レビュー</label>
            <input 
              type="text"
              {...register("review",{required:true})}
            />
            {errors.review && <div>レビューを入力してください</div>}
          </div>
          <div>
          <button id='review-submit' type="submit">投稿</button>
          </div>
        </form>
      </div>
      :<p>投稿するにはログインが必要です。</p>}
    </div>
  ) 
}