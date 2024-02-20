import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SendMoney } from './pages/SendMoney'
import { Dashboard } from './pages/Dashboard'
import {SignIn} from './pages/Signin'
import {SignUp} from './pages/SignUp'
function App() {
  const [count, setCount] = useState(0)
  const [benificiery, setbenificiery] = useState({});
  const [sessionToken, updateToken] = useState('');
  return (
    <>
        <BrowserRouter>
          <Routes>
          
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/signin' element={<SignIn updateToken={updateToken}/>}></Route>
            <Route path='/dashboard' element={
              <Dashboard sessionToken={sessionToken}
                          setbenificiery={setbenificiery}/>}>
             </Route>
            <Route path='/send' element={
              <SendMoney sessionToken={sessionToken} benificiery= {benificiery}/>}>
            </Route>
           
          </Routes>
        </BrowserRouter>
    </>
  )
}

export default App
