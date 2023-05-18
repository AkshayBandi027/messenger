
import { signIn } from "next-auth/react"
import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { BsGithub, BsGoogle } from "react-icons/bs"
import { z } from "zod"
import AuthSocialButton from "./AuthSocialButton"
import Input from "./Input"
import {Toaster, toast} from "react-hot-toast"


const FieldValues = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(4),
})

type Inputs = z.infer<typeof FieldValues>

type AuthType = "Login" | "Signup"

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [authType, setAuthType] = useState<AuthType>("Signup")


  const onSubmit: SubmitHandler<Inputs> = async(data) => {
    // create an account with user credentials

    if(authType === "Signup"){
       const response = await fetch(`api/register`,{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
       })
       const result = await response.json()
    }


    // Logging in with credentials.
    else if (authType === "Login"){
       signIn("credentials", {
        ...data,
        redirect: false
       }).then((callback) => {
        if(callback?.error){
           toast.error(callback.error)
        }else if(callback?.ok) {
           toast.success("Successfully Logged In")
        }
       })
    }

  }
  

  const handleAuthType = () => {
    setAuthType((prevState) => (prevState === "Signup" ? "Login" : "Signup"))
  }

  const handleAuthButton = (provider: string) => {
    setIsLoading(true)
    signIn(provider)
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[600px] bg-white px-4 py-10 rounded-xl flex flex-col"
    >
      {authType === "Signup" && (
        <Input
          label="Name"
          errors={errors}
          id="name"
          disabled={isLoading}
          register={register}
          type="input"
          required={true}
        />
      )}

      {/* include validation with required or other standard HTML validation rules */}
      <Input
        label="email"
        errors={errors}
        id="email"
        disabled={isLoading}
        register={register}
        type="input"
        required={true}
      />
      {/* errors will return when field validation fails  */}
      {errors.email && <span className="text-red-300 capitalize">Email is required</span>}

      <Input
        label="password"
        errors={errors}
        id="password"
        disabled={isLoading}
        register={register}
        type="input"
        required={true}
      />
      {errors.password && <span className="text-red-300 capitalize">Password is required</span>}

      <button
        type="submit"
        className="bg-blue-400 text-white rounded-md px-16 py-1 mt-4 self-center cursor-pointer"
      >
        submit
      </button>

      <div className="w-full mt-4 border-t-2 border-gray-300"></div>

      {/* Social buttons */}

      <div className="flex justify-center mt-4 gap-2">
        <AuthSocialButton
          icon={BsGithub}
          onClick={() => handleAuthButton("github")}
          isLoading={isLoading}
        />
        <AuthSocialButton
          icon={BsGoogle}
          onClick={
            () => handleAuthButton("google")}
          isLoading={isLoading}
        />
      </div>

      <div className="mt-4 mr-2">
        {authType === "Signup" && (
          <p>
            Already a memeber?{" "}
            <span className="underline font-semibold text-blue-400 cursor-pointer" onClick={handleAuthType}>
              Login
            </span>
          </p>
        )}
        {authType === "Login" && (
          <p>
            New to Messenger{" "}
            <span className="underline font-semibold text-blue-400 cursor-pointer" onClick={handleAuthType}>
              Signup
            </span>
          </p>
        )}
      </div>
    </form>
  )
}
