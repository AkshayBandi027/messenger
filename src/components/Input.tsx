"use client"

import clsx from "clsx"
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

type InputProps = {
  label: string
  id: string
  type?: string
  register: UseFormRegister<FieldValues>
  required?: boolean
  errors: FieldErrors
  disabled?: boolean
}

export default function Input({
  label,
  id,
  type,
  register,
  errors,
  disabled,
  required,
}: InputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>

      <input
        type={type}
        disabled={disabled}
        {...register(id, { required })}
        className={clsx(
          `form-input
           mt-2
            block 
            w-full 
            rounded-md 
            border-0 
            py-1.5 
            text-gray-900 
            shadow-sm 
            ring-1 
            ring-inset 
            ring-gray-300 
            placeholder:text-gray-400 
            focus:ring-2 
            focus:ring-inset 
            focus:ring-sky-600 
            sm:text-sm 
            sm:leading-6`,
          errors[id] && "focus:ring-rose-500",
          disabled && "opacity-50 cursor-default"
        )}
      />
    </>
  )
}
