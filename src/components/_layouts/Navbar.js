import React, { Component } from 'react';
import AppBar from "@material-ui/core/AppBar";
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import {red} from '@material-ui/core/colors'
import {makeStyles, createMuiTheme} from "@material-ui/core/styles"
import Typoraphy from "@material-ui/core/Typography"
import { Link } from 'react-router-dom';


const theme = createMuiTheme({
    palette:{
        primary:{
            main: red[500]
        }
    }
})
const useStyle = makeStyles({
    root:{
        background:"white",
        color:"black",
        fontWeight :"bolder",
        fontSize:"25px",  
    },
    title:{
        flexGrow:1
    },
    button:{
        margin:"4px",
      
        
    },
    
})

function Navbar (){
    const classes = useStyle();
    return(
        <React.Fragment>
        <AppBar position="static" className={classes.root} >
            <ToolBar>
                <Typoraphy variant="h5" component="h1" className={classes.title} >
                    <Link to="/" style={{textDecoration:"none"}} className="font">Instagram</Link>
                </Typoraphy>
                <Link to="/signup" style={{textDecoration:"none"}}><Button variant="outlined"  className={classes.button}color="inherit">Sign up</Button></Link>
                <Link to="/login" style={{textDecoration:"none"}}><Button variant="outlined" className={classes.button} color="inherit">Login</Button></Link>
                <Link to="/profile" style={{textDecoration:"none"}}><Button variant="outlined" className={classes.button} color="inherit">Profile</Button></Link>
                <Link to="/createpost" style={{textDecoration:"none"}}><Button variant="outlined" className={classes.button} color="inherit">Create Post</Button></Link>
            </ToolBar>

        </AppBar>
        </React.Fragment>
    )
}
export default Navbar;