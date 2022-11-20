
import React, { useState } from 'react'
import {AppBar,Typography,Toolbar,Box,Button,Tabs,Tab} from '@mui/material'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../Store'

const Header = () => {
    const dispatch = useDispatch();
    const [value, setvalue] = useState()
    const isLoggedIn = useSelector((state)=>state.isLoggedIn);
  return (
   <AppBar position='sticky' sx={{background:'linear-gradient(90deg, rgba(0,6,36,1) 0%, rgba(32,188,197,1) 35%, rgba(255,0,216,1) 100%);'}}>
    <Toolbar>
        <Typography variant='h4'>
            BlogsApp
        </Typography>
      {isLoggedIn &&  (<Box display={'flex'} sx={{width:"900px"}} marginLeft='auto' marginRight={''} justifyContent='end'>
        <Link style={{margin:"20px",textDecoration:"none",color:"inherit",fontSize:"20px"}} to={"/blogs"}>All Blogs</Link>
        <Link style={{margin:"20px",textDecoration:"none",color:"inherit",fontSize:"20px"}} to={"/myBlogs"}>My Blogs</Link>
        <Link style={{margin:"20px",textDecoration:"none",color:"inherit",fontSize:"20px"}} to={"/blogs/add"}>Add Blogs</Link>
        
            {/* <Tabs textColor='inherit' value={value} onChange={(e,val) =>setvalue(val)}>
                <Tab LinkComponent={Link} to='/blogs' label='All Blogs'/>
                <Tab LinkComponent={Link} to='/myBlogs' label='My Blogs' />
                <Tab LinkComponent={Link} to='/blogs/add' label='Add Blog' />

            </Tabs> */}
        </Box>)}
        <Box display={'flex'} marginLeft='auto'>
           {!isLoggedIn && (<><Button LinkComponent={Link} to='/auth' variant='contained' sx={{margin:1,borderRadius:10}} color='warning'>Login</Button>
            <Button LinkComponent={Link} to='/auth' variant='contained' sx={{margin:1,borderRadius:10}} color='warning'>Signup</Button> </> )}
{           isLoggedIn && (<Button onClick={()=>dispatch(authActions.logout())} LinkComponent={Link} to='/auth' variant='contained' sx={{margin:1,borderRadius:10}} color='warning' >Logout</Button>)
}        </Box>
    </Toolbar>
   </AppBar>
  )
}

export default Header