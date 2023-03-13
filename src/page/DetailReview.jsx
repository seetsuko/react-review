
import axios from "axios"
import "./DetailReview.css"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { useLocation } from "react-router-dom"
import { url } from "../const"
import { Header } from "./Header"

export const DetailReview = () => {
  
    const { state } = useLocation()
    const [ cookie ] = useCookies()
    const reviewData = state.reviewData
    const [ iconUrl,setIconUrl ] = useState()
    const [ userName,setUserName ] = useState()
    const [ load,setLoad ] = useState(true)
  
    console.log(reviewData)
  
    useEffect(()=>{
      axios
        .get(`${url}/users`,
          {headers: {
            "Authorization": `Bearer ${cookie.token}`,
          }}
        )
        .then((res)=>{
          console.log(res.data)
          setIconUrl(res.data.iconUrl)
          setUserName(res.data.name)
          setLoad(false)
        })
        .catch((err)=>{
          console.log(err)
        })
    },[])

    
    
    return(
      <div className="main">
        <Header/>
        <h2>書籍レビュー詳細</h2>
        { load 
          ? <div className="loading">
              <div className="dot-pulse"></div>
            </div>
          : <div className="container">
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
              <div className="review-user">
                <img src={iconUrl} alt="アイコン画像" className="icon"/>
                <p>{userName}</p>
              </div>
            </div> }
      </div>
    )
  }