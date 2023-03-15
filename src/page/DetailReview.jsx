
import axios from "axios"
import "./DetailReview.css"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Link, useLocation } from "react-router-dom"
import { url } from "../const"
import { Header } from "./Header"
import { useSelector } from "react-redux"

export const DetailReview = () => {
  
    const auth = useSelector((state) => state.auth.isSignIn)
    const { state } = useLocation()
    const [ cookie ] = useCookies()
    const reviewID = state.reviewID
    const [ reviewData,setReviewData ] = useState()
    const [ userName,setUserName ] = useState()
    const [ load,setLoad ] = useState(true)
  
    console.log(reviewID)

    useEffect(()=>{
      // 投稿者かどうかのためにユーザーのAPIを取得
      axios
        .get(`${url}/users`,{
          headers: {
            "Authorization": `Bearer ${cookie.token}`,
            },
        })
        .then((res)=>{
          setUserName(res.data.name)
        })
      // 1秒後にAPIを叩く
      setTimeout(() => {
      if(auth == true){
        axios
          .get(`${url}/books/${reviewID}`,{
            headers: {
              "Authorization": `Bearer ${cookie.token}`,
              },
          })
          .then((res)=>{
            setReviewData(res.data)
            setLoad(false)
          })
          .catch((err)=>{
            console.log(err)
          })
      }else{
        setLoad(false)
      }
    },1000)
    clearInterval;
    },[])

    
    
    return(
      <div className="main">
        <Header/>
        <h2>書籍レビュー詳細</h2>
        { load //ローディング中
          ? <div className="loading">
              <div className="dot-pulse"></div>
            </div>
          
          : auth //ローディング終了後。ログインしているとき
          ?<div className="container">
            {/* 投稿者の場合は表示 */}
            {userName === reviewData.reviewer && <Link to={`/edit/${reviewID}`} state={{reviewID:reviewID}}>投稿内容を編集する</Link>} 
            <div className="item">
              <h3>タイトル</h3>
                <p>{reviewData.title}</p>
            </div>
            <div className="item">
              <h3>URL</h3>
                <a href={reviewData.url}>{reviewData.url}</a>
            </div>
            <div className="item__detail">
              <h3>本の内容</h3>
                <p>{reviewData.detail}</p>
            </div>
            <div className="item__review">
              <h3>感想</h3>
                <p>{reviewData.review}</p>
            </div>
            <div className="item">
              <h3>投稿者</h3>
                <p>{reviewData.reviewer} さん</p>
            </div>
          </div>
          // ログインしていないとき
          :<p>詳細を見るにはログインが必要です。</p>} 
      </div>
    )
  }