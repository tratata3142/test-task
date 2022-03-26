import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Button from '../../components/Button/Button'
import Input from '../../components/Input/Input'
import Loader from '../../components/Loader/Loader'
import { IProfile } from '../../types'
import s from './Profile.module.scss'


const Profile:FC = () => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [user, setUser] = useState<IProfile>()

  const {id}=useParams()

  const fetchUser=async()=>{
    setLoading(true)
    try {
      const {data}=await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    setLoading(false)
    setUser({
      name:data.name,
      username:data.username,
      email:data.email,
      street:data.address.street,
      city:data.address.city,
      zipcode:data.address.zipcode,
      phone:data.phone,
      website:data.website,
      comment:''
    })
    } catch (error) {
      setLoading(false)
      console.log(error);
      
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])

  const sendProfile=(e: React.FormEvent)=>{
    e.preventDefault()
    console.log(JSON.stringify(user)); 
  }
  
  
  if(loading || !user){
    return <Loader />
  }
  return (
    <div className={s.profile}>
        <div className={s.top}>
            <h2>Профиль пользователя</h2>
            <Button onClick={()=>setEditMode(!editMode)}>Редактировать</Button>
        </div>
        <form onSubmit={(e)=>sendProfile(e)}>
          <div className={s.inputs}>
            <Input  id='name' value={user.name} label='Name' disabled={!editMode} onChange={(e)=>setUser({...user,name:e.target.value})} />
            <Input id='userName' value={user.username} label='User name' disabled={!editMode} onChange={(e)=>setUser({...user,username:e.target.value})} />
            <Input id='email' value={user.email} label='E-mail' type='email' disabled={!editMode} onChange={(e)=>setUser({...user,email:e.target.value})}  />
            <Input id='street' value={user.street} label='Street' disabled={!editMode} onChange={(e)=>setUser({...user,street:e.target.value})} />
            <Input id='city' value={user.city} label='City' disabled={!editMode} onChange={(e)=>setUser({...user,city:e.target.value})} />
            <Input id='zipCode' value={user.zipcode} label='Zip code' disabled={!editMode} onChange={(e)=>setUser({...user,zipcode:e.target.value})} />
            <Input id='phone' value={user.phone} label='Phone' disabled={!editMode} onChange={(e)=>setUser({...user,phone:e.target.value})} />
            <Input id='website' value={user.website} label='Website' disabled={!editMode} onChange={(e)=>setUser({...user,website:e.target.value})} />
            <Input id='comment' value={user.comment} label='Comment' type='textarea' disabled={!editMode} onChange={(e)=>setUser({...user,comment:e.target.value})} />
          </div>
            <div className={s.formBtn}>
              <Button type='submit' variant='success' disabled={!editMode} >Отправить</Button>
            </div>
        </form>
    </div>
  )
}

export default Profile