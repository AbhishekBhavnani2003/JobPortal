import * as React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { useNavigate } from 'react-router-dom';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Token from "./Token";

function Applicationform() {
  const initialapplication = {
    name: "",
    address: "",
    contactno: "",
    location: "",
    gender: "",
    age: "",
    experience: "",
    category: "",
  };

  const [application, setapplication] = useState(initialapplication);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [experience, setExperience] = useState("");
  const [post, setPost] = useState(null);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate(); 
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Token();
        const response = await fetch(
          `http://localhost:5000/api/auth/getpost/${id}`,
          {
            method: "GET",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPost(data);
        setGender(data.gender); 
        setExperience(data.experience);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleform = (e) => {
    if (!e || !e.target) {
      console.error("Event or target is null");
      return;
    }

    const { name, value } = e.target;

    setapplication((prevApplication) => ({
      ...prevApplication,
      [name]: value,
    }));

    if (name === "age") {
      setAge(value);
    }

    if (name === "experience") {
      setExperience(value);
    }

    // Clear any existing errors when user starts typing
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

  };

  const validateForm = () => {
    const newErrors = {};
    const { contactno, age, experience } = application;

    // Validate contact number 
    if (contactno.length !== 10) {
      newErrors.contactno = "Contact number must be exactly 10 digits.";
    }

    // Validate age
    if (post && post.agegroup) {
      const ageValue = parseInt(age, 10);
      if (ageValue < post.agegroup.from || ageValue > post.agegroup.to) {
        newErrors.age = `Age must be between ${post.agegroup.from} and ${post.agegroup.to}.`;
      }
    }

    // Validate experience
    if (post && post.experience) {
      const experienceValue = parseInt(experience, 10);
      if (experienceValue < post.experience) {
        newErrors.experience = `Experience must be at least ${post.experience} years.`;
      }
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const submitapplication = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const token = Token();
    const postcategory = post.category;
    const postid = post._id;
    const postgender = post.gender ;
    const name = sessionStorage.getItem('name')
    const appdata = {
      ...application,
      category: postcategory,
      name : name ,
      gender : postgender , 
      postid: postid
    };

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/newapplication",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: ` ${token}`,
          },
          body: JSON.stringify(appdata),
        }
      );

      if (response.ok) {
        console.log("Application saved successfully");
        navigate("/jobs");
      } else {
        console.error("Failed to save post:", response.statusText);
        const result = await response.json();
        console.error("Error response:", result);
      }
    } catch (error) {
      console.error("Error saving post:", error);
    }
  };

  return (
    <div>
      <div className="bg-gray-100">
        <div className="container mx-auto py-12">
          <div className="max-w-lg mx-auto px-4">
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">
              Application form
            </h2>
            <p className="text-gray-700 mb-8">
              You will get your application status within 3 days of application.
              Wish you the best ...
            </p>
            <form className="bg-white rounded-lg px-6 py-8 shadow-md">
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  name="name"
                  value={sessionStorage.getItem('name')}
                  readOnly
                  placeholder="Enter your name" 
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="contactno"
                >
                  Contact no
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="contactno"
                  type="text"
                  name="contactno"
                  value={application.contactno}
                  onChange={handleform}
                  placeholder="Enter your contact number"
                />
                {errors.contactno && (
                  <p className="text-red-500 text-xs italic">{errors.contactno}</p>
                )}
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <textarea
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="address"
                  rows="4"
                  name="address"
                  value={application.address}
                  onChange={handleform}
                  placeholder="Enter your address"
                ></textarea>
              </div>  

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="location"
                >
                  Location 
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="location"
                  type="text"
                  name="location"
                  value={application.location}
                  onChange={handleform}
                  placeholder="Enter your state"
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="gender"
                >
                  Gender
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="gender"
                  type="text"
                  name="gender"
                  value={gender}
                  readOnly
                />
              </div>

              <div style={{ textAlign: "center" }}>
              <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="age"
                >
                  Age 
                </label>
              </div>
              {post && post.agegroup && (
                <FormControl
                  fullWidth
                  sx={{ marginTop: "10px", marginBottom: "20px" }}
                >
                  <input
                    type="number"
                    name="age"
                    id="age"
                    min={post.agegroup.from}
                    max={post.agegroup.to}
                    value={age}
                    onChange={handleform}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs italic">{errors.age}</p>
                  )}
                </FormControl>
              )}
              
              <div className="mb-4">
                <label
                  className="block text-gray-700 font-bold mb-2"
                  htmlFor="experience"
                >
                  Experience (in years)
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="experience"
                  type="number"
                  name="experience"
                  value={experience}
                  min={0 || (post)? post.experience : 0} 
                  max={20}
                  onChange={handleform}
                  placeholder="Enter your experience in years"
                />
                {errors.experience && (
                  <p className="text-red-500 text-xs italic">{errors.experience}</p>
                )}
              </div>

              <div className="flex justify-end" style={{ marginTop: "50px" }}>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="button"
                  onClick={submitapplication}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Applicationform;
