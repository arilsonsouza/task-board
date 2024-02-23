import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'

import { FormField } from "../../molecules/FormField";
import Button from "../../atoms/Button";

const loginFormSchema = z.object({
  email: z.coerce.string().trim().email({ message: "Invalid email address" }),
  password: z.string()
}).required({ email: true, password: true })

type LoginFormInputs = z.infer<typeof loginFormSchema>

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginFormSchema),
  })

  async function handleFormLoginSubmit(data: LoginFormInputs) {
    setTimeout(() => {
      console.log(data)
      reset()
    }, 2000);

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
