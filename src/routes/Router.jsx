import { BrowserRouter,Routes,Route } from "react-router-dom"
import { LogIn } from "../components/LogIn"
import { SignUp } from "../components/SignUp"
import { UserHome } from '../page/UserHome'
import { UserEdit } from "../components/UserEdit"
import { NewReview } from "../page/NewReview"
import { DetailReview } from "../page/DetailReview"
import { EditReview } from "../page/EditReview"

export const Router = () =>{

  return (
      <Routes>
        <Route path="login" element={<LogIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="/" element={<UserHome />} />
        <Route path="/profile" element={<UserEdit />} />
        <Route path="/new" element={<NewReview />} />
        <Route path="/detail/:id" element={<DetailReview />} />
        <Route path="/edit/:id" element={<EditReview />} />
      </Routes>
  )
}

