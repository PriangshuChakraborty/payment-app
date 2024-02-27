import React, { useState } from 'react'
import Heading from '../component/Heading'
import SubHeading from '../component/SubHeading'
import InputBox from '../component/InputBox'
import Button from '../component/Button'
import ButtonWarnning from '../component/ButtonWarnning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  console.log(firstName)

  return (
      <div className='bg-slate-300 h-screen flex justify-center'>
          <div className='flex flex-col justify-center'>
          <div className='bg-white w-80 h-max text-center p-2 px-4 rounded-lg'>
              <Heading label='Sign up' />
              <SubHeading label='Enter your information to create an account' />  
          <InputBox onChange={e => {
            setFirstName(e.target.value)
          }} label='First Name' placehoder='John' />
          
                  <InputBox onChange={e => {
            setLastName(e.target.value)
          }} label='Last Name' placehoder='Doe' />
                  <InputBox onChange={e => {
            setUsername(e.target.value)
          }} label='Email' placehoder='harsh@gmail.com' />
                  <InputBox onChange={e => {
            setPassword(e.target.value)
          }} label='Password' placehoder='123456' />
                  <div className='pt-4'>
            <Button onClick={async () => {
              const response = await axios.post('http://localhost:3000/api/v1/user/signup', {
                firstName,
                lastName,
                username,
                password
              })
              localStorage.setItem('token', response.data.token)
              navigate('/dashboard')
            }} 
              label='Sign up' />
            
          </div>
          <ButtonWarnning label='Already have an account?' linkText='Sign in' to='/signin' />
         </div>
          </div>
          
    </div>
  )
}

export default Signup