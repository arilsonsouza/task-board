import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod'

import Button from "../../atoms/Button";
import { Link } from "../../atoms/Link";
import { FormField } from "../../molecules/FormField";
import { useContextSelector } from "use-context-selector";
import { AuthContext } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SignUpFormSchema = z.object({
  email: z.string().trim().min(1, { message: 'Email is required' }).email({ message: "Invalid email address" }),
  username: z.string().trim()
    .min(3, { message: 'Username must be at least 3 characters' })
    .max(20, { message: "Username must not be longer than 20 characters" }),
  password: z.string().trim().min(6, { message: 'Password must be at least 6 characters' }),
  confirmPassword: z.string().trim().min(6, { message: 'Password must be at least 6 characters' }),
})
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: "Oops! Password doesnt match",
  });

type SignUpFormInputs = z.infer<typeof SignUpFormSchema>

export function SignUpForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm<SignUpFormInputs>({
    resolver: zodResolver(SignUpFormSchema),
  })

  const signUp = useContextSelector(AuthContext, (context) => {
    return context.signUp
  })

  async function handleFormLoginSubmit({ email, username, password }: SignUpFormInputs) {
    const success = await signUp({ email, username, password })
    if (success) {
      reset()
      navigate('/')
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
        label="Username"
        type="text"
        placeholder="Username"
        required
        {...register('username')}
        error={errors.username?.message}
      />

      <FormField
        label="Password"
        type="password"
        placeholder="********"
        required
        {...register('password')}
        error={errors.password?.message}
      />

      <FormField
        label="Confirm Password"
        type="password"
        placeholder="********"
        required
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />

      <div className="flex justify-end">
        <Link to={"/"} className="text-base">
          Sign In
        </Link>
      </div>

      <Button
        type="submit"
        className="btn-block mt-2"
        variant="default"
        disabled={isSubmitting}
      >
        Sign Up
      </Button>
    </form>
  )
}
