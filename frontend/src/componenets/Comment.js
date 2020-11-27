import React from 'react';
import '../styles/Comment.css';

export default function Comment(props) {
    
    return(
        <div className={"comment-border"}>
            {props.message}
        </div>
    )
}