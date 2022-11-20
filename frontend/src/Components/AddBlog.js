import { Button, InputLabel, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
const lableStyles = {fontSize:'24px',fontWeight:'bold'}

const AddBlog = () => {
  const navigate = useNavigate()
  const sendRequest = async () => {
    const  res = await axios.post("http://localhost:5000/api/blog/add",{
      title:inputs.title,
      description:inputs.description,
      image:inputs.imageURL,
      user:localStorage.getItem("userId")
    }).catch((err) => console.log(err))
    const data = await  res.data;
    return data
  }

  const [inputs, setInputs] = useState({
    title:"",description:"",imageURL:''
  })
  const handleChange = (e) => {
    setInputs((prevState)=>( {
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    
    sendRequest().then((data) => console.log(data)).then(()=>navigate("/blogs"))
  }
  return (
    <div style={{width:"900px",marginLeft:"400px",marginRight:"auto"}}>
      <form onSubmit={handleSubmit} >
        <Box  height={'400px'} display={'flex'} flexDirection='column' width="50%" border={3} borderColor='linear-gradient(90deg, rgba(0,6,36,1) 0%, rgba(32,188,197,1) 35%, rgba(255,0,216,1) 100%);' borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={3}>
          <Typography fontWeight={'bold'} padding={3}   color='gray' variant='h4' textAlign={'center'}>
            Post Your Blog
          </Typography>
          <InputLabel sx={lableStyles}>Title</InputLabel>
          <TextField name='title' onChange={handleChange}  value={inputs.title} margin='auto' variant='outlined'/>
          <InputLabel  sx={lableStyles} >Description</InputLabel>
          <TextField name='description' onChange={handleChange} value={inputs.description} margin='auto' variant='outlined'/>
          <InputLabel  sx={lableStyles}>ImageURL</InputLabel>
          <TextField name='imageURL' onChange={handleChange} value={inputs.imageURL} margin='auto' variant='outlined'/>
        <Button sx={{mt:2,borderRadius:4}} variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>
    </div>
  )
}

export default AddBlog