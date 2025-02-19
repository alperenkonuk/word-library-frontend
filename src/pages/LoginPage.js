import "../hooks/useForm";
import useForm from "../hooks/useForm";
import React, {useState} from "react";
import Navbar from "../components/NavBar";

const LoginPage = () => {
  const [values, handleChange] = useForm({email: "", password: ""});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const response = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password
      })
    })
    const data = await response.json();

    if (data.message) {
      setError(data.message);
      setIsLoading(false);
    }

    console.log(data);
    localStorage.setItem("authToken", data.token)
    window.location.href = "/home";

  };

  return (
    <div className="flex items-center flex-col min-h-screen bg-white dark:bg-gray-900">
      <Navbar/>
      <div className="container mx-auto my-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign in</h1>
            <p className="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
          </div>
          <div className="m-7">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email
                  Address</label>
                <input type="email" name="email" id="email" value={values.email} onChange={handleChange}
                       className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>
              </div>
              <div className="mb-6">
                <div className="flex justify-between mb-2">
                  <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-400">Password</label>
                  <a
                    className="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot
                    password?</a>
                </div>
                <input type="password" name="password" id="password" value={values.password} onChange={handleChange}
                       placeholder="Your Password"
                       className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>
              </div>
              {error && <p className="text-red-300 my-5">{error}</p>}
              <div className="mb-6">
                <button type="submit" disabled={isLoading}
                        className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">
                  {isLoading ? "Logging in" : "Sign in"}
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">Don't have an account yet?
                <a
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"> Sign
                  up</a>.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;