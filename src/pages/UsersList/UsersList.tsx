import { FC } from "react"
import Loader from "../../components/Loader/Loader"
import { IUser } from "../../types"
import UserItem from "./UserItem/UserItem"
import s from './UsersList.module.scss'


interface UsersListProps{
  usersList:IUser[],
  loading:boolean,
}
const UsersList:FC<UsersListProps> = ({usersList,loading}) => {

  return (
    <div className={s.usersList}>
        <h2>Список пользователей</h2>
        {
          loading&& <Loader />
        }
        <div className={s.users}>
          {
            usersList.map((user)=>(
              <UserItem user={user} key={user.id} ></UserItem>
            ))
          }      
        </div>
        {
          !loading
          && <div className={s.count}>Найдено {usersList.length} пользователей</div>
        } 
    </div>
  )
}

export default UsersList