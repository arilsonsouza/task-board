import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useContextSelector } from "use-context-selector";
import * as z from 'zod'

import Button from "../../atoms/Button";
import { Link } from "../../atoms/Link";
import { FormField } from "../../molecules/FormField";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const loginFormSchema = z.object({
  email: z.string().trim().min(1, { message: 'Email is required' }).email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
})

type LoginFormInputs = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const navigate = useNavigate();
  const signIn = useContextSelector(AuthContext, (context) => {
    return context.signIn
  })

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleFormLoginSubmit(formData: LoginFormInputs) {
    const success = await signIn(formData)
    if (success) {
      reset()
      navigate('/tasks')
    }
  }

  return (
    <form
      className="flex flex-col gap-2 mx-auto w-3/5"
      onSubmit={handleSubmit(handleFormLoginSubmit)}
    >
      <FormField
        label="Email"
        type="email"
        placeholder="Email"
        required
        {...register('email')}
        error={errors.email?.message}
      />

      <FormField
        label="Password"
        type="password"
        placeholder="********"
        required
        {...register('password')}
        error={errors.password?.message}
      />

      <div className="flex justify-end">
        <Link to={"/signup"} className="text-base">
          Sign Up
        </Link>
      </div>

      <Button
        type="submit"
        className="btn-block mt-2"
        variant="default"
        disabled={isSubmitting}
      >
        Login
      </Button>
    </form>
  )
}
