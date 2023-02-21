import { BrowserRouter,Routes,Route } from "react-router-dom"
import {Login} from '../page/Login'
import {Signup} from '../page/Signup'
import {Home} from '../page/Home'

export const Router = () =>{


  return (
    <BrowserRouter>
      <Routes>
        <Route path="signin" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

