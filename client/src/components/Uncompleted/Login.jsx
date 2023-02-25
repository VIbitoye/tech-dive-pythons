import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
     function Login() {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

   const handleLogin = async (event) => {
    event.preventDefault();

    try {
      // Call login API with email and password
      // Redirect user to dashboard upon successful login
      if ('/* login is successful */') {
        navigate("/admin"); // Redirect to admin page
      }
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col py-12 sm:px-6 lg:px-8 items-center justify-center">
      <div className="sm:mx-auto  sm:w-full sm:max-w-md">
       
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"> <h2 className="mb-10 text-center text-3xl font-extrabold text-gray-900">
          Log in to your account
        </h2>
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={handleEmailChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                  className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="#" className="font-medium text-blue-500 hover:text-blue-400">
                  Forgot your password?
                </a>
              </div>
              
            </div>
            <div className="text-sm">
                
                  New User?  <Link to="/sign-up" className="font-medium text-black "><span className="hover:text-green-400 text-[#50936d]"> Sign Up</span>
                </Link>
              </div>
            <div>
              <button className="w-full flex justify-center py-2 px-4 border 
              border-transparent rounded-md shadow-sm text-sm font-medium text-white
               bg-[#50936d] hover:bg-[#427b5b] focus:outline-none focus:ring-2 
               focus:ring-offset-2 focus:ring-green-500"
                    type="submit"> Log in
                        </button>
                                                   
                            
                    </div>
                    </form>
                    </div>
          </div>   
       </div>                     
);
}
               


export default Login