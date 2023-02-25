import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Login } from "../components/Login"
import { Signup } from '../page/Signup'
import { UserHome } from '../page/UserHome'

export const Router = () =>{


  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<UserHome />} />
      </Routes>
    </BrowserRouter>
  )
}

