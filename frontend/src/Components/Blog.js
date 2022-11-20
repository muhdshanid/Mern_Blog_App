import * as React from 'react';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';

import Avatar from '@mui/material/Avatar';

import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { IconButton } from '@mui/material';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Blog = ({title,description,imageURL,userName,isUser,id}) => {
  const navigate = useNavigate()
  const handleEdit = (e) => {
    navigate(`/myBlogs/${id}`)
  }
  console.log(isUser,title);
  const deleteRequest = async () => {
    const res = await axios.delete(`http://localhost:5000/api/blog/${id}`).catch((err) => console.log(err))
    const data = await res.data;
    return data
  }
  const handleDelete = () => {
    deleteRequest().then(()=>navigate("/")).then(()=>navigate("/blogs"))
  }
  return (
    <div>
        <Card sx={{ width:'40%' ,margin:'auto',marginTop:2,padding:2,boxShadow:"5px 5px 10px #ccc",":hover:":
        {boxShadow:'10px 10px 20px #ccc'}}}>
          {isUser && (
            <Box display='flex'>
              <IconButton onClick={handleEdit} sx={{marginLeft:'auto'}}><ModeEditOutlineIcon color='warning'/></IconButton>
              <IconButton onClick={handleDelete}><DeleteForeverIcon color='error'/></IconButton>
            </Box>
          )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {userName.charAt(0)}
          </Avatar>
        }
        
        title={title}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageURL}
        alt="Paella dish"
      />
     
      <CardContent>
      <hr />
      <br />
        <Typography variant="body2" color="text.secondary">
          <b>{userName}</b> {":"}
          {description}
        </Typography>
      </CardContent>
      
    </Card>
    </div>
  )
}

export default Blog