import { IconType } from "react-icons"
import ReactLoading from "react-loading"

type AuthSocialButtonProps = {
  icon: IconType
  onClick: () => void
  isLoading: boolean
}

// Adding Loading animation when isLoading is true

export default function AuthSocialButton({
  icon: Icon,
  onClick,
  isLoading,
}: AuthSocialButtonProps) {
  return (
    <button
      onClick={onClick}
      className="
       w-full  
       flex 
       justify-center 
       rounded-md 
       px-3 
       py-2 
       text-sm 
       font-semibold 
       ring-1 
        ring-inset 
        ring-gray-300 
        hover:bg-gray-100
       focus-visible:outline-offset-0 "
    >
       {isLoading ? <ReactLoading type={"spin"} color={"#000"} height={30} width={20} /> : <Icon />}
    </button>
  )
}
