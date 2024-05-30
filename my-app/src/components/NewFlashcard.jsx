import React, { useEffect, useState } from 'react';
import styles from '../styles/newcrad.module.css';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import Cards from './Cards';
import { useDispatch, useSelector } from 'react-redux'
import { handleCardData, handleGroupData } from '../redux/action';
import { Wrap, WrapItem, useToast, Button } from '@chakra-ui/react';

function NewFlashcard() {
    const [groupName, setGroupName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [url, setUrl] = useState("")
    const groupData = useSelector((store) => store.groupData)
    const allCardData = useSelector((store) => store.allCardData)
    const cardData = useSelector((store) => store.cardData)
    const DATA = useSelector((store) => store.data)
    const store = useSelector((store) => store)
    const dispatch = useDispatch()
    const toast = useToast()

    const [card, setCard] = useState([])
    let ec=false
    let obj = {
        groupName,
        description,
        image
    }

useEffect(()=>{
    dispatch(handleGroupData(obj))
},[])

    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
        obj = {
            groupName: e.target.value, description, image
        }
        dispatch(handleGroupData(obj))
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
        obj = {
            groupName, description: e.target.value, image
        }
        dispatch(handleGroupData(obj))
    };

    const handleCreate = async() => {
        console.log("c", cardData);
        let vals={
            groupName:groupData.groupName, description:groupData.description,image:groupData.image,cards:cardData
        }
        try {
            cardData.length!==0 && cardData.forEach((el, index) => {
                if (el.term == "" || el.def == "" || el.image == null) {
                    ec=true
                }
            })
            if (ec) {
                toast({
                    title: `Please fill all cards data`,
                    position: "top",
                    status: 'info',
                    isClosable: true,
                })
                return
            }
                const cards=  await axios.post('http://localhost:8080/addCard',vals)
                console.log('Data successfully submitted:');
                dispatch(handleCardData([]))
                toast({
                    title: `Data added successfully 😀😀😀`,
                    position: "top",
                    status: 'success',
                    isClosable: true,
                })
                setGroupName("")
                setDescription("")
                setImage(null)

            } catch (error) {
                console.error('There was an error submitting the data!', error);
                toast({
                    title: `Failed to add data 😞😞😞`,
                    position: "top",
                    status: 'erro',
                    isClosable: true,
                })
            }
            console.log("create",(cardData))
            

    }

    const handleDelete=()=>{
        setGroupName("")
        setDescription("")
        setImage(null)
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
                obj = {
                    groupName, description, image: reader.result
                }
                dispatch(handleGroupData(obj))
            };
            reader.onerror = (error) => {
            };
        }
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
        } catch (error) {
            console.error('Error saving flashcard:', error);
        }
    };
    const handleEdit = () => {
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
                            <div className={styles.alt} >
                                <div>
                                    <img src={image} alt="" />
                                </div>
                                <div>
                                    <BiEdit className={styles.edit} onClick={handleEdit} />
                                    <RiDeleteBin5Line className={styles.delete} onClick={handleDelete} />
                                </div>
                            </div>
                    }
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
