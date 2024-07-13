import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ApplicantTable from "./Appliedcards";
import Token from "./Token";

const Container = styled.div`
  padding: 20px;
`;

const DisplayApplicants = () => {
  const [post, setPost] = useState([]);
  const username = sessionStorage.getItem("name");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Token();
        const response = await fetch(
          `https://castfit.onrender.com/api/auth/appbyname`,
          {
            method: "POST",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: username }),
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
    <Container>
      <ApplicantTable applicants={post} />
    </Container>
  );
};

export default DisplayApplicants;
