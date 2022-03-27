import { FC, HTMLInputTypeAttribute, memo } from 'react'
import './Input.scss'


interface ProfileProps{
    id:string,
    label:string,
    onChange:any,
    value:string,
    disabled:boolean,
    type?:HTMLInputTypeAttribute|'textarea',
}

const Input:FC<ProfileProps> =memo(({type='text',...props}) => {
    console.log('ws');
    
  return (
      <div className='input' >
          <label htmlFor={props.id} > {props.label} </label>
          {
          type!=='textarea'? <input type={type} required  {...props}   />
          :<textarea {...props}  ></textarea>
          }
      </div>
  )
})

export default Input