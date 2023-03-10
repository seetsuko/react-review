import { Header } from "../page/Header"
import { url } from "../const"
import { useCookies } from "react-cookie"
import { useState,useEffect } from "react"
import axios from "axios"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"


export const UserEdit = () => {

  const navigation = useNavigate() 
  const [ cookie ] = useCookies()
  const [ userName,setUserName ] = useState("")
  const { register, handleSubmit,formState: {errors} } = useForm()
  const [ errorMessage,setErrorMessage ] = useState("") 

  // 表示用API
  useEffect(()=>{
    axios
      .get(`${url}/users`,
        {headers: {
          "Authorization": `Bearer ${cookie.token}`,
        }}
      )
      .then((res)=>{
        setUserName(res.data.name)
      })
      .catch((err)=>{
        console.log(err)
      })
  },[])

  const onSubmit = (data) =>{
    axios
      .put(`${url}/users`,data,
        {headers: {
        "Authorization": `Bearer ${cookie.token}`,
      }}
      )
      .then((res)=>{
        navigation("/")
      })
      .catch((err)=>{
        setErrorMessage(`ユーザ情報編集に失敗しました。${err}`)
      })
  }

  return(
    <div>
      <Header/>
      <h2>ユーザー編集</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>ユーザ名</label>
          <input 
          type="text" 
          defaultValue={userName}
          {...register("name",{required:true})}/>
          {errors.name && <div>ユーザー名を変更してください</div>}
        </div>
        <div>
          <button type="submit">登録</button>
        </div>
      </form>
    </div>
  )
}