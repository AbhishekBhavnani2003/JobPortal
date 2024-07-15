import * as React from "react";
import { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import styled from "styled-components";
import Jobs from "./Jobs";
import Token from "./Token";
import Footer from './Footer'

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

function JobPage() {
  const [category, setCategory] = useState("");
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleChange = async (event) => {
    setCategory(event.target.value);
    await handleCategoryFilter(event.target.value);
  };
  const fetchJobs = async () => {
    try {
      let token = Token();
      let url = "https://castfit.onrender.com/api/auth/displaypost";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Please Login to continue ! Status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setJob(data);
      } else {
        setJob([]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message);
      setLoading(false);
    }
  };

  const handlegenderfilters = async (gender) => {
    const url = "https://castfit.onrender.com/api/auth/getpostbygender";
    const token = Token();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gender: gender }),
    });
    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        setJob(data);
      } else {
        setJob([]);
      }
    }
  };

  const handleCategoryFilter = async (category) => {
    const url = "https://castfit.onrender.com/api/auth/getpostbycategory";
    const token = Token();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category: category }),
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        setJob(data);
      } else {
        setJob([]);
      }
    }
  };

  const handleExp = async (exp) => {
    const url = "https://castfit.onrender.com/api/auth/getpostbyexp";
    const token = Token();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ exp: exp }),
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data)) {
        setJob(data);
      } else {
        setJob([]);
      }
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div style={{ paddingBottom: "10px" , backgroundColor:'#F8F8FF'}}>
        <Typography sx={{paddingTop:'10px'}}> Filters : </Typography>

        <Box
          sx={{
            margin: "20px",
            display: "flex",
            alignItems: "center",
            gap: 3,
            flexWrap: "wrap",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography>Gender:</Typography>
            <Stack spacing={2} direction="row">
              <Button
                variant="outlined"
                onClick={() => handlegenderfilters("male")}
                sx={{padding:'15px'}}
              >
                Male
              </Button>
              <Button
                variant="outlined"
                onClick={() => handlegenderfilters("female")}
              >
                Female
              </Button>
            </Stack>
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, flex: 1 }}>
            <Typography>Category:</Typography>
            <FormControl sx={{ width: "50%" }}>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={category}
                label="Category"
                onChange={handleChange}
              >
                <MenuItem value={"Actor"}>Actor</MenuItem>
                <MenuItem value={"Singer"}>Singer</MenuItem>
                <MenuItem value={"Dancer"}>Dancer</MenuItem>
                <MenuItem value={"Editor"}>Editor</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box
            component="form"
            sx={{
              "& > :not(style)": { m: 1, width: "25%" },
              display: "flex",
              alignItems: "center",
              marginLeft:'-9px'
            }}
            noValidate
            autoComplete="off"
          >
            <Typography>Experience:</Typography>
            <TextField
              id="standard-basic"
              label="Exp."
              variant="outlined"
              onBlur={(e) => handleExp(e.target.value)}
            />
          </Box>
        </Box>
      </div>

      <JobsGrid>
        {job.map((jobData) => (
          <Jobs key={jobData.id} job={jobData} />
        ))}
      </JobsGrid>

      <Footer/>
    </>
  );
}

export default JobPage;
