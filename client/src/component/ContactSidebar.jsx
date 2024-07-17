import React from "react";
import { useNavigate } from "react-router-dom";

function ContactSidebar() {
  const username = sessionStorage.getItem("name");
  const navigate = useNavigate();
  return (
    <div className="bg-white h-full lg:h-screen flex flex-col items-end">
      <div className="flex-1 mt-16 lg:mr-4 w-full lg:w-96 bg-white shadow-xl rounded-lg relative">
        <div className="bg-zinc-950 h-64 rounded-t-lg absolute w-full z-0"></div>
        <div className="flex flex-col h-full p-4 space-y-4">
          <div className="flex flex-col z-10 ml-4 text-white">
            <svg
              className="w-10 h-10 mb-3 -ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
              ></path>
            </svg>
            <div className="text-3xl mb-2">Hello, {username} 👋</div>
            <div
              className="w-60 text-gray-200 text-sm mb-1"
              style={{ margin: "auto" }}
            >
              Discover how CastFit can connect you to your dream opportunities.
            </div>
          </div>
          <div className="border-0 border-t-4 border-blue-500 rounded z-10 shadow-md text-sm">
            <div className="bg-white border border-t-0 rounded-t-none rounded-b flex flex-col space-y-2">
              <div className="px-6 py-4 flex flex-col items-start gap-3">
                <div className="font-semibold">Start your journey today</div>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-row -space-x-10">
                    <img
                      className="w-16 h-16 rounded-full border-2 border-white"
                      src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=facearea&w=256&h=256&facepad=2"
                      alt="User 1"
                    />
                    <img
                      className="w-16 h-16 rounded-full border-2 border-white"
                      src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=facearea&w=256&h=256&facepad=2"
                      alt="User 2"
                    />
                    <img
                      className="w-16 h-16 rounded-full border-2 border-white"
                      src="https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=facearea&w=256&h=256&facepad=2"
                      alt="User 3"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <div className="text-gray-400">Quick response time</div>
                    <div className="flex flex-row items-center gap-1 font-semibold">
                      <svg
                        className="w-4 h-4 text-blue-700"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      Within minutes
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="bg-blue-700 rounded-full text-white flex flex-row gap-2 py-3 px-5"
                >
                  <svg
                    className="w-5 h-5 transform rotate-90"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                  Start exploring
                </button>
              </div>
              <div className="border-t px-6 py-4">
                <a
                  href="/jobs"
                  className="text-sm text-blue-500 hover:text-blue-300"
                >
                  View all opportunities
                </a>
              </div>
            </div>
          </div>
          <div className="bg-white border rounded flex items-center justify-center p-8 z-10">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Find Your Dream Job Today!
              </h2>
              <p className="text-gray-600">
                Discover thousands of opportunities waiting for you. Take the
                next step towards your career goals with CastFit.
              </p>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700"
                onClick={() => navigate("/jobs")}
              >
                Explore Jobs
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactSidebar;
