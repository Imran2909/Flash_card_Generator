import React, { useState } from 'react';
import styles from '../styles/card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleCardData, handleDeleteCardData, handleEditCardData } from '../redux/action';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import { useEffect } from 'react';
import {
    Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel,
    Input,
    useDisclosure,
} from '@chakra-ui/react';


function SingleCrad(props) {
    const [term, setTerm] = useState("");
    const [def, setDef] = useState("");
    const [image, setImage] = useState(null);
    const [editterm, seteditTerm] = useState("");
    const [editdef, seteditDef] = useState("");
    const [editimage, seteditImage] = useState(null);
    const [deleted, setDeleted] = useState(1)
    const dispatch = useDispatch();
    const cardData = useSelector((store) => store.cardData)
    const allCardData = useSelector((store) => store.allCardData)


    const deleteCard = () => {
        let arr = cardData.filter(item => item.Id !== props.Id);
        let narr = arr.map((el,ind)=>{
            return {...el,Id: +ind + +1}
        })
        dispatch(handleCardData(narr))
        console.log("dd", narr);
    };

    const handleTerms = (e) => {
        setTerm(e.target.value);
        let ith = (+(props.Id) - 1 )
        console.log(ith);
        cardData[ith].term = e.target.value
        console.log(cardData);
        dispatch(handleCardData(cardData))
    };

    const handleDef = (e) => {
        setDef(e.target.value);
        let ith = (+(props.Id) - 1)
        cardData[ith].def = e.target.value
        console.log(ith);
        console.log(cardData);
        dispatch(handleCardData(cardData))
    };

    const editImage = (e) => {
        setImage(null);
        console.log(props.Id);
        let ith = (+(props.Id) - 1)
        cardData[ith].image = null
        console.log(ith);
        console.log(cardData);
        dispatch(handleCardData(cardData))
    };

    const handleImageChange = (e) => {
        console.log("idd", props.Id);
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                let ith = (+(props.Id) - 1)
                cardData[ith].image = reader.result
                console.log(cardData);
                dispatch(handleCardData(cardData))
                setImage(reader.result);
            };
        }
    };

    const getData = () => {
        let arr = [...cardData]
        dispatch(handleCardData(arr))
    }

    useEffect(() => {
        // getData()
    }, [image, term, def])

    return (
        <div>
            <div className={styles.wrap}>
                <div className={styles.counts}>
                    {props.Id}
                </div>
                <div>
                    <form action="" className={styles.fields}>
                        <div className={styles.fs}>
                            <label htmlFor="">Enter Term*</label> <br />
                            <input type="text" value={props.term} onChange={handleTerms} required={true}
                            />
                        </div>
                        <div className={styles.sc}>
                            <label htmlFor="">Enter Definition*</label> <br />
                            <input type="text" value={props.def} onChange={handleDef} required={true}
                            />
                        </div>
                        {
                            image === null || "" ?
                                <div className={styles.td}>
                                    <label htmlFor="imageInput" style={{ cursor: 'pointer' }}>Select Image</label>
                                    <input
                                        id="imageInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                        required={true}
                                    />
                                </div>
                                :
                                <div className={styles.alt}>
                                    <div>
                                        <img src={props.image} alt="" />
                                    </div>
                                    <div>
                                        <BiEdit className={styles.edit} onClick={editImage} />
                                        <RiDeleteBin5Line className={styles.delete} onClick={deleteCard} />
                                    </div>
                                </div>
                        }
                    </form>
                </div>
            </div>

        </div>
    );
}

export default SingleCrad;

