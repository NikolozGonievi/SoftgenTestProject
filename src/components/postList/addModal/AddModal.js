import React, { useState, useRef } from "react";
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import './AddModal.css'

Modal.setAppElement(document.getElementById('root'))

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'sienna',
        borderRadius: '35px',
        width: '1200px'
    }
};

const AddModal = (props) => {

    const { visible, close } = props;

    const [isUploaded, setIsUploaded] = useState(false)
    const uploadedImage = useRef(null);
    const imageUploader = useRef(null);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const resetModal = () => {
        reset();
        uploadedImage.current = null;
        imageUploader.current = null;
        setIsUploaded(false)
    }

    const onSubmit = (data) => {
        //for concole.log
        const fullData = { ...data, 'picture': uploadedImage.current.file }
        //
        
         
        console.log('Full  data: ', fullData)

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            data: fullData
        }).then(response => {
            console.log(response)
        }
        )

        close();
        resetModal();
    }

    const handleImageUpload = (e) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = e => {
                current.src = e.target.result;
                setIsUploaded(true)
            }
            reader.readAsDataURL(file);
        }
    }

    const deleteImage = () => {
        uploadedImage.current = null;
        imageUploader.current = null;
        setIsUploaded(false)
    }

    return (
        <Modal
            isOpen={visible}
            onRequestClose={() => { close(); resetModal(); }}
            style={customStyles}
            overlayClassName='Overlay'
        >
            <div className='container modalContainer'>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-group'>
                        <label>Title: </label>
                        <input
                            {...register('title', {
                                required: true,
                            }
                            )}
                            type='text'
                            className='form-control'
                            placeholder='Insert title of the post'
                        />
                        {errors.title && <p style={{ color: 'red' }}>Please insert title</p>}
                    </div>
                    <div className='form-group'>
                        <label>Post text:</label>
                        <textarea
                            {...register('body', {
                                required: true
                            })}
                            className='form-control'
                            placeholder='Insert post text' />
                        {errors.body && <p style={{ color: 'red' }}>Please enter body</p>}
                    </div>
                    <div className='form-group'>
                        <label>Picture:</label>
                        <div className='imageDiv'>
                            <input
                                className='imageInput'
                                required
                                accept='image/*'
                                type='file'
                                ref={imageUploader}
                                onChange={(e) => handleImageUpload(e)}
                            />
                            <img
                                alt='uploadedImage'
                                ref={uploadedImage}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'contain',
                                    display: isUploaded ? 'initial' : 'none'
                                }}
                            />
                            {isUploaded && <button onClick={deleteImage} className='btn btn-danger'>X</button>}
                        </div>
                    </div>
                    <div className='modalButtons'>
                        <button type='submit' className='btn btn-primary'>Submit</button>
                        <button className='btn-secondary' onClick={() => { close(); resetModal() }}>Close</button>
                    </div>
                </form>
            </div>
        </Modal>
    );
}

export default AddModal;