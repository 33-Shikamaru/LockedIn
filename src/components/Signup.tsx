import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

interface UserData {
  name: string;
  username: string;
  password: string;
}

const Signup = () => {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData>({
    name: '',
    username: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(userData));
    navigate('/home'); 
  };

  const redirectToLogin = () => {
    navigate('/');
  };

    return (
      <div className="flex items-center justify-center h-screen bg-blue-50">
      <div className="flex flex-col items-center bg-blue-100 w-1/3 h-fit p-6 rounded-lg shadow-md" aria-label="login-container">
        <h1 className="text-3xl mb-2">Sign Up</h1>
        
        <form action="" className="flex flex-col w-3/4">
          <label htmlFor="name" className="text-xl">Name</label>
          <input 
            type="text" 
            id="name" 
            placeholder="Peter Anteater"
            value={userData.name}
            onChange={handleInputChange}
            className="p-2 rounded-lg placeholder-gray-300 outline-none mb-2"
          />
          
          <label htmlFor="username" className="text-xl">Username</label>
          <input 
            type="text" 
            id="username" 
            placeholder="Enter a username"
            value={userData.username}
            onChange={handleInputChange}
            className="p-2 rounded-lg placeholder-gray-300 outline-none mb-2"
          />
          
          <label htmlFor="password" className="text-xl">Password</label>
          <input 
            type="password" 
            id="password" 
            placeholder="Enter a password"
            value={userData.password}
            onChange={handleInputChange}
            className="p-2 rounded-lg placeholder-gray-300 outline-none mb-4"
          />
          
          <button 
            type="submit"
            className="bg-blue-300 py-2 rounded-lg text-xl hover:bg-blue-400 mb-2"
            onClick={handleSignIn}
          >
            Sign Up
          </button>
          
          <button 
            type="button"
            className="text-blue-600 hover:text-blue-800"
            onClick={redirectToLogin}
          >
            I already have an account
          </button>
        </form>
      </div>
    </div>
    )
  }
  
export default Signup
  