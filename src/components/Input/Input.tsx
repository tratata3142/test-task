import { FC, HTMLInputTypeAttribute } from 'react'
import { IProfile } from '../../types'
import './Input.scss'


interface ProfileProps{
    id:string,
    label:string,
    onChange:any,
    value:string,
    disabled:boolean,
    type?:HTMLInputTypeAttribute|'textarea',
}

const Input:FC<ProfileProps> = ({type='text',...props}) => {

  // const setValue=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
  //   onChange(e.target.value)
  // }
  
  
  return (
      <div className='input' >
          <label htmlFor={props.id} > {props.label} </label>
          {
          type!=='textarea'? <input type={type} required  {...props}   />
          :<textarea {...props}  ></textarea>
          }
      </div>
  )
}

export default Input