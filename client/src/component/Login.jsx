import React, { useState , useEffect } from "react";
import { useNavigate , Link} from "react-router-dom";
import { Typography } from "@mui/material";
import { messaging } from './Firebase';
import { getToken } from 'firebase/messaging';

function Login() {
  const navigate = useNavigate();

  const [login, setlogin] = useState({
    email: "",
    password: "",
  });

  const [msg, setmsg] = useState("");
  const [fcmToken, setFcmToken] = useState("");

  const inputChange = (e) => {
    const { name, value } = e.target;
    setlogin((prevLogin) => ({
      ...prevLogin,
      [name]: value,
    }));
  };
 

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken(messaging, { vapidKey: 'BKRNTjBM1eRBPXw4X1Ns112YirSresp1Tdgl2XgKwnm5MA2sICg31UFpQg7aQL0mD4CRYxC41DS9soR9Jy07e2c' });
        if (token) {
          setFcmToken(token);
        } else {
          console.warn('No registration token available. Request permission to generate one.');
        }
      } catch (error) {
        console.error('An error occurred while retrieving token. ', error);
      }
    };
  
    fetchToken();
  }, []);

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = "https://castfit.onrender.com/api/auth/login";
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...login, fcmToken }),
    });
  
    const query = await response.json();
    console.log(query);
  
    if (response.status === 200) {
      setmsg(" Login Success ");
      sessionStorage.setItem("accesstoken", `${query.accesstoken}`);
      sessionStorage.setItem("refreshtoken", `${query.refreshtoken}`);
      sessionStorage.setItem("name", `${query.name}`);
      navigate("/");
      
      if (Notification.permission === 'granted') {
        new Notification('Welcome to CastFit', {
          body: 'You have successfully logged in!',
        });
      } else {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Welcome to CastFit', {
              body: 'You have successfully logged in!',
            });
          }
        });
      }
    } else {
      setmsg("Invalid Credentials");
    }
  };
  

  return (
    <div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="flex-1 text-center hidden lg:flex">
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              }}
            ></div>
          </div>

          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <div
                className="flex flex-shrink-0 items-center"
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    fontSize: "20px",
                    border: "1px solid black",
                    fontWeight: "bold",
                    padding: "2px",
                    margin: "2px",
                    color: "yellow",
                  }}
                >
                  🎬
                </div>
                <Link
                  to="/"
                  style={{
                    color: "#003135",
                    fontSize: "20px",
                    marginLeft: "8px",
                  }}
                >
                  Cαട𝜏Ƒι𝜏.
                </Link>
              </div>
            </div>
            <div className="mt-2 flex flex-col items-center">
              <div className="w-full flex-1 mt-8">
                <div
                  className="my-10 border-b text-center"
                  style={{ marginTop: "-20px" }}
                >
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

                  <button
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    onClick={(e) => handleLogin(e)}
                  >
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
                  <p
                    className="mt-6 text-xs text-gray-600 text-center"
                    style={{ fontSize: "15px" }}
                  >
                    Create an Account :
                    <a
                      href="/signup"
                      className="border-b border-gray-500 border-dotted text-blue-700"
                      style={{ marginLeft: "5px" }}
                    >
                      Signup
                    </a>
                  </p>
                </div>

                {msg && (
                  <Typography
                    style={{
                      textAlign: "center",
                      marginTop: "20px",
                      color: "red",
                    }}
                  >
                    {msg}
                  </Typography>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
