import {FC, useEffect, useState} from 'react'
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom'
import Sorting from './components/Sorting/Sorting'
import Profile from './pages/Profile/Profile'
import UsersList from './pages/UsersList/UsersList'
import axios from 'axios'
import { IUser } from './types'


const App:FC = () => {
  const [users, setUsers] = useState<IUser[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const {pathname}=useLocation()
  const navigate=useNavigate()
  

  const sortUsers=(sortBy:'name'|'city')=>{
    if(pathname!=='/'){
      navigate('/')
    }
    const copyUsers=users.concat()
    const sortedUsers =copyUsers.sort((a,b)=>{
      if(sortBy==='name'){
        return a.name.localeCompare(b.name)
      }else if(sortBy==='city'){
        return a.address.city.localeCompare(b.address.city)
      }
      return 0
    })
    setUsers(sortedUsers)
  }

  const getUsers=async()=>{
    setLoading(true)
    const {data}=await axios.get('https://jsonplaceholder.typicode.com/users')
    setLoading(false)
    setUsers(data) 
  }

  useEffect(() => {
      getUsers()
  }, [])


  return(
    <div className='app'>
      <Sorting sortUsers={sortUsers} />
          <Routes>
            <Route path='/' element={<UsersList loading={loading} usersList={users} />} /> 
            <Route path='/profile/:id' element={<Profile />} />
          </Routes>
    </div>
  )
}

export default App