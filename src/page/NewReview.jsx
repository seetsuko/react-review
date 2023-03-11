import axios from "axios"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { url } from "../const"

export const NewReview = () =>{

  const [ cookie ] = useCookies()
  const [ errorMessage,setErrorMessage ] = useState("")

  // axios
  // .post(`${url}/books`,data,{
  //   header:{
  //     "Authorization":`Bearer ${cookie.token}`
  //   }
  // })
  // .then((res)=>{

  // })
  // .catch((err)=>{
  //   setErrorMessage("投稿に失敗しました。")
  // })


  return(
    <div>
      <h2>レビュー投稿画面</h2>
      <p>{errorMessage}</p>
      <form>
        <label>タイトル</label>
        <input type="text"/>
        <label>URL</label>
        <input type="text"/>
        <label>本の詳細</label>
        <input type="text"/>
        <label>レビュー</label>
        <input type="text"/>
      </form>
    </div>
  ) 
}