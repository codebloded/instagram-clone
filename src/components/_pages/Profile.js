import React,{useState, useEffect,useContext} from 'react';
import makeStyle from "@material-ui/core/styles/makeStyles";
import { Height } from '@material-ui/icons';
import { Grid, Typography } from '@material-ui/core';
import Container from "@material-ui/core/Container";
import {UserContext} from "../../App";



const useStyle = makeStyle({
    root:{
            marginTop:"16px",
            display:"flex",
            flexDirection:"row",
            borderBottom:"1px solid grey"

    },
    img:{
        borderRadius:"80%",
        height:"150px",
        width:"150px",

    },
    smallInfo:{
        display:"flex",
        justifyContent:"space-between",
        width:"108%"
    },
    gallery:{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"space-around",
        margin:"6px"
        }
  
})
export default function Profile(){
    const [myPic, setPic] = useState([]);
    const {state, dispatch} = useContext(UserContext);
    console.log(state);
    useEffect(()=>{
        fetch('/mypost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            }
        }).then(res=>res.json())
        .then(data=>{
            setPic(data.myPosts);
        })

    },[])
    const classes = useStyle();
    return(
        <Container maxWidth="md">
        <Grid item xs={12}>
        <Grid item xs={12} md={12}>

        <Container maxWidth="md" className={classes.root} >
            <Container>
                <img className={classes.img} src={state?state.pic:'Loading'} />
            </Container>
            <Container>
            <h4>{state?state.name:"loading"}</h4>
            <h5>{state?state.email:"loading"}</h5>
      
               <Container className={classes.smallInfo}>

                   <h5>{myPic.length} Posts</h5>
                   <h5>{state?state.followers.length:"0"} followers</h5>
                   <h5> {state?state.following.length:"0"} following</h5>
               </Container>
           
            </Container>
        </Container>
        </Grid>
        </Grid>
        <div className={classes.gallery}>
        {
            myPic.map((item=>{
                return (
                    <img  key={item._id} style={{width:"30%"}} src={item.photo} alt={item.title}/>
                )
            }))
        }

        </div>
        </Container>
    )
}