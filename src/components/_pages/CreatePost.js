import { Button } from '@material-ui/core';
import React from 'react';

export default function CreatePost(){
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
            <input type="text" placeholder="Title" />   
            <input type="text" placeholder="Desaription" />   
            <div className="file-field input-field">
            <div className="btn waves-effect waves-light #64b5f6 blue darken-1">
                <span>Upload Image</span>
                <input type="file"/>
            </div>
            <div className="file-path-wrapper">
                <input className="file-path validate" type="text"/> 
            </div>
            </div>
            <Button variant="contained" className="btn waves-effect #64b5f6 blue darken-1">Create Post</Button>

        </div>
        </>
    )
}