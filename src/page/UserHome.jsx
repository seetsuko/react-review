import "./UserHome.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { url } from "../const";
import { useCookies } from 'react-cookie';
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { pageQuery } from "../redux/paginationSlice";
import { Header } from "./Header";
import { Link } from "react-router-dom";


export const UserHome = () =>{

  const auth = useSelector((state) => state.auth.isSignIn)
  const pagination = useSelector((state) => state.pagination.offset)
  const dispatch = useDispatch()
  const [ cookie ] = useCookies()
  const [ bookData,setBookData ] = useState([]);
  const [ errorMessage,setErrorMessage ] = useState("")

  // console.log(cookie.token)

  

  // paginationが変更するたびにAPIを叩く
  useEffect(()=>{
    // ログイン状態のAPI
    if(auth == true){
      axios 
      .get(`${url}/books?offset=${pagination}`, {
        headers: {
        "Authorization": `Bearer ${cookie.token}`,
        },
      })
      .then((res)=>{
        // レビューが無かったらメッセージを出す
        if(res.data.length === 0){
          setErrorMessage("レビューがありません")
          setBookData([])
        }else{
        // console.log(res.data)
        setBookData(res.data)
        // console.log(pagination)
        setErrorMessage("")
        }
      })
      .catch(err => {
        setErrorMessage(`${err.message},${err.code}`)
      });
    // ログアウト状態のAPI
    }else{
      axios 
      .get(`${url}/public/books?offset=${pagination}`)
      .then((res)=>{
        if(res.data.length === 0){
          setErrorMessage("レビューがありません")
          setBookData([])
        }else{
        setBookData(res.data)
        setErrorMessage("")
        }
      })
      .catch(err => {
        setErrorMessage(`${err.message},${err.code}`)
      });
    }
  },[pagination])

// ページが変わるとoffsetのstateが変わる
const handlePaginate = (page) =>{
  dispatch(pageQuery(page))
}

const log = (id) =>{
  if(auth == true){
    const bookID = {"selectBookId":id}
    axios
    .post(`${url}/logs`,bookID,{
      headers: {
      "Authorization": `Bearer ${cookie.token}`,
      }})
    .then((res)=>{
      console.log("ログ送信")
    })
  }
}

return(
  <div className="home-main">
    <Header/>
    <div className="title">
      <h2 className="title__main">書籍一覧</h2>
      <p className="title__sub">書籍レビューの一覧です</p>
    </div>
    <div className="review">
      {/* ページネーションコンポーネント */}
      <Pagination
        count={10}          //総ページ数
        color="secondary"     //ページネーションの色
        //変更されたときに走る関数。第2引数にページ番号が入る
        onChange={(e, page) =>{
        handlePaginate(page)
        }}  
        className="paginate"
      />
      {auth && 
      <div className="create-btn">
        <Link to="new" className="create-btn__link">レビューを書く</Link>
      </div>}
      <p>{errorMessage}</p>
      <ul className="review-list">
        {bookData.map((data) => {
          return(
          <li className="review-item" key={data.id}>
            <Link onClick={()=>log(data.id)} to={`/detail/${data.id}`} state={{reviewID:data.id}}><p className="review-item__text">{data.title}</p></Link>
            <p className="review-item__text--detail">{data.review}</p>
          </li>
          )
        })}
      </ul>
    </div>
  </div>
)
}
