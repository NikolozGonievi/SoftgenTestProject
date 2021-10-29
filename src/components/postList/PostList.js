import React, { useEffect, useState } from "react";
import PostListItem from '../postListItem/PostListItem';
import AddModal from "./addModal/AddModal";
import { useHistory } from "react-router";

import './PostList.css'

const PostList = (props) => {
    const [postList, setPostList] = useState([]);

    const [usersList, setUsersList] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false)
    const history = useHistory();

    useEffect(() => {
        fetch(
            'https://jsonplaceholder.typicode.com/posts', {
            method: 'GET'
        }
        ).then(response => {
            response.json()
                .then(data => setPostList(data))
        }).catch(error =>
            console.log(error))

        fetch(
            'https://jsonplaceholder.typicode.com/users',
            {
                method: 'GET'
            }
        ).then(response => {
            response.json().then(data => setUsersList(data))
        }).catch(error => console.log(error))

        history.replace('/')
    }, [])

    const handleClick = () => {
        setShowAddModal(true)
    }

    const close = () => {
        setShowAddModal(false);
    }

    const handlePostPage = (choosenPostId) => {
        history.push({
            pathname: `/posts/${choosenPostId}`,
            state: {
                choosenPostId: choosenPostId,
                user: usersList.find(obj => obj.id === postList.find(obj => obj.id === choosenPostId).userId)
            }
        })
    }

    return (
        <>

            <div>
                <button className='btn btn-primary postListButton' onClick={handleClick}>Add Post</button>
                <AddModal visible={showAddModal} close={close} />
                <ul>
                    {postList.map((obj, key) => {
                        return (
                            <li key={key}>
                                <PostListItem item={obj} handlePostPage={() => handlePostPage(obj.id)} />

                            </li>
                        )
                    })}
                </ul>
            </div>

        </>
    );
}

export default PostList;