import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import Applicationform from "./Applicationform";
import { Navigate, useNavigate, Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import { Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Token from "./Token";

const MAX_WORDS = 20;

export default function MultiActionAreaCard({ job }) {
  const words = job.description ? job.description.split(" ") : [];
  const trim_title = job.title ? job.title.split(" ") : [];

  const truncatedDescription =
    words.length > MAX_WORDS
      ? words.slice(0, MAX_WORDS).join(" ") + "..."
      : job.description;
  const truncatedTitle =
    trim_title.length > 3
      ? trim_title.slice(0, 3).join(" ") + "..."
      : job.title;

  const auditionTimeUTC = new Date(job.audition.time);

  const options = {
    timeZone: "Asia/Kolkata",
    hour12: true,
    hour: "numeric",
    minute: "numeric",
  };

  const navigate = useNavigate();
  const auditionTimeIST = auditionTimeUTC.toLocaleTimeString("en-IN", options);

  const hadleapply = () => {
    const id = job._id;
    navigate(`/applicationform/${id}`);
  };

  const username = sessionStorage.getItem("name");
  const postname = job.createdby;
  const postid = job._id;

  const handledelete = async () => {
    const url = `http://localhost:5000/api/auth/deletepost/${postid}`;
    const token = Token() ; 
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      },
    }); 

    if(response.ok)
    {
       navigate('/')
    }
  };

  const handleupdatepost = async() => 
  {
    navigate(`/updatepost/${postid}`)
  }

  return (
    <Card sx={{ maxWidth: 600, minWidth: 350, margin: "30px" }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {truncatedTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {truncatedDescription}
          </Typography>
        </CardContent>

        <CardContent>
          <Typography> Audition Details : </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginLeft: "20px",
            }}
          >
            <Typography> Venue : </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginLeft: "15px" }}
            >
              {job.audition.venue}
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginLeft: "20px",
            }}
          >
            <Typography> Date : </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginLeft: "15px" }}
            >
              {new Date(job.audition.date).toDateString()}
            </Typography>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
              marginLeft: "20px",
            }}
          >
            <Typography> Time : </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginLeft: "15px" }}
            >
              {auditionTimeIST}
            </Typography>
          </div>
        </CardContent>

        <CardContent>
          <Typography>Agegroup : </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginTop: "20px",
              justifyContent: "space-around",
            }}
          >
            <Typography>From : </Typography>
            <Typography variant="body2" color="text.secondary">
              {job.agegroup.from} yrs
            </Typography>

            <Typography>To : </Typography>
            <Typography variant="body2" color="text.secondary">
              {job.agegroup.to} yrs
            </Typography>
          </div>
        </CardContent>

        <CardContent
          sx={{ display: "flex", alignItems: "center", marginLeft: "20px" }}
        >
          <Typography>Experience required :</Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ marginLeft: "5px" }}
          >
            {job.experience} yrs
          </Typography>
        </CardContent>
      </CardActionArea>

      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <CardActions>
          <Typography> Category : </Typography>
          <Button size="small" color="primary">
            {job.category}
          </Button>
          <Typography> Gender : </Typography>
          <Button size="small" color="primary">
            {job.gender}
          </Button>
        </CardActions>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography> ~ Posted by : </Typography>
        <Button size="small" color="primary">
          {job.createdby}
        </Button>
      </div>

      <div style={{ padding: "10px" }}>
        <Button variant="contained" onClick={hadleapply}>
          Apply
        </Button>
      </div>

      <div>
        <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
          {username === postname && (
            <>
              <Button onClick={() => handledelete()}>
                <DeleteIcon
                  color="error"
                  fontSize="large"
                  sx={{
                    margin: "10px",
                    padding: "5px",
                    border: "1px solid #878787",
                    borderRadius: "5px",
                    "&:hover": {
                      cursor: "pointer",
                    },
                  }}
                />
              </Button>
              
              <Button onClick={() => handleupdatepost()}>
                <EditIcon  
                  color="primary"
                  fontSize="large"
                  sx={{
                    margin: "10px",
                    padding: "5px",
                    border: "1px solid #878787",
                    borderRadius: "5px",
                  }}
                /> 
              </Button>
            </>
          )}
        </Box>
      </div>
    </Card>
  );
}
