import React,{useState,useEffect} from 'react';
import { Button } from '@material-ui/core';
import M from "materialize-css";
import { useHistory } from "react-router-dom"

export default function CreatePost(){
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [image , setImage] = useState("");
    const [url , setUrl] = useState("");
    const history  = useHistory()

    useEffect(()=>{
        if(url){
             //Network request for posting the data to the Database

        fetch("/createpost",{
            method:"post",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            },
            body:JSON.stringify({
                title,
                body,
                photo:url
            })
        }).then(res=>res.json())
            .then(data=>{
                if(data.error){
                     M.toast({html: data.error , classes:"#c62828 red darken-3"});
                }
                else{
                    M.toast({html:"Created Sucessfully!",classes:"#2e7d32 green darken-3"})
                    history.push("/")
                }
        }).catch(err=>{
            console.log(err);
        })
        }

    },[url])

    const createPostData = ()=>{
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

    const Styles ={

        margin:"30px auto",
        maxWidth:"500px",
        padding:"20px",
        textAlign:"center"

    }
    return (
        <>
        <div className="App">
            <h2>Create Post</h2>
        </div>
        <div className='card input-filed' style={Styles}>
            <input type="text"
             placeholder="Title"
              value={title}
               onChange={(event)=>setTitle(event.target.value)}

               />   

            <input type="text"
             placeholder="Desaription"
             value={body}
               onChange={(event)=>setBody(event.target.value)}
              />   
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
             className="btn waves-effect #64b5f6 blue darken-1"
             onClick={()=>createPostData()}
             >Create Post</Button>

        </div>
        </>
    )
}