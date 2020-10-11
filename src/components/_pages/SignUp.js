import React,{useState} from 'react';
//@material ui components
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Container from "@material-ui/core/Container";
import { Link, makeStyles, Typography } from '@material-ui/core';
import { InputSharp } from '@material-ui/icons';

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
        marginTop:"90px",
        width:"30vw",
        height:"67vh"


    }
})
export default function SignUp(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const postCredentials = ()=>{
        fetch("/signup",{
                method:"post",
                headers:{
                "Content-Type":"application/json"
             },
                body:JSON.stringify({
                    name:"",
                    email:"",
                    password:""
                })
            }).then(res => res.json())
            .then(data=>{
                console.log(data); 
        }).catch(err=>{
            console.log(err);
        })
          
    }

    const classes = useStyle();
    return(
        <Container className={classes.box} >
        <h1 className="font">Instagram</h1>
        <form>
        <Container maxWidth="xs" className={classes.root}>
            {/* <TextField 
                id="outlined-basic"
                label="Mobile No." 
                variant="outlined"
                style={{width:"22vw",
                margin:"6px"}}
                value={name}
                onChange={(event)=>setName(event.target.value)}
            
               /> */}

            <TextField
                id="outlined-basic"
                label="Full Name" 
                variant="outlined" 
                value={name}
                onChange={(event)=>setName(event.target.value)}
                style={{width:"22vw", 
                margin:"6px"}}/>

            <TextField 
                id="outlined-basic"
                label="Email" 
                variant="outlined"
                value={email}
                onChange={(event)=>setEmail(event.target.value)}
                style={{width:"22vw",
                margin:"6px"}}/>

            <TextField id="outlined-basic" 
                label="Password" 
                type="password"
                value={password}
                onChange={(event)=>setPassword(event.target.value)}
                variant="outlined"
                style={{width:"22vw",margin:"6px"}} />

            <Button variant="contained"
                color="primary" 
                style={{width:"22vw",margin:"6px"}}
                onClick={()=>postCredentials()}
                >Sign Up</Button>
                

        </Container>
        </form>
        <Container>
            <Typography>
                Already Have an account <Link>Login</Link>
            </Typography>
        </Container>
        </Container>
    )  
}
