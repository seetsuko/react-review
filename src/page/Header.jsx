import axios from "axios"
import "./Header.css"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { url } from "../const"
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "../redux/authSlice"
import { Link, useNavigate } from "react-router-dom"

export const Header = () =>{

  const auth = useSelector((state) => state.auth.isSignIn)
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const [ cookie,setCookie,removeCookie ] = useCookies()
  const [ iconUrl,setIconUrl ] = useState()
  const [ userName,setUserName ] = useState()

  const handleSignOut = () =>{
    dispatch(signOut())
    removeCookie("token")
    navigation("/login")
  }

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
      })
      .catch((err)=>{
        console.log(err)
      })
  },[])


  return(
    <header>
      <h1>書籍レビューアプリ</h1>
      
          {auth 
            ?( 
              <div className="user">
                <div className="login-status">
                  <img src={iconUrl} alt="アイコン画像"/>
                  <p>{userName}</p><br/>
                </div>
                <div className="btn">
                    <button onClick={handleSignOut}>ログアウト</button>
                    <Link to="/profile" className="edit">ユーザー編集</Link>
                </div>
              </div>
            )
            :(
              <div className="user">
                <div className="login-status">
                </div>
                <div className="btn">
                  <button>ログイン</button>
                </div>
              </div>
            )
          }
    </header>
  )
}