import React, {useState} from "react";
import { useNavigate} from 'react-router-dom'

function Login() {
  
    const navigate = useNavigate() ;

  const [login, setlogin] = useState({
    email:"" , 
    password : "" ,
  })

  const [msg, setmsg] = useState("") 

  const inputChange = (e) => 
    {
        const {name,value} = e.target 
        setlogin((prevLogin) => ({
            ...prevLogin , 
            [name] : value 
        }))

    }

  const handleLogin = async(e) => 
    {
        e.preventDefault() ; 
        const url = "http://localhost:5000/api/auth/login" ; 

        const response = await fetch(url , {
            method : 'POST' , 
            headers : {
                "Content-Type": "application/json",
            } , 
            body : JSON.stringify(login)
        })

        const query = await response.json() ; 
        console.log(query)


        if(response.status === 200)
            {
                setmsg(" Login Success ") ; 
                sessionStorage.setItem("accesstoken" , `${query.accesstoken}`) ; 
                sessionStorage.setItem("refreshtoken" , `${query.refreshtoken}`) ; 
                sessionStorage.setItem("name" , `${query.name}`) ; 
                navigate('/')
            }
            else
            {
                setmsg(" Invalid Credentials  ")
            }
    }

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage: "url(https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg)",
              }}
            ></div>
          </div>

          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img
                src="https://storage.googleapis.com/devitary-image-host.appspot.com/15846435184459982716-LogoMakr_7POjrN.png"
                className="w-32 mx-auto"
              />
            </div>
            <div className="mt-2 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div className="my-10 border-b text-center" style={{marginTop:'-20px'}}>
                  <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                    Login
                  </div>
                </div>

                <div className="mx-auto max-w-xs">
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={inputChange}
                  />
                  <input
                    className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={inputChange}
                  />


                  <button className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={(e)=> handleLogin(e)}>
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Login</span>
                  </button>
                  <p className="mt-6 text-xs text-gray-600 text-center" style={{ fontSize: '15px' }}>
                    Create an Account : 
                    <a href="/signup" className="border-b border-gray-500 border-dotted text-blue-700" style={{ marginLeft: '5px' }}>
                    Signup
                  </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
