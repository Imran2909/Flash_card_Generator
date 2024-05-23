
import React, { useState } from 'react';
import styles from '../styles/card.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { handleCardData, handleDeleteCardData } from '../redux/action';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { BiEdit } from 'react-icons/bi';

function SingleCrad({ card, index }) {
    const [term, setTerm] = useState("");
    const [def, setDef] = useState("");
    const [image, setImage] = useState(null);
    const dispatch = useDispatch();
    const cardData= useSelector((store)=>store.cardData)

    let obj = {
        term,
        def,
        image
    }

    const handleTerms = (e) => {
        setTerm(e.target.value);
        dispatch(handleCardData({ ...obj, term:term }));
    };

    const handleDef = (e) => {
        setDef(e.target.value);
        dispatch(handleCardData({ ...obj, def:def }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setImage(reader.result);
                dispatch(handleCardData({ ...obj, image: reader.result }));
            };
        }
    };

    const editImage = () => {
        setImage(null);
    };

    const deleteCard = () => {
        dispatch(handleDeleteCardData(card.id));
    };


    return (
        <div>
            <div className={styles.wrap}>
                <div className={styles.counts}>
                    {index}
                </div>
                <div>
                    <form action="" className={styles.fields}>
                        <div className={styles.fs}>
                            <label htmlFor="">Enter Term*</label> <br />
                            <input type="text" value={term} onChange={handleTerms} required />
                        </div>
                        <div className={styles.sc}>
                            <label htmlFor="">Enter Definition*</label> <br />
                            <input type="text" value={def} onChange={handleDef} required />
                        </div>
                        {
                            image === null ?
                                <div className={styles.td}>
                                    <label htmlFor="imageInput" style={{ cursor: 'pointer' }}>Select Image</label>
                                    <input
                                        id="imageInput"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        style={{ display: 'none' }}
                                        required
                                    />
                                </div>
                                :
                                <div className={styles.alt}>
                                    <div>
                                        <img src={image} alt="" />
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
