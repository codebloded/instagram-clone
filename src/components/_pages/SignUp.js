import React,{useState, useEffect} from 'react';
import M from "materialize-css";
//@material ui components
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField'
import Container from "@material-ui/core/Container";
import { Link, makeStyles, Typography } from '@material-ui/core';
import { InputSharp } from '@material-ui/icons';
import { useHistory } from 'react-router-dom';
import VpnKeyRoundedIcon from '@material-ui/icons/VpnKeyRounded';


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
    const history = useHistory();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [image, setImage] = useState("");
    const [url, setUrl] = useState(undefined);

    const uploadPic = ()=>{
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset","instagram-clone");
        data.append("cloud_name","icoderohan");

        //Network request for uplaoding image to cloud
        fetch(" https://api.cloudinary.com/v1_1/icoderohan/image/upload",{
            method:"post",
            body:data
        }).then(res=>res.json())
        .then(data=>{
            setUrl(data.url)
        }).catch(err=>{
            console.log(err);
        })

    }
    useEffect(()=>{
        if(url){
            uploadFeilds();
        }
    },[url])

    const uploadFeilds = ()=>{

        if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){
            M.toast({html: "Inavlid Email" , classes:"#c62828 red darken-3"});
            return
        }
        fetch("/signup",{
                method:"post",
                headers:{
                "Content-Type":"application/json"
             },
                body:JSON.stringify({
                    name: name,
                    email: email,
                    password:password,
                    pic:url
                })
            }).then(res => res.json())
            .then(data=>{
                if(data.error){
                    M.toast({html: data.error , classes:"#c62828 red darken-3"});
                }
                else{
                    M.toast({html: data.message ,classes:"#2e7d32 green darken-3"})
                    history.push("/login");
                }
        }).catch(err=>{
            console.log(err);
        })
    }
    const postCredentials = ()=>{

        if(image){
            uploadPic();
        }
        else{
            uploadFeilds();
        }
        
          
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

            <input
                id="outlined-basic"
                label="Full Name" 
                placeholder="Full Name"
                onChange={(event)=>setName(event.target.value)}
                value={name}
                style={{width:"22vw", 
                margin:"6px"}}/>

            <input 
                id="outlined-basic"
                label="Email" 
                onChange={(event)=>setEmail(event.target.value)}
                placeholder="Email"
                value={email}
                style={{width:"22vw",
                margin:"6px"}}/>

            <input id="outlined-basic" 
                label="Password" 
                type="password"
                placeholder="Password"
                onChange={(event)=>setPassword(event.target.value)}
                value={password}
                variant="outlined"
                style={{width:"22vw",margin:"6px"}} />

            <div className="file-field input-field">
            <div className="btn waves-effect waves-light #64b5f6 blue darken-1">
                <span>Upload Image</span>
                <input type="file" 
             
                    onChange={(event)=>setImage(event.target.files[0])}
                />
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/> 
            </div>
            </div>

            <Button variant="contained"
            startIcon={<VpnKeyRoundedIcon/>}
                color="primary" 
                style={{width:"22vw",margin:"6px"}}
                onClick={()=>postCredentials()}
                >Sign Up</Button>
                

        </Container>
        </form>
        <Container>
            
                <Link to='/login'>Already Have an account</Link>
          
        </Container>
        </Container>
    )  
}
