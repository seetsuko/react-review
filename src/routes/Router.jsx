import { BrowserRouter,Routes,Route } from "react-router-dom"
import { LogIn } from "../components/LogIn"
import { SignUp } from "../components/SignUp"
import { UserHome } from '../page/UserHome'

export const Router = () =>{


  return (
    <BrowserRouter>
      <Routes>
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<UserHome />} />
      </Routes>
    </BrowserRouter>
  )
}

