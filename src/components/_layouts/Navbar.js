import React, {useContext } from 'react';
import AppBar from "@material-ui/core/AppBar";
import ToolBar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button'
import {red} from '@material-ui/core/colors'
import {makeStyles, createMuiTheme} from "@material-ui/core/styles"
import Typoraphy from "@material-ui/core/Typography"
import { Link ,useHistory} from 'react-router-dom';
import M from "materialize-css";

import {UserContext} from "../../App";

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
    const history = useHistory();
    const {state,dispatch} = useContext(UserContext);
    const renderLink = ()=>{
        if(state){
            return[
                <Link to="/profile" style={{textDecoration:"none"}}><Button variant="outlined" className={classes.button} color="inherit">Profile</Button></Link>,

                <Link to="/createpost" style={{textDecoration:"none"}}><Button variant="outlined" className={classes.button} color="inherit">Create Post</Button></Link>,
                <Link to="/explorepost" style={{textDecoration:"none"}}><Button variant="outlined" className={classes.button} color="inherit">Explore Posts</Button></Link>,

            
                <Button variant="contained"
                    color="primary" 
                    style={{margin:"6px"}}
                    onClick={
                        ()=>{
                            localStorage.clear();
                            dispatch({type:"CLEAR"})
                            M.toast({html: "Logged Out !" , classes:"#c62828 red darken-3"});
                            history.push('/login')
                            }

                    }
                >Logout</Button>
           

                 
            ]
        }
        else{
            return [
                <Link to="/signup" style={{textDecoration:"none"}}><Button variant="outlined"  className={classes.button}color="inherit">Sign up</Button></Link>,

                <Link to="/login" style={{textDecoration:"none"}}><Button variant="outlined" className={classes.button} color="inherit">Login</Button></Link>
            ]
        }
    }
    const classes = useStyle();
    return(
        <React.Fragment>
        <AppBar position="static" className={classes.root} >
            <ToolBar>
                <Typoraphy variant="h5" component="h1" className={classes.title} >
                    <Link to={state?"/":"/login"} style={{textDecoration:"none"}} className="font">Instagram</Link>
                </Typoraphy>
                    {renderLink()}
            </ToolBar>

        </AppBar>
        </React.Fragment>
    )
}
export default Navbar;