import axios from "axios"
import "./Header.css"
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { url } from "../const"
import { useDispatch, useSelector } from "react-redux"
import { signOut } from "../redux/authSlice"
import { Link, useLocation, useNavigate } from "react-router-dom"

export const Header = () =>{

  const auth = useSelector((state) => state.auth.isSignIn)
  const location = useLocation()
  const dispatch = useDispatch()
  const navigation = useNavigate()
  const [ cookie,setCookie,removeCookie ] = useCookies()
  const [ iconUrl,setIconUrl ] = useState()
  const [ userName,setUserName ] = useState()
  const home = (location.pathname == "/")

  const handleSignOut = () =>{
    dispatch(signOut())
    removeCookie("token")
    navigation("/login")
  }

  const handleSignIn = () =>{
    navigation("/login")
  }

  useEffect(()=>{
    if(auth == true){
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
    }
  },[])


  return(
    <header>
      <Link to="/" className="app-title"><h1>書籍レビューアプリ</h1></Link>
      
          {auth 
            ?( 
              <div className="user">
                <div className="login-status">
                  <img src={iconUrl} alt="アイコン画像"/>
                  <p>{userName}</p><br/>
                </div>
                <div className="btn">
                    <button onClick={handleSignOut}>ログアウト</button><br/>
                    {home && <Link to="/profile" className="edit">ユーザー編集</Link>}
                </div>
              </div>
            )
            :(
              <div className="user">
                <div className="login-status">
                </div>
                <div className="btn">
                  <button onClick={handleSignIn}>ログイン</button>
                </div>
              </div>
            )
          }
    </header>
  )
}