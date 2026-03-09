import {useState} from "react"
import {useForm} from "react-hook-form"
import {useAuth} from "../context/AuthContext.jsx";
import {useNavigate} from "react-router-dom";

export default function Auth() {
  const [loginMode, setLoginMode] = useState(true)
  const [error, setError] = useState(null)
  const { signUp, login } = useAuth()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  function onSubmit(data) {
    let result;
    setError(null);

    if (loginMode) {
      result = login(data.email, data.password);
    } else {
      result = signUp(data.email, data.password);
    }

    if (result.success) {
      navigate("/");
    } else {
      setError(result.error);
    }
  }

  return (
    <div className={"page"}>
      <div className={"container"}>
        <div className={"auth-container"}>
          <h2 className={"page-title"}>
            {loginMode ? "Login" : "Sign Up"}
          </h2>
          <form className={"auth-form"} onSubmit={handleSubmit(onSubmit)}>
            { error && <div className={"error-message"}>{error}</div> }
            <div className={"form-group"}>
              <label htmlFor={"email"} className={"form-label"}>
                Email
              </label>
              <input
                className={"form-input"}
                type={"email"}
                id={"email"}
                placeholder={"Enter your email"}
                {...register("email", {required: "Email is required"})}
              />
              { errors.email && (
                <span className={"form-error"}>{errors.email.message}</span>
              )}
            </div>
            <div className={"form-group"}>
              <label htmlFor={"password"} className={"form-label"}>
                Password
              </label>
              <input
                className={"form-input"}
                type={"password"}
                id={"password"}
                placeholder={"Enter your password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long",
                  },
                  maxLength: {
                    value: 12,
                    message: "Password must be at most 12 characters long",
                  }
                })}
              />
              { errors.password && (
                <span className={"form-error"}>{errors.password.message}</span>
              )}
            </div>

            <button type={"submit"} className={"btn btn-primary btn-large"}>
              {loginMode ? "Login" : "Sign Up"}
            </button>
          </form>

          <div className={"auth-switch"}>
            { loginMode ? (
                <p>
                  Don't have an account? <span className={"auth-link"} onClick={() => setLoginMode(false)}>Sign Up</span>
                </p>
              ) : (
                <p>
                  Already have an account? <span className={"auth-link"} onClick={() => setLoginMode(true)}>Login</span>
                </p>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}