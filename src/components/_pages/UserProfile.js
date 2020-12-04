import React,{useState, useEffect,useContext} from 'react';
import makeStyle from "@material-ui/core/styles/makeStyles";
import { Height } from '@material-ui/icons';
import { Grid, Typography } from '@material-ui/core';
import Container from "@material-ui/core/Container";
import {UserContext} from "../../App";
import {useParams} from 'react-router-dom'



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
        justifyContent:"space-around",
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
    const {state, dispatch} = useContext(UserContext);
   const [userProfile , setProfile] = useState(null)
    const {userid} = useParams();
    console.log(userid);

    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            }
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            setProfile(data)
        })
    },[])

    const classes = useStyle();
    return(
        <>
        {userProfile ? 
        
            <Container maxWidth="md">
        <Grid item xs={12}>
        <Grid item xs={12} md={12}>

        <Container maxWidth="md" className={classes.root} >
            <Container>
                <img className={classes.img} src="https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f47d4de7637290765bce495%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1398%26cropX2%3D3908%26cropY1%3D594%26cropY2%3D3102" />
            </Container>
            <Container>
               <h3>{userProfile.user.name}</h3>
               <h5>{userProfile.user.email}</h5>
      
               <Container className={classes.smallInfo}>

                   <h4>{userProfile.posts.length}Posts</h4>
                   <h4>97 followers</h4>
                   <h4>97 following</h4>
               </Container>
           
            </Container>
        </Container>
        </Grid>
        </Grid>
        <div className={classes.gallery}>
        {
            userProfile.posts.map((item=>{
                return (
                    <img  key={item._id} style={{width:"30%"}} src={item.photo} alt={item.title}/>
                )
            }))
        }

        </div>
        </Container>
        
        : <h2>Loading...</h2>}
       
    </>
    )
}