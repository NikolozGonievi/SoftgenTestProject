import React  from "react";
import './PostListItem.css'

const PostListItem = (props) => {    
    
    const {item:{title, body}, handlePostPage} = props;

    return (
        <>        
                <div className='myContainer container'>
                    <h2 onClick={handlePostPage}>
                        {title}
                    </h2>
                    <span>
                        {body}
                    </span>
                </div>            
        </>
    );
}

export default PostListItem;