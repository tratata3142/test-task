import { FC, HTMLInputTypeAttribute } from 'react'
import './Input.scss'


interface ProfileProps{
    id:string,
    label:string,
    onChange:React.Dispatch<React.SetStateAction<string>>,
    value:string,
    disabled:boolean,
    type?:HTMLInputTypeAttribute|'textarea',
}

const Input:FC<ProfileProps> = ({type='text',onChange,...props}) => {

  const setValue=(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    onChange(e.target.value)
  }
  
  
  return (
      <div className='input' >
          <label htmlFor={props.id} > {props.label} </label>
          {
          type!=='textarea'? <input type={type} required onChange={(e)=>setValue(e)} {...props}   />
          :<textarea onChange={(e)=>setValue(e)} {...props}  ></textarea>
          }
      </div>
  )
}

export default Input