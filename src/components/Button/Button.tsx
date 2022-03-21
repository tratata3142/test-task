import { FC, ReactNode } from "react"
import './Button.scss'

interface ButtonProps{
    children:ReactNode,
    variant?:'primary'|'success'|'link',
    onClick?:(arg:any)=>any,
    disabled?:boolean,
    type?:'submit' | 'reset' | 'button'
}

const Button:FC<ButtonProps> = ({children,variant='primary',...props}) => {

  return (
    <button className={`btn ${variant}`} {...props} >
        {children}
    </button>
  )
}

export default Button