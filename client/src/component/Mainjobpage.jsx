import React, { useEffect, useState } from "react";
import Token from "./Token";
import Jobs from "./Jobs";
import styled from "styled-components";

function Mainjobpage() {
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        let token = Token();
        let url = "http://localhost:5000/api/auth/displaypost";
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setJob(data);
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <JobsGrid >
      {job.map((jobData) => (
        <Jobs key={jobData.id} job={jobData} />
      ))}
    </JobsGrid>
  );
}

export default Mainjobpage;
