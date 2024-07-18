/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthForm = ({ isLogin }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState("");
  const [enteredName, setEnteredName] = useState("");

  // This is the basic validation improve this
  let passwordValid = enteredPassword === enteredConfirmPassword;

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

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

  const formSubmitHandler = (e) => {
    e.preventDefault();

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
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
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
                  htmlFor="email"
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
              </div>
            </div>
            {!isLogin && (
              <div>
                <label
                  htmlFor="password"
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
              Already a member?{" "}
              <Link
                to={`?mode=signup`}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Signup Now
              </Link>
            </p>
          ) : (
            <p className="mt-10 text-center text-sm text-gray-500">
              Not a Member?{" "}
              <Link
                to={`?mode=login`}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Login Now
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthForm;
