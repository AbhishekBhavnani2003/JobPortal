import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography
} from "@mui/material";
import Token from "./Token";

const ApplicantTable = ({ applicants }) => {
  const [applicantData, setApplicantData] = useState(applicants);

  useEffect(() => {
    setApplicantData(applicants);
  }, [applicants]);

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
      setApplicantData((prevData) =>
        prevData.map((applicant) =>
          applicant._id === id ? { ...applicant, status: status } : applicant
        )
      );
    } else {
      console.log("Failed to update status");
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Age</TableCell>
            <TableCell>Contact No</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Experience</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {applicantData.map((applicant) => (
            <TableRow key={applicant._id}>
              <TableCell>{applicant.name}</TableCell>
              <TableCell>{applicant.address}</TableCell>
              <TableCell>{applicant.age} yrs</TableCell>
              <TableCell>{applicant.contactno}</TableCell>
              <TableCell>{applicant.category}</TableCell>
              <TableCell>{applicant.gender}</TableCell>
              <TableCell>{applicant.experience} yrs</TableCell>
              <TableCell>{applicant.status}</TableCell>
              <TableCell>
                {applicant.status === " You will get the status soon .. " || applicant.status === "Hold" ? (
                  <>
                    <Button
                      variant="contained"
                      sx={{ margin: '5px' }}
                      onClick={() => handleApply(applicant._id, "Accepted")}
                    >
                      Accepted
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ margin: '5px' }}
                      onClick={() => handleApply(applicant._id, "Rejected")}
                    >
                      Rejected
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ margin: '5px' }}
                      onClick={() => handleApply(applicant._id, "Hold")}
                    >
                      Hold
                    </Button>
                  </>
                ) : (
                  <Typography>Response Reviewed</Typography>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ApplicantTable;
