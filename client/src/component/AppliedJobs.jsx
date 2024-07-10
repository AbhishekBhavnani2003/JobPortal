import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MultiActionAreaCard from "./Appliedcards";
import Token from "./Token";

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

const DisplayApplicants = () => {
  const [post, setPost] = useState([]);
  const username = sessionStorage.getItem("name") ; 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Token();
        const response = await fetch(
          `http://localhost:5000/api/auth/appbyname`,
          {
            method: "POST",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
            body : JSON.stringify({ name : username})
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <JobsGrid>
      {post.map((applicant) => (
        <MultiActionAreaCard key={applicant._id} applicant={applicant} />
      ))}
    </JobsGrid>
  );
};

export default DisplayApplicants;
