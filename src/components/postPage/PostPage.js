import React, { useState, useEffect } from "react";
import EditForm from "./editForm/EditForm";
import DeleteModal from './deleteModal/DeleteModal'
import { useHistory } from "react-router";
import './PostPage.css'


const PostPage = (props) => {
    const [post, setPost] = useState({})
    const [author, setAuthor] = useState({})
    const [comments, setCommments] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
    const history = useHistory();


    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${props.match.params.id}`, {
            method: 'GET'
        }).then(response => response.json()
            .then(data => {
                setPost(data);
                fetch(`https://jsonplaceholder.typicode.com/users/`,
                    {
                        method: 'GET'
                    }).then(response => response.json()
                        .then(users => {
                            let user = users.find(obj => obj.id === data.userId)
                            setAuthor(user)
                        }))
                fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}/comments`, {
                    method: 'GET'
                }).then(resp => {
                    resp.json().then(data => setCommments(data))
                })
            })
        ).catch(error => console.log(error))



    }, [])

   



    const handleEdit = () => {
        setShowEditForm(true);
    }

    const handleDelete = () => {
        setVisibleDeleteModal(true);
    }


    const close = () => {
        setVisibleDeleteModal(false);
    }

    const goToMainPage = () => {
        history.replace('/')
    }

    return (

        <>
            {showEditForm ?
                <EditForm post={post} showEditForm={setShowEditForm} />

                :
                <div className='postPage container'>
                    <DeleteModal visible={visibleDeleteModal} close={close}  data={post}/>

                    <button className='btn btn-info mb-4 main' onClick={goToMainPage}>Main page</button>
                    <div className="buttons">
                        <button className="btn btn-outline-primary" onClick={handleEdit}>Edit</button>
                        <button className='btn btn-danger' onClick={handleDelete}>Delete</button>
                    </div>
                    <div className='mb-4 mt-4'>
                        <h2>{post.title}</h2>
                        <span>{post.body}</span>
                    </div>

                    <div className='userComments'>
                        <div className='user'>
                            <h3>
                                Author
                            </h3>
                            <ul>
                                <li>Name:<br /> <u>{author.name}</u></li>
                                <li>Username:<br /> <u>{author.username}</u></li>
                                <li>Phone num.:<br /> <u>{author.phone}</u></li>
                                <li>Email:<br /> <u>{author.email}</u></li>
                            </ul>
                        </div>
                        <div className='comments'>
                            <h4>Comments: </h4>
                            <ul>
                                {
                                    comments.map(obj => {
                                        return (
                                            <li key={obj.id} className='d-block'>
                                                <h5>{obj.email}</h5>
                                                <p>{obj.name}</p>
                                                <p>{obj.body}</p>
                                            </li>)
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </div>

            }
        </>

    );
}

export default PostPage;