import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { messaging } from "./Firebase";
import { getToken } from "firebase/messaging";

function Login() {
  const [signup, setSignup] = useState({
    name: "",
    password: "",
    email: "",
    fcmToken: "",
  });

  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken(messaging, {
          vapidKey:
            "BKRNTjBM1eRBPXw4X1Ns112YirSresp1Tdgl2XgKwnm5MA2sICg31UFpQg7aQL0mD4CRYxC41DS9soR9Jy07e2c",
        });
        if (token) {
          console.log("FCM Token:", token);
          setSignup((prevState) => ({ ...prevState, fcmToken: token }));
        } else {
          console.warn(
            "No registration token available. Request permission to generate one."
          );
        }
      } catch (error) {
        console.error("An error occurred while retrieving token. ", error);
      }
    };

    fetchToken();
  }, []); 

  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    setMessage("");
    if (Object.keys(validationErrors).length === 0) {
      const url = "https://castfit.onrender.com/api/auth/signup";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signup),
      });

      const json = await response.json();
      console.log(json);

      if (response.status === 200) {
        setMessage("User Registered Successfully. Please Login to continue."); 
              
      if (Notification.permission === 'granted') {
        new Notification('Welcome to CastFit', {
          body: 'You have successfully Signed in!',
        });
      } else {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Welcome to CastFit', {
              body: 'You have successfully Signed in!',
            });
          }
        });
      }
      } else if (response.status === 409) {
        setMessage("Email is already registered.");
        setErrors({ email: "Email is already registered" });
      } else {
        setMessage("User Not Registered Successfully");
      }
    }
  };

  const validate = () => {
    const errors = {};
    if (!signup.name.trim()) {
      errors.name = "Name is required";
    }
    if (!signup.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(signup.email)) {
      errors.email = "Email is invalid";
    }
    if (!signup.password) {
      errors.password = "Password is required";
    } else if (signup.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setSignup((prevSignup) => ({
      ...prevSignup,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
      <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
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
            <div className="w-full flex-1 mt-1">
              <div className="my-12 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                  Sign up with e-mail
                </div>
              </div>
              <div className="mx-auto max-w-xs">
                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                  type="text"
                  name="name"
                  value={signup.name}
                  placeholder="Name"
                  onChange={onInputChange}
                />
                {errors.name && (
                  <p className="text-red-600 text-sm">{errors.name}</p>
                )}

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="password"
                  name="password"
                  value={signup.password}
                  placeholder="Password"
                  onChange={onInputChange}
                />
                {errors.password && (
                  <p className="text-red-600 text-sm">{errors.password}</p>
                )}

                <input
                  className="w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                  type="email"
                  name="email"
                  value={signup.email}
                  placeholder="Email"
                  onChange={onInputChange}
                />
                {errors.email && (
                  <p className="text-red-600 text-sm">{errors.email}</p>
                )}
                <button
                  className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                  onClick={(e) => handleSignup(e)}
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
                  <span className="ml-3">Sign Up</span>
                </button>
                <p
                  className="mt-6 text-xs text-gray-600 text-center"
                  style={{ fontSize: "15px" }}
                >
                  Already have an account:
                  <a
                    href="/login"
                    className="border-b border-gray-500 border-dotted text-blue-700"
                    style={{ marginLeft: "5px" }}
                  >
                    Login
                  </a>
                </p>
              </div>
              {message && (
                <p className="mt-2 text-center text-sm text-red-600">
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="flex-1 text-center hidden lg:flex">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url(https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Login;
