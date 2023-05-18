import { ReactNode } from "react"
import {clsx} from "clsx"

type ButtonProps = {
  type?: "submit" | "button" | "reset"
  fullWidth?: boolean
  children?: ReactNode
  onClick?: () => void
  secondary?: boolean
  disabled?: boolean
  danger?: boolean
}


export default function Button({
  type = "button",
  fullWidth,
  children,
  onClick,
  danger,
  secondary,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(`
      flex 
      justify-center 
      rounded-md 
      px-3 
      py-2 
      text-sm 
      font-semibold 
      focus-visible:outline 
      focus-visible:outline-2 
      focus-visible:outline-offset-2 
      `,
      disabled && 'opacity-50 cursor-default',
      fullWidth && 'w-full',
      secondary ? 'text-gray-900' : 'text-white',
      danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600',
      !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
      )}
      onClick={onClick}
      disabled={disabled}
    >{children}</button>
  )
}
