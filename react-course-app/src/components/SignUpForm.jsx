import {useForm} from "react-hook-form"

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors},
  } = useForm()


  function onSubmit(data) {
    alert(`Sumitted with email: ${data.email} and password: ${data.password}`)
  }

  return (
    <div style={{maxWidth: 400, margin: '2rem auto'}}>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{marginBottom: '1rem'}}>
          <label htmlFor="email">
            Email:
            <input type="email" id={"email"} name="email"
                   placeholder={"you@example.com"}
                   {...register("email", {required: "Email is required"})}
            />
          </label>
          {errors.email && <p style={{color: 'red'}}>{errors.email.message}</p>}
        </div>

        <div style={{marginBottom: '1rem'}}>
          <label htmlFor="password">
            Password:
            <input type="password" id={"password"} name="email"
                   placeholder={"**********"}
                   {...register("password", {
                     required: "Password is required",
                     minLength: {value: 4, message: "Password must be at least 4 characters long"},
                     maxLength: {value: 12, message: "Password must be at most 12 characters long"}
                   })}
            />
          </label>
          {errors.password && <p style={{color: 'red'}}>{errors.password.message}</p>}
        </div>

        <div>
          <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  )
}