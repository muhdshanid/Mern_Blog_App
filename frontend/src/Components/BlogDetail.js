import { Button, InputLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
const lableStyles = {fontSize:'24px',fontWeight:'bold'}

const BlogDetail = () => {
  const navigate = useNavigate()
  const [blog, setBlog] = useState()
  const id = useParams().id
  console.log(id);
  const [inputs, setInputs] = useState({
    
  })
  const handleChange = (e) => {
    setInputs((prevState)=>( {
      ...prevState,
      [e.target.name] : e.target.value
    }))
  }
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/blog/${id}`).catch((err)=> console.log(err))
    const data = await res.data;
    return data
  }
  useEffect(()=>{
    fetchDetails().then((data)=>{setBlog(data.blog)
      setInputs({title:data.blog.title,
      description:data.blog.description})
    })
  },[id])
  const sendRequest = async ()=> {
    const res = await axios.put(`http://localhost:5000/api/blog/update/${id}`,{
      title:inputs.title,
      description:inputs.description,
    }).catch((err)=>console.log(err))
    const data = await res.data;
    return data
  }
  console.log(blog);
  const handleSubmit  = (e) => {
    e.preventDefault()
    console.log(inputs);
    sendRequest().then((data)=>console.log(data)).then(()=>navigate("/myBlogs"))
  }

  return (
    <div>
     {inputs &&  <form onSubmit={handleSubmit} >
        <Box  height={'400px'} display={'flex'} flexDirection='column'  width="50%" border={3} borderColor='linear-gradient(90deg, rgba(0,6,36,1) 0%, rgba(32,188,197,1) 35%, rgba(255,0,216,1) 100%);' borderRadius={10} boxShadow="10px 10px 20px #ccc" padding={3} margin={3}>
          <Typography fontWeight={'bold'} padding={3}   color='gray' variant='h4' textAlign={'center'}>
            Post Your Blog
          </Typography>
          <InputLabel sx={lableStyles}>Title</InputLabel>
          <TextField name='title' onChange={handleChange}  value={inputs.title} margin='auto' variant='outlined'/>
          <InputLabel  sx={lableStyles} >Description</InputLabel>
          <TextField name='description' onChange={handleChange} value={inputs.description} margin='auto' variant='outlined'/>
          
        <Button sx={{mt:2,borderRadius:4}} variant='contained' color='warning' type='submit'>Submit</Button>
        </Box>
      </form>}
    </div>
  )
}

export default BlogDetail