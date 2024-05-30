import React, { useState } from 'react';
import styles from '../styles/card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleCardData, handleDeleteCardData, handleEditCardData } from '../redux/action';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';
import { useEffect } from 'react';

function SingleCrad(props) {
    const [term, setTerm] = useState("");
    const [def, setDef] = useState("");
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const cardData = useSelector((store) => store.cardData)


    const deleteCard = () => {
        let arr = cardData.filter(item => item.Id !== props.Id);
        let narr = arr.map((el,ind)=>{
            return {...el}
        })
        dispatch(handleCardData(narr))
        console.log("dd", narr);
    };

    const handleTerms = (e) => {
        setTerm(e.target.value);
        cardData[props.index].term = e.target.value
        console.log(cardData);
        dispatch(handleCardData(cardData))
    };

    const handleDef = (e) => {
        setDef(e.target.value);
        cardData[props.index].def = e.target.value
        console.log(cardData);
        dispatch(handleCardData(cardData))
    };

    const editImage = (e) => {
        setImage(null);
        console.log(props.Id);
        cardData[props.index].image = null
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
                cardData[props.index].image = reader.result
                console.log(cardData);
                dispatch(handleCardData(cardData))
                setImage(reader.result);
            };
        }
    };


    useEffect(() => {
    }, [image, term, def])

    return (
        <div>
            <div className={styles.wrap}>
                <div className={styles.counts}>
                    {props.index + 1 }
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

