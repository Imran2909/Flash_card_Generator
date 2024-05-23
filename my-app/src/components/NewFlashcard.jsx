import React, { useState } from 'react';
import styles from '../styles/newcrad.module.css';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import Cards from './Cards';
import { useDispatch, useSelector } from 'react-redux'
import { handleGroupData } from '../redux/action';

function NewFlashcard() {
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("")
    const groupData = useSelector((store) => store.groupData)
    const store = useSelector((store) => store)
    const dispatch = useDispatch()

    const [card, setCard] = useState([])
    let obj = {
        groupName,
        description,
        image
    }



    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
        obj = {
            groupName: e.target.value, description, image
        }
        dispatch(handleGroupData(obj))
        console.log(groupData);

    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        obj = {
            groupName, description: e.target.value, image
        }
        dispatch(handleGroupData(obj))
        console.log(groupData);
    };

    const handleCreate = () => {
        console.log(store);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
                // console.log(reader.result);
                obj = {
                    groupName, description, image: reader.result
                }
            };
            reader.onerror = (error) => {
                console.log("Error: ", error);
            };
        }
        dispatch(handleGroupData(obj))
        console.log(groupData);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('groupName', groupName);
        formData.append('description', description);
        formData.append('image', image);

        try {
            const response = await axios.post('/save', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Flashcard saved:', response.data);
        } catch (error) {
            console.error('Error saving flashcard:', error);
        }
    };

    const handleEdit=()=>{
        setImage(null)
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.box1}>
                <div className={styles.top}>
                    Create Group*
                </div>
                <div className={styles.create}>
                    <input
                        className={styles.inp}
                        type="text"
                        placeholder='Enter Your Group Name'
                        value={groupName}
                        onChange={handleGroupNameChange}
                        required
                    />



                    {/* ====================================================================== */}

                    {
                        image === null ?
                            <label className={styles.but}>
                                <div>
                                    <FaCloudUploadAlt size={30} color="blue" />
                                </div>
                                <div className={styles.text}>
                                    Upload Image
                                </div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    style={{ display: 'none' }}
                                    required
                                />
                            </label>
                            :
                            <div  className={styles.alt} >
                                <div>
                                <img src={image} alt="" />
                                </div>
                                <div>
                                <BiEdit className={styles.edit} onClick={handleEdit} />
                                <RiDeleteBin5Line className={styles.delete} onClick={handleEdit}  />
                                </div>
                            </div>

                    }
                    {/* ======================================================================== */}



                </div>
                <div className={styles.disc}>
                    <p>Add description</p>
                    <textarea
                        rows="3"
                        cols="50"
                        className={styles.area}
                        placeholder='Enter your message here...'
                        value={description}
                        onChange={handleDescriptionChange}
                    />
                </div>
            </form>
            <div className={styles.cardList} >

                <Cards />

                <button type="submit" className={styles.save} onClick={handleCreate} >
                    Create
                </button>
            </div>
        </div>
    );
}

export default NewFlashcard;
