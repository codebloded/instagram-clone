import React,{useState, useEffect, useContext} from 'react';
import "../../../src/App.css";
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IconButton } from '@material-ui/core';
import {UserContext} from "../../App";
import DeleteIcon from '@material-ui/icons/Delete';
import Avatar from "@material-ui/core/Avatar"
import { Link } from 'react-router-dom';

export default function Card() {
    const {state,dispatch} = useContext(UserContext);
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            }
        }).then(res=>res.json())
        .then(postData=>{
            console.log(postData)
            setData(postData.posts);
        })
    },[]);

    const likePost = (id)=>{
        fetch('/like',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('JWT')
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
            .then(result=>{
            
                const newData = data.map(item=>{
                    if(item._id ==result._id){
                        return result;
                    }else{
                        return item;
                    }
                })
                setData(newData);
            }).catch(err=>{
                console.log(err);
            })
    }
    const unlikePost = (id)=>{
        fetch('/unlike',{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('JWT')
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
            .then(result=>{
              
                const newData = data.map(item=>{
                    if(result._id == item._id){
                        return result;
                    }else{
                        return item;
                    }
                })
                setData(newData);
            }).catch(err=>{
                console.log(err);
            })
    }
    const comment = (text,postId)=>{
        fetch("/comment",{
            method:'put',
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            },
            body:JSON.stringify({
                postId,
                text
            })
        }).then(res=>res.json())
        .then(result=>{
            const newData = data.map(item=>{
                if(result._id==item._id){
                    return result;
                }
                else{
                    return item
                }
            })
            setData(newData);
        }).catch(err=>{
            console.log(err);
        })
    }

    const deletPost = (postid)=>{
        fetch(`/deletepost/${postid}`,{
            method:"delete",
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result);
            const newData = data.filter(item=>{
                return item._id !== result._id
            })
            setData(newData);
        })
    }

    return (
        <div className="home" >
        {
            data.map((item=>{
                return(
                    <div className="card home-card" key={item._id}>

                    <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div style={{display:'flex'}} >

                    <Avatar  alt="Remy Sharp" src={state.pic}  />
                <h5 style={{margin:'6px'}}><Link style={{ color:'black'}} to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>{item.postedBy.name}</Link>
                </h5>
                    </div>
                {item.postedBy._id ==state._id
                && 
                <IconButton color="inherit" style={{float:"right"}} onClick={()=>deletPost(item._id)}><DeleteIcon /></IconButton>
                }
                    </div>
                <div className="card-image">
                    <img src={item.photo} />
                </div>
                <div className="card-content">
                    <div style={{display:"flex"}} >
                    
                    {item.likes.includes(state._id)?
                    <IconButton color="secondary" onClick={()=>{unlikePost(item._id)}}><FavoriteIcon/></IconButton> 
                        :
                    <IconButton  onClick={()=>likePost(item._id)}><FavoriteBorderIcon/></IconButton> 
                    }
                    <IconButton ><BookmarkBorderIcon/></IconButton> 
              
                    
                    </div>
                    <h6>{item.likes.length} likes</h6>
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>
                    {
                        item.comments.map(comment=>{
                            return(
                                <h6 key={comment._id}> <span style={{fontWeight:"bold", marginRight:"4px"}}> {comment.postedBy.name}</span>{comment.text}</h6>
                            )
                        })
                    }
                    <form onSubmit={
                        (e)=>{
                            e.preventDefault();
                            comment(e.target[0].value, item._id);
                        }
                    }>
                    <input type="text" placeholder="Add comments" />
                    </form>
                </div>
            </div>
                )
            }))
        }
            
            
        </div>
    )
}