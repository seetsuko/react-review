import { BrowserRouter,Routes,Route } from "react-router-dom"
import { LogIn } from "../components/LogIn"
import { SignUp } from "../components/SignUp"
import { UserHome } from '../page/UserHome'
import { UserEdit } from "../components/UserEdit"

export const Router = () =>{


  return (
      <Routes>
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<UserHome />} />
        <Route path="/profile" element={<UserEdit />} />
      </Routes>
  )
}

