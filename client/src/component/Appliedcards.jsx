import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Token from "./Token";

const MultiActionAreaCard = ({ applicant }) => {
  const navigate = useNavigate();


  const handleApply = async (status) => {
      
    const id = applicant._id 
    const url = `http://localhost:5000/api/auth/updatestatus/${id}`
    const token = Token()
    const response = await fetch(url, {
      method : "PUT" , 
      headers : 
      {
        Authorization: `${token}`,
        "Content-Type": "application/json",
      }, 
      body : JSON.stringify({status : status})
    })
    
  };

  return (
    <Card sx={{ maxWidth: 600, minWidth: 350, margin: "30px" }}>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6">Name:</Typography>
          <Typography variant="body2" color="text.secondary">
            {applicant.name}
          </Typography>
        </CardContent>

        <CardContent>
          <Typography variant="h6">Address:</Typography>
          <Typography variant="body2" color="text.secondary">
            {applicant.address}
          </Typography>
        </CardContent>

        <CardContent sx={{ display: "flex", alignItems: "center", justifyContent:'center' , alignContent:'center' }}>
          <Typography variant="h6">Age:</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginLeft: "5px" }}>
            {applicant.age} yrs
          </Typography>
        </CardContent>

        <CardContent sx={{ display: "flex", alignItems: "center" , justifyContent:'center'}}>
          <Typography variant="h6">Contact no:</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ marginLeft: "5px" }}>
            {applicant.contactno}
          </Typography>
        </CardContent>
      </CardActionArea>

      <CardActions sx={{ justifyContent: "space-around" }}>
        <div>
          <Typography variant="h6">Category:</Typography>
          <Button size="small" color="primary">
            {applicant.category}
          </Button>
        </div>
        <div>
          <Typography variant="h6">Gender:</Typography>
          <Button size="small" color="primary">
            {applicant.gender}
          </Button>
        </div>
      </CardActions>


      <CardActions sx={{ justifyContent: "center" , display:'flex' , flexDirection:'column' }}>
        <Typography variant="h6">~ See your application status here:</Typography>
        <Button size="small" color="primary">
            {applicant.status}
          </Button>
      </CardActions>

    </Card>
  );
};

export default MultiActionAreaCard;

