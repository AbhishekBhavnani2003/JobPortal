// Navbar.js
import React, { Fragment, useEffect, useState } from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import {
  Disclosure,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";

const navigation = [
  { name: "Home", href: "/", title: "Home", current: false },
  { name: "Find Job", href: "/", title: "Find Job", current: false },
  { name: "Post Job", href: "/postjob", title: "Post Job", current: false }, // Ensure this path is correct
  { name: "Customer Support", href: "/", title: "Customer Support", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);

  useEffect(() => {
    const path = location.pathname;
    setCurrentPath(path);

    const currentPage = navigation.find((item) => item.href === path);
    if (currentPage) {
      document.title = `JobPortal : ${currentPage.title}`;
    }

    const favicon = document.getElementById("favicon");
    if (favicon) {
      favicon.href = `/favicon-${currentPage.title.toLowerCase()}.ico`;
    }
  }, [location.pathname]);

  const handleSignOut = () => {
    sessionStorage.clear();
  };

  const name = sessionStorage.getItem("name");

  return (
    <Disclosure as="nav" className="bg-gray-800" style={{ backgroundColor: "#003135" }}>
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 navbarstyle" style={{ background: `#05051B`, color: "white", position: "" }}>
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? <XMarkIcon className="block h-6 w-6" aria-hidden="true" /> : <Bars3Icon className="block h-6 w-6" aria-hidden="true" />}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center" style={{ marginLeft: window.innerWidth < 1024 ? "30px" : "0" }}>
                  <div style={{ fontSize: "20px", border: "1px solid white", fontWeight: "bold", padding: "2px", margin: "2px", color: 'yellow' }}>
                    J
                  </div>
                  <Link to="/" style={{ color: "#AFDDE5", fontSize: "20px", marginLeft: "8px" }}>
                    JobPilot.
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          currentPath === item.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <Menu as="div" className="relative ml-3">
                <div>
                  <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">Open user menu</span>
                    <AccountCircleOutlinedIcon fontSize="large" />
                  </MenuButton>
                </div>
                <Transition
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <MenuItem>
                      {({ focus }) => (
                        <a
                          onClick={handleSignOut}
                          href="/signup"
                          className={classNames(
                            focus ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                        >
                          {!name == " " ? ` Sign Out ` : ` Signup`}
                        </a>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Transition>
              </Menu>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2" style={{ background: "linear-gradient(to bottom, #374151, #111827) " }}>
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={classNames(
                    currentPath === item.href ? "bg-gray-900 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
