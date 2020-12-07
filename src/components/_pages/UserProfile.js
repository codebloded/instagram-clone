import React,{useState, useEffect,useContext} from 'react';
import makeStyle from "@material-ui/core/styles/makeStyles";
import { Height } from '@material-ui/icons';
import { Grid, Typography ,Button } from '@material-ui/core';
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
    const [showFollowButton , setFollowButton] = useState(state?!state.following.includes(userid):true);
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

    const followUser = ()=>{
        fetch('/follow',{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('JWT')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            dispatch({type:"UPDATE", payload:{following:data.following, followers:data.followers}})
            localStorage.setItem('user',JSON.stringify(data));
            setProfile((prevState)=>{
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers, data._id]
                    }
                }
            })
            setFollowButton(false);
        })
    }


    const unFollowUser = ()=>{
        fetch('/unfollow',{
            method:'put',
            headers:{
                'Content-Type':'application/json',
                'Authorization':'Bearer '+localStorage.getItem('JWT')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data);
            dispatch({type:"UPDATE", payload:{following:data.following, followers:data.followers}})
            localStorage.setItem('user',JSON.stringify(data));
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item != data._id)
                return{
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setFollowButton(true);
        })
    }

    const classes = useStyle();
    return(
        <>
        {userProfile ? 
        
            <Container maxWidth="md">
        <Grid item xs={12}>
        <Grid item xs={12} md={12}>

        <Container maxWidth="md" className={classes.root} >
            <Container>
                <img className={classes.img} src={userProfile.user.pic} />
            </Container>
            <Container>
               <h3>{userProfile.user.name}</h3>
               <h5>{userProfile.user.email}</h5>
      
               <Container className={classes.smallInfo}>

                   <h5>{userProfile.posts.length} Posts</h5>
                   <h5>{userProfile.user.followers.length} Follower</h5>
                   <h5>{userProfile.user.following.length} Following</h5>

               </Container>

               {
                showFollowButton ? 
                   <Button variant="contained"
             className="btn waves-effect #64b5f6 blue darken-1"
             onClick={()=>followUser()}
             >Follow</Button>
              :
              <Button variant="contained"
             className="btn waves-effect #64b5f6 blue darken-1"
             onClick={()=>unFollowUser()}
             >Unfollow</Button>
           

               }
                   
                  
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