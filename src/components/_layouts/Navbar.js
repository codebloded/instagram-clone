import React, {useContext, useRef, useEffect, useState } from 'react';
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
    const searchModal = useRef(null)
    const [search, setSearch] = useState('')
    const [userDetails , setDetails] = useState([])
    const history = useHistory();
    const {state,dispatch} = useContext(UserContext);

    useEffect(()=>{
        M.Modal.init(searchModal.current)
    },[])
    const renderLink = ()=>{
        if(state){
            return[
                <li style={{listStyleType:'none',margin:'10px', cursor:'pointer'}}><i  
                 data-target="modal1"  className="material-icons modal-trigger" style={{color:'black'}}>search</i></li>,

                <li style={{listStyleType:'none', margin:'10px', fontWeight:'normal'}}><Link to="/profile" style={{color:'black'}}  >Profile</Link></li>,
                
                <li style={{listStyleType:'none', margin:'10px',fontWeight:'normal'}}><Link to="/createpost" 
                style ={{color:'black'}} >CreatePost</Link></li>,

                <li style={{listStyleType:'none',  margin:'10px',fontWeight:'normal' }}><Link to="/explorepost"
                 style={{color:'black', listStyle:'none'}}>Explore Posts</Link></li>,
            
                <li style={{listStyleType:'none',margin:'10px'}}><Button variant="contained"
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
                >Logout</Button></li>
           
       
                 
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

    const fetchUsers = (query)=>{
        setSearch(query);
        fetch('/search-users', {
            method:'post',
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                query
            })
        }).then(res=>res.json())
        .then(data=>{
            setDetails(data.user);
        })
    }
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
        <div id="modal1" className="modal" ref={searchModal}>
    <div className="modal-content">
            <input
             placeholder="Search User" 
             value={search} 
             onChange={(event)=>fetchUsers(event.target.value)}
              />
        <ul className="collection">
            {userDetails.map(item=>{
                return  <Link to={item._id != state._id ? "/profile/"+item._id :"/profile"} onClick={()=>{
                    M.Modal.getInstance(searchModal.current).close()
                }}><li className="collection-item">{item.email}</li></Link>
            })}
        </ul>
    </div>
    <div className="modal-footer">
      <Button className="modal-close waves-effect waves-green btn-flat">Done</Button>
    </div>
  </div>
        </React.Fragment>
    )
}
export default Navbar;