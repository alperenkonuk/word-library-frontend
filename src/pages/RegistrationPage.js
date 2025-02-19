import useForm from "../hooks/useForm";
import {useState} from "react";

function RegistrationPage() {
  const [values, handleChange] = useForm({email: "", username: "", password: "", passwordConfirmation: ""});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (values.password !== values.passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    if (values.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setIsLoading(true);

    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: values.email,
        username: values.username,
        password: values.password
      })
    });

    const {accessToken, refreshToken, message} = await response.json();

    if (message) {
      setError(message);
      setIsLoading(false);
    }

    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);

  }


  return (
    <div className="flex items-center min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="max-w-md mx-auto my-10">
          <div className="text-center">
            <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign Up</h1>
            <p className="text-gray-500 dark:text-gray-400">Create a new account</p>
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
                <label htmlFor="username"
                       className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Username</label>
                <input type="username" name="username" id="username" value={values.username} onChange={handleChange}
                       className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"/>
              </div>
              <div className="mb-6">
                <label htmlFor="password"
                       className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Password</label>
                <input type="password" name="password" id="password" value={values.password}
                       className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                       onChange={handleChange}
                       placeholder="Your Password"/>
              </div>
              <div className="mb-6">
                <label htmlFor="password"
                       className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Confirm Password</label>
                <input type="password" name="passwordConfirmation" id="passwordConfirmation"
                       value={values.passwordConfirmation}
                       className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-white dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                       onChange={handleChange}
                       placeholder="Password Again"/>
              </div>
              {error && <p className="text-red-300 my-5">{error}</p>}
              <div className="mb-6">
                <button type="submit" disabled={isLoading}
                        className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">
                  {isLoading ? "Logging in" : "Sign Up"}
                </button>
              </div>
              <p className="text-sm text-center text-gray-400">You already have an account?
                <a
                  className="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800"> Sign
                  in</a>.</p>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegistrationPage;