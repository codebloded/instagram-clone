import React from 'react';
import "../../../src/App.css";
import FavoriteIcon from '@material-ui/icons/Favorite';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

export default function Card() {
    return (
        <div className="home">
            <div className="card home-card">
                <h5>Rohan</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                </div>
                <div className="card-content">
                    <div style={{display:"flex", justifyContent:"space-between"}} >
                    <FavoriteIcon color="secondary"/>
                    <BookmarkBorderIcon/>
                    </div>
                    <h6>title</h6>
                    <p>This is the amazing paragraph of that image </p>
                    <input type="text" placeholder="Add comments" />
                </div>
            </div>
            <div className="card home-card">
                <h5>Rohan</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                </div>
                <div className="card-content">
                    <h6>title</h6>
                    <p>This is the amazing paragraph of that image </p>
                    <input type="text" placeholder="Add comments" />
                </div>
            </div>
            <div className="card home-card">
                <h5>Rohan</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                </div>
                <div className="card-content">
                    <h6>title</h6>
                    <p>This is the amazing paragraph of that image </p>
                    <input type="text" placeholder="Add comments" />
                </div>
            </div>
            <div className="card home-card">
                <h5>Rohan</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                </div>
                <div className="card-content">
                    <h6>title</h6>
                    <p>This is the amazing paragraph of that image </p>
                    <input type="text" placeholder="Add comments" />
                </div>
            </div>
            <div className="card home-card">
                <h5>Rohan</h5>
                <div className="card-image">
                    <img src="https://images.unsplash.com/photo-1477346611705-65d1883cee1e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" />
                </div>
                <div className="card-content">
                    <h6>title</h6>
                    <p>This is the amazing paragraph of that image </p>
                    <input type="text" placeholder="Add comments" />
                </div>
            </div>
        </div>
    )
}