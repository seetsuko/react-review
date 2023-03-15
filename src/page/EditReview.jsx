import axios from "axios"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useForm } from "react-hook-form"
import { useLocation, useNavigate } from "react-router-dom"
import { url } from "../const"
import { Header } from "./Header"

export const EditReview = () => {

  const navigation = useNavigate()
  const { state } = useLocation()
  const reviewID = state.reviewID
  const [ cookie ] = useCookies()
  const { register,handleSubmit,reset,formState:{errors} } = useForm()
  const [ reviewData,setReviewData ] = useState()
  const [ errorMessage,setErrorMessage ] = useState("")


  useEffect(()=>{
    axios
      .get(`${url}/books/${reviewID}`,{
        headers: {
          "Authorization": `Bearer ${cookie.token}`,
          },
      })
      .then((res)=>{
        console.log(res.data)
        setReviewData(res.data)
        reset({
          "title":res.data.title,
          "url":res.data.url,
          "detail":res.data.detail,
          "review":res.data.review
      })
    })
  },[])

  const onSubmit = async(data) =>{
    await axios
      .put(`${url}/books/${reviewID}`,data,{
        headers: {
          "Authorization": `Bearer ${cookie.token}`,
          },
      })
      .then((res)=>{
        navigation(`/detail/${reviewID}`,{state:{reviewID:reviewID}})
      })
      .catch((err)=>{
        setErrorMessage("編集に失敗しました")
      })

  }

  const handleDelete = () =>{
    axios
      .delete(`${url}/books/${reviewID}`,{
        headers: {
          "Authorization": `Bearer ${cookie.token}`,
          },
      })
      .then((res)=>{
        alert("削除しました")
        navigation("/")
      })
      .catch((err)=>{
        setErrorMessage("削除に失敗しました")
      })
  }

  return(
    <div>
      <Header/>
      <h2>レビュー編集画面</h2>
      <div>
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
          <button id='review-submit' type="submit">編集する</button>
          </div>
        </form>
        <div className="delete-btn">
          <button id='delete-btn' onClick={handleDelete}>削除する</button>
        </div>
      </div>
    </div>
  )
}