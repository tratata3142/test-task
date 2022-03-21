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
  const [name, setName] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [zipcode, setZipcode] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [website, setWebsite] = useState<string>('')
  const [comment, setComment] = useState<string>('')
  const {id}=useParams()

  const fetchUser=async()=>{
    setLoading(true)
    const {data}=await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
    setLoading(false)
    setName(data.name)
    setUsername(data.username)
    setEmail(data.email)
    setStreet(data.address.street)
    setCity(data.address.city)
    setZipcode(data.address.zipcode)
    setPhone(data.phone)
    setWebsite(data.website)
  }
  useEffect(() => {
    fetchUser()
  }, [])

  const sendProfile=(e: React.FormEvent)=>{
    e.preventDefault()
    const profile:IProfile={
      name:name,
      username:username,
      email:email,
      street:street,
      city:city,
      zipcode:zipcode,
      phone:phone,
      website:website,
      comment:comment,
    }
    console.log(JSON.stringify(profile));
    
  }
  
  
  if(loading){
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
            <Input  id='name' value={name} label='Name' disabled={!editMode} onChange={setName} />
            <Input id='userName' value={username} label='User name' disabled={!editMode} onChange={setUsername} />
            <Input id='email' value={email} label='E-mail' type='email' disabled={!editMode} onChange={setEmail}  />
            <Input id='street' value={street} label='Street' disabled={!editMode} onChange={setStreet} />
            <Input id='city' value={city} label='City' disabled={!editMode} onChange={setCity} />
            <Input id='zipCode' value={zipcode} label='Zip code' disabled={!editMode} onChange={setZipcode} />
            <Input id='phone' value={phone} label='Phone' disabled={!editMode} onChange={setPhone} />
            <Input id='website' value={website} label='Website' disabled={!editMode} onChange={setWebsite} />
            <Input id='comment' value={comment} label='Comment' type='textarea' disabled={!editMode} onChange={setComment} />
          </div>
            <div className={s.formBtn}>
              <Button type='submit' variant='success' disabled={!editMode} >Отправить</Button>
            </div>
        </form>
    </div>
  )
}

export default Profile