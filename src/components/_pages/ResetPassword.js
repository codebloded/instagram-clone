import React,{useState,useContext, useReducer} from 'react';
//@material ui components
import Button from '@material-ui/core/Button'

import Container from "@material-ui/core/Container";
import {makeStyles } from '@material-ui/core';

import { useHistory } from 'react-router-dom';
import M from "materialize-css";
const useStyle = makeStyles({
    root:{
            textAlign:"center",
            display:"flex",
            flexDirection:"column",
            alignItems:"center",
            justifyContent:"center",
    },
    box:{
        border:"2px solid red",
        textAlign:"center",
        border:"none",
        boxShadow: "1px 1px 4px black",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",
        margin:"auto",
        marginTop:"100px",
        width:"30vw",
        height:"60vh"


    }
})
export default function ResetPassword(){

    const [email, setEmail] = useState("");
    const classes = useStyle();
    const history = useHistory();
    const postReset = ()=>{
        fetch("/reset-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
               M.toast({html: data.error , classes:"#c62828 red darken-3"});
            }
            else{       
                M.toast({html: data.message ,classes:"#2e7d32 green darken-3"})
                history.push('/login');
            }
        }).catch(err=>{
            console.log(err);
        })
    }
    return(
        <Container className={classes.box} >
        <h1 className="font">Instagram</h1>
        <form>
        <Container maxWidth="xs" className={classes.root}>
            <input
             placeholder="Username"
             value={email} 
             onChange={(event)=>setEmail(event.target.value)}
              style={{width:"22vw",
               margin:"8px"}}/>

            <Button variant="contained"
             onClick={()=>postReset()}
             color="primary" 
             style={{width:"22vw",margin:"8px"}}
             
             >Reset Password</Button>
        </Container>
        </form>
        </Container>
    )  
}
