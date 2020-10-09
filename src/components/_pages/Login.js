import React from 'react';
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
    const classes = useStyle();
    return(
        <Container className={classes.box} >
        <h1 className="font">Instagram</h1>
        <form>
        <Container maxWidth="xs" className={classes.root}>
            <TextField id="outlined-basic" label="Username" variant="outlined" style={{width:"22vw", margin:"8px"}}/>
            <TextField id="outlined-basic" label="Password" variant="outlined" style={{width:"22vw",margin:"8px"}} />
            <Button variant="contained" color="primary" style={{width:"22vw",margin:"8px"}}>Login</Button>
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
