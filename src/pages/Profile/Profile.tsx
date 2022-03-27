import axios from 'axios'
import React, { useCallback } from 'react'
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
  const [user, setUser] = useState<IProfile>({
    name:'',
    username:'',
    email:'',
    street:'',
    city:'',
    zipcode:'',
    phone:'',
    website:'',
    comment:'',
  })

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

  const changeInput=useCallback( (e) => {
      setUser((prev)=>{
        return {
          ...prev,
          [e.target.id] :e.target.value
        }
      })
    },[setUser])
  
  
  const sendProfile=(e: React.FormEvent)=>{
    e.preventDefault()
    console.log(JSON.stringify(user, null, 2)); 
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
            <Input  id='name' value={user.name} label='Name' disabled={!editMode} onChange={changeInput} />
            <Input id='username' value={user.username} label='User name' disabled={!editMode} onChange={changeInput} />
            <Input id='email' value={user.email} label='E-mail' type='email' disabled={!editMode} onChange={changeInput}  />
            <Input id='street' value={user.street} label='Street' disabled={!editMode} onChange={changeInput} />
            <Input id='city' value={user.city} label='City' disabled={!editMode} onChange={changeInput} />
            <Input id='zipCode' value={user.zipcode} label='Zip code' disabled={!editMode} onChange={changeInput} />
            <Input id='phone' value={user.phone} label='Phone' disabled={!editMode} onChange={changeInput} />
            <Input id='website' value={user.website} label='Website' disabled={!editMode} onChange={changeInput} />
            <Input id='comment' value={user.comment} label='Comment' type='textarea' disabled={!editMode} onChange={changeInput} />
          </div>
            <div className={s.formBtn}>
              <Button type='submit' variant='success' disabled={!editMode} >Отправить</Button>
            </div>
        </form>
    </div>
  )
}

export default Profile