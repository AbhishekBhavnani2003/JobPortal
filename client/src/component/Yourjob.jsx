import React, { useState, useEffect } from "react";
import Token from "./Token";
import styled from "styled-components";
import Jobcard from './Yourjobcard'

const JobsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 16px;
  align-items: center;

  @media (min-width: 768px) and (max-width: 999px) {
    grid-template-columns: repeat(2, 1fr); /* Two columns for tablets */
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(3, 1fr); /* Three columns for desktop */
  }

  @media (max-width: 1300px) {
    margin: auto;
  }

  @media (max-width: 400px) {
    margin-left: -15px;
  }
`;

function Yourjob() {
  const username = sessionStorage.getItem("name");
  console.log(username);
  const [job, setJob] = useState([]);

  const fetchjobacprofile = async (username) => {
    try {
      const token = Token();

      if (!token) {
        throw new Error('Token not found');
      }
      const url = "http://localhost:5000/api/auth/getpostbyname";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setJob(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (username) {
      fetchjobacprofile(username);
    } else {
      console.error("Username not found in session storage");
    }
  }, [username]);

  return (
    <div>
      <JobsGrid>
        {job.map((jobData) => (
          <Jobcard key={jobData.id} job={jobData} />
        ))}
      </JobsGrid>
    </div>
  );
}

export default Yourjob;
