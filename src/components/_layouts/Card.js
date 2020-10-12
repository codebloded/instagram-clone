import React,{useState, useEffect} from 'react';
import "../../../src/App.css";
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';


export default function Card() {
    const [data, setData] = useState([]);
    useEffect(()=>{
        fetch('/allpost',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("JWT")
            }
        }).then(res=>res.json())
        .then(postData=>{
            console.log(postData.posts)
            setData(postData.posts);
        })
    },[])
    return (
        <div className="home" >
        {
            data.map((item=>{
                return(
                    <div className="card home-card" key={item._id}>
                <h5>{item.postedBy.name}</h5>
                <div className="card-image">
                    <img src={item.photo} />
                </div>
                <div className="card-content">
                    <div style={{display:"flex", justifyContent:"space-between"}} >
                    <FavoriteIcon color="secondary"/>
                    <BookmarkBorderIcon/>
                    </div>
                    <h6>{item.title}</h6>
                    <p>{item.body}</p>
                    <input type="text" placeholder="Add comments" />
                </div>
            </div>
                )
            }))
        }
            
            
        </div>
    )
}