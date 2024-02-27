import React, { useState } from 'react'
import Heading from '../component/Heading'
import SubHeading from '../component/SubHeading'
import InputBox from '../component/InputBox'
import Button from '../component/Button'
import ButtonWarnning from '../component/ButtonWarnning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const Signin = () => {
  const [username, setUsername] = useState('')  
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  return (
   <div className='bg-slate-300 h-screen flex justify-center'>
          <div className='flex flex-col justify-center'>
          <div className='bg-white w-80 h-max text-center p-2 px-4 rounded-lg'>
        <Heading label={"Sign in"} />
        <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox onChange={e => {
            setUsername(e.target.value)
        }} placeholder="harkirat@gmail.com" label={"Email"} />
          <InputBox onChange={e => {
            setPassword(e.target.value)
        }} placeholder="123456" label={"Password"} />
        <div className="pt-4">
            <Button onClick={async () => {
              const response = await axios.post('http://localhost:3000/api/v1/user/signin', {
                username,
                password
              })
              localStorage.setItem('token', response.data.token)
              navigate('/dashboard')
          }} label={"Sign in"} />
        </div>
        <ButtonWarnning label={"Don't have an account?"} linkText={"Sign up"} to={"/signup"} />
         </div>
          </div>
          
    </div>
  )
}

export default Signin