import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

const Login = () => {

  const navigate = useNavigate();

  const handleLogin = (e: any) => {
      verifyUser(e);
      e.preventDefault();
      // navigate('/home'); 
  };

  const redirectToSignup = () => {
    navigate('/signup');
  };

  const verifyUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const storedUserDataString = localStorage.getItem('userData');
    
    if (!storedUserDataString) {
        setLoginError({
            noUser: true,
            message: "No user found. Please create an account."
        });
        return;
    }

    const storedUserData = JSON.parse(storedUserDataString);
    const usernameInput = document.getElementById('username') as HTMLInputElement;
    const passwordInput = document.getElementById('password') as HTMLInputElement;
    
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    if (username === storedUserData.username && password === storedUserData.password) {
        navigate('/home');
    } else {
        setLoginError({
            noUser: true,
            message: "Incorrect username or password. Please try again."
        });
    }
  };

    const [loginError, setLoginError] = useState({
        noUser: false,
        message: ''
    });

  return (
    <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="flex flex-col items-center bg-blue-100 w-1/3 h-fit p-6 rounded-lg shadow-md" aria-label="login-container">
        <h1 className="text-3xl mb-2">Login</h1>

        <form action="" className="flex flex-col w-3/4">
            <label htmlFor="first" className="text-xl">Username</label>
            <input type="text" id="username" placeholder="Enter your username"
            className="p-2 rounded-lg placeholder-gray-300 outline-none mb-2"/>

            <label htmlFor="password" className="text-xl">Password</label>
            <input type="password" id="password" placeholder="Enter your password"
            className="p-2 rounded-lg placeholder-gray-300 outline-none mb-4"/>

            {loginError.noUser && (
                <div className="text-center mb-2 text-red-500 text-xs w-full">
                    {loginError.message}
                </div>
            )}

            <button type="submit" 
            className="bg-blue-300 py-2 rounded-lg text-xl hover:bg-blue-400 mb-2"
            onClick={handleLogin}>Login</button>

            <button type="button"
            className="text-blue-600 hover:text-blue-800"
            onClick={redirectToSignup}>I don't have an account</button>
        </form>


      </div>
    </div>
  )
}

export default Login
