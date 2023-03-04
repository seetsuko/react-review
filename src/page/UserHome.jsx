import "./UserHome.css"
import axios from "axios"
import { useEffect, useState } from "react"
import { url } from "../const";
import { useCookies } from 'react-cookie';
import { Paginate } from "./Paginate";

export const UserHome = () =>{

  const [ cookie ] = useCookies()
  const [ bookData,setBookData ] = useState([]);
  const [ queryNumber,setQueryNumber ] = useState(0)

  console.log(cookie)

  useEffect(()=>{  
      axios 
      .get(`${url}/books?offset=${queryNumber}`, {
        headers: {
        "Authorization": `Bearer ${cookie.token}`,
      },
    })
      .then((res)=>{
        console.log(res.data)
        setBookData(res.data)
      })
      .catch(err => {
        console.log("err:", err);
      });
  },[])


  return(
    <div>
      <div className="title">
        <h2 className="title__main">書籍一覧</h2>
        <p className="title__sub">書籍レビューの一覧です</p>
      </div>
      <Paginate
        queryNumber={queryNumber}
      />
      <div className="review">
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
