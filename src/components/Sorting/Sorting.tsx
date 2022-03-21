import { FC } from "react"
import Button from "../Button/Button"
import s from './Sorting.module.scss'

interface SortingProps{
  sortUsers:(sortBy:'city'|'name')=>void
}
const Sorting:FC<SortingProps> = ({sortUsers}) => {
  return (
    <div className={s.sorting}>
      <h4>Сортировка</h4>
       
       <Button onClick={()=>sortUsers('city')} >по городу</Button>
       <Button onClick={()=>sortUsers('name')} >по имени</Button> 
    </div>
  )
}

export default Sorting