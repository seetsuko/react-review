import "./UserHome.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { url } from "../const";
import { useCookies } from 'react-cookie';
import { Pagination } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { pageQuery } from "../redux/paginationSlice";


export const UserHome = () =>{

  const pagination = useSelector((state) => state.pagination.offset)
  const dispatch = useDispatch()
  const [ cookie ] = useCookies()
  const [ bookData,setBookData ] = useState([]);
  const [ errorMessage,setErrorMessage ] = useState("")

  console.log(cookie.token)

  // paginationが変更するたびにAPIを叩く
  useEffect(()=>{  
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
      console.log("err:", err);
    });
  },[pagination])

// ページが変わるとoffsetのstateが変わる
const handlePaginate = (page) =>{
  dispatch(pageQuery(page))
}

return(
  <div className="main">
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

    <p>{errorMessage}</p>
      <ul className="review-list">
        {bookData.map((data) => {
          return(
          <li className="review-item" key={data.id}>
            <p className="review-item__text">{data.title}</p>
            <p className="review-item__text--detail">{data.review}</p>
          </li>
          )
        })}
      </ul>
    </div>
  </div>
)
}
