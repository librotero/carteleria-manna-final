import { useState } from 'react';
import { Link }  from 'react-router-dom';
import useUser from '../store/user';

const Login = () => {
  const { signin } = useUser((state) => state);
  const [values, setValues] = useState({
    email: '',
    password: '',
    
  });

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    const { name, value } = e.currentTarget;
    setValues({
      ...values,
      [name]: value
    });
  };
  
  const handleLogingSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    signin(values)
    
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center p-4">
      <img src="https://carteleriamanna.com.ar/sistema/img/login/logo.png" alt="manna logo" className="mb-8 "/>
      <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  bg-[#77B327]">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-4xl text-center font-bold">BIENVENIDO</h1>
          <form onSubmit={handleLogingSubmit} className="flex flex-col mt-4">
            <input
                type="email"
                name="email"
                className="px-4 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="Email address"
                value={values.email}
                onChange={handleChange}
                required
            />
            <input
                type="password"
                name="password"
                className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                required
            />
            <button
                type="submit"
                className="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-red-700 hover:bg-red-900 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
            >
              Iniciar Sesión
            </button>
            <div className="flex flex-col items-center mt-5">
              
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login
