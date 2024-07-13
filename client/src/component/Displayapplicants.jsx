import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import ApplicantTable from "./Applicantscard";
import Token from "./Token";

const Container = styled.div`
  padding: 20px;
`;

const DisplayApplicants = () => {
  const [post, setPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Token();
        const response = await fetch(
          `https://castfit.onrender.com/api/auth/getapplicants/${id}`,
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
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <Container>
      <ApplicantTable applicants={post} />
    </Container>
  );
};

export default DisplayApplicants;
