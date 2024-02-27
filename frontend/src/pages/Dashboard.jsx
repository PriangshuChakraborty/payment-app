import React, { useEffect, useState } from 'react'
import Appbar from '../component/Appbar'
import Balance from '../component/Balance'
import UserSearch from '../component/UserSearch'
import axios from 'axios'

const Dashboard = () => {
  const [balance, setBalance] = useState(0)
  const token = localStorage.getItem('token')
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('http://localhost:3000/api/v1/account/balance', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      setBalance(response.data.balance)
    }
    fetchData()
  }, [balance])
  return (
    <div>
      <Appbar />
      <div className='m-8'>
        <Balance value={parseFloat(balance).toFixed(3)} />
        <UserSearch />
      </div>
    </div>
  )
}

export default Dashboard