import React,{useState} from 'react';
//@material ui components
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Container from "@material-ui/core/Container";
import { Link, makeStyles, Typography } from '@material-ui/core';
import { InputSharp } from '@material-ui/icons';
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
export default function Login(){
    const [email, setEmail] = useState("");
    const [password , setPassowrd] = useState("");
    const classes = useStyle();
    const history = useHistory();
    const postLogin = ()=>{
        fetch("/login",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email:email,
                password:password
            })
        }).then(res=>res.json())
        .then(data=>{
            if(data.error){
               M.toast({html: data.error , classes:"#c62828 red darken-3"});
            }
            else{
                console.log(data)
                M.toast({html: "Login Sucessfully" ,classes:"#2e7d32 green darken-3"})
                history.push('/');
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

            <input
             placeholder="Password" 
             value={password} 
             onChange={(event)=>setPassowrd(event.target.value)}
              style={{width:"22vw",margin:"8px"}} />

            <Button variant="contained"
             onClick={()=>postLogin()}
             color="primary" 
             style={{width:"22vw",margin:"8px"}}
             
             >Login</Button>
        </Container>
        </form>
        <Container>
            <Typography>
                Dont have any account <Link>SignUp</Link>
            </Typography>
        </Container>
        </Container>
    )  
}
