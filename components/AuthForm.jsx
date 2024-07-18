/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthForm = ({ isLogin }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      if (isLogin) {
        const userObj = { email: enteredEmail, password: enteredPassword };
        authCtx.onLogin(userObj, changePathHandler);
      } else {
        const userObj = {
          name: enteredName,
          email: enteredEmail,
          password: enteredPassword,
          confirmPassword: enteredConfirmPassword,
        };
        authCtx.onSignup(userObj, changePathHandler);
      }
    }
  }, [formErrors]);

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };

  const confirmPasswordChangeHandler = (e) => {
    setEnteredConfirmPassword(e.target.value);
  };

  const nameChangeHandler = (e) => {
    setEnteredName(e.target.value);
  };

  const changePathHandler = (str) => {
    navigate(str);
  };

  const validate = () => {
    let errors = {};
    if (!enteredEmail) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(enteredEmail)) {
      errors.email = "Email address is invalid";
    }
    if (!enteredPassword) {
      errors.password = "Password is required";
    } else if (enteredPassword.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    if (!isLogin && enteredPassword !== enteredConfirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    if (!isLogin && !enteredName) {
      errors.name = "Name is required";
    }
    return errors;
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    setFormErrors(validate());
    setIsSubmitting(true);
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            {isLogin ? "Sign in to your account" : "Create a new account"}
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={formSubmitHandler}
          >
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    autoComplete="name"
                    value={enteredName}
                    onChange={nameChangeHandler}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={enteredEmail}
                  onChange={emailChangeHandler}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                />
                {formErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>
                )}
              </div>
            </div>
            {/* input */}

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={enteredPassword}
                  onChange={passwordChangeHandler}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                />
                {formErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>
                )}
              </div>
            </div>
            {!isLogin && (
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    autoComplete="name"
                    type="password"
                    value={enteredConfirmPassword}
                    onChange={confirmPasswordChangeHandler}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-4"
                  />
                  {formErrors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{formErrors.confirmPassword}</p>
                  )}
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {isLogin ? "Log In" : "Sign Up"}
              </button>
            </div>
          </form>

          {isLogin ? (
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to={`?mode=signup`}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign up now
              </Link>
            </p>
          ) : (
            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <Link
                to={`?mode=login`}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Log in now
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthForm;
