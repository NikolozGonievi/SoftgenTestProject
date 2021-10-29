import React from "react";
import Modal from 'react-modal';
import { useHistory } from "react-router";
import './DeleteModal.css'

Modal.setAppElement(document.getElementById('root'))

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
};

const DeleteModal = (props) => {

    const { visible, close, data } = props;
    const history = useHistory();

    const handleYes = () => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
            method: 'DELETE'
        })
        
        .catch(error => console.log(error))
        console.log('Deleted post:', data);
        close();
        history.push('/')

    }

    const handleNo = () => {
        close();
    }

    return (
        <Modal
            isOpen={visible}
            onRequestClose={() => { close() }}
            style={customStyles}
            overlayClassName='Overlay'
        >
            <div className='modalDiv'>
                <h2>Do you want to delete this post ?</h2>
                <div className='modalButtons'>
                    <button className='btn btn-danger' onClick={handleYes}>Yes</button>
                    <button className='btn btn-success' onClick={handleNo}>No</button>
                </div>
            </div>

        </Modal>
    )
}

export default DeleteModal;