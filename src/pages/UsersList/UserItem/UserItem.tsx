import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../../components/Button/Button'
import { IUser } from '../../../types'
import s from './UserItem.module.scss'

interface UserItemProps{
  user:IUser,
}
const UserItem:FC<UserItemProps> = ({user}) => {
  const navigate=useNavigate()

  return (
    <div className={s.user}>
        <div className={s.info}>
            <div>ФИО: <p>{user.name}</p></div>
            <div>город: <p>{user.address.city}</p></div>
            <div>компания: <p>{user.company.name}</p></div>
        </div>
        <Button onClick={()=>navigate(`/profile/${user.id}`)} variant='link' >Подробнее</Button>
    </div>
  )
}

export default UserItem