import React, { useState } from "react";
import './EditForm.css'
const EditForm = (props) => {

    const post = props.post;

    const [postData, setPostData] = useState({
        'userId': post.userId,
        'id': post.id,
        'title': post.title,
        'body': post.body
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setPostData({ ...postData, [name]: value })
    }

    const handleClose = () => {
        props.showEditForm(false);
    }

    const handleSubmit = () => {
        console.log('Submitted data : ', postData)

        fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
            method: 'PUT',
            body: postData
        }).then(response => {
            response.json().then(data => console.log('response data :', data))
        })
        props.showEditForm(false);

    }

    return (
        <>
            <div className='container'>
                <h3>Edit form</h3>
                <form>
                    <div className='form-group'>
                        <label><h4>Title: </h4> </label>
                        <input
                            type='text'
                            value={postData.title}
                            onChange={handleChange}
                            name='title'

                        />
                    </div>
                    <div className='form-group'>
                        <label><h4>Body: </h4> </label>
                        <textarea
                            value={postData.body}
                            onChange={handleChange}
                            name='body' />
                    </div>
                    <button type='button' className='btn btn-primary' onClick={handleSubmit}>Submit</button>
                    <button type='button' className='btn btn-secondary' onClick={handleClose}>Cancel</button>
                </form>
            </div>
        </>);
}

export default EditForm;