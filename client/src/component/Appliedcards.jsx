import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@mui/material";
import Token from "./Token";

const ApplicantTable = ({ applicants }) => {
  const [posts, setPosts] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = Token();
      const fetchedPosts = await Promise.all(
        applicants.map(async (applicant) => {
          const postid = applicant.postid;
          const url = `http://localhost:5000/api/auth/getpost/${postid}`;
          const response = await fetch(url, {
            method: "GET",
            headers: {
              Authorization: `${token}`,
              "Content-Type": "application/json",
            },
          });
          const data = await response.json();
          return { ...data, applicantId: applicant._id };
        })
      );
      setPosts(fetchedPosts);
    };

    fetchPosts();
  }, [applicants, updateTrigger]);

  const handleApply = async (id, status) => {
    const url = `http://localhost:5000/api/auth/updatestatus/${id}`;
    const token = Token();
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: status }),
    });

    if (response.ok) {
      setUpdateTrigger((prev) => !prev);
    } else {
      console.log("Failed to update status");
    }
  };

  const getPostDetails = (applicantId) => {
    return posts.find((post) => post.applicantId === applicantId) || {};
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Age Group</TableCell>
            <TableCell>Audition Venue</TableCell>
            <TableCell>Audition Date</TableCell>
            <TableCell>Audition Time</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applicants.map((applicant) => {
            const post = getPostDetails(applicant._id);
            return (
              <TableRow key={applicant._id}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.category}</TableCell>
                <TableCell>{post.description}</TableCell>
                <TableCell>{post.experience} yrs</TableCell>
                <TableCell>{post.gender}</TableCell>
                <TableCell>{`${post.agegroup?.from} - ${post.agegroup?.to}`}</TableCell>
                <TableCell>{post.audition?.venue}</TableCell>
                <TableCell>{new Date(post.audition?.date).toLocaleDateString()}</TableCell>
                <TableCell>{new Date(post.audition?.time).toLocaleTimeString()}</TableCell>
                <TableCell>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleApply(applicant._id, "Reviewed")}
                  >
                    {applicant.status}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApplicantTable;
