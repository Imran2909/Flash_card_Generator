import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getData, getSingleCard } from '../../redux/action';
import styles from '../flashcards/AllFlashcard.module.css';


function FlashCard() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const [loading,setLoading] = useState(true)
    const load = useSelector((store) => setLoading(store.isLoading));
    const singleCard = useSelector((store) => store.singleCard);

    useEffect(() => {
        dispatch(getData);
    }, [dispatch,id,loading]);

    return (
        <div>
            {loading ? (
                <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}></div>
                    <p className={styles.load} >Loading Data...</p>
                </div>
            ) : (
                <div>
                    <h1>{singleCard[0].groupName}</h1>
                    <h1>{singleCard[0].description}</h1>
                    <img src={singleCard[0].image} alt="" />
                </div>
            )
            }



        </div>
    )
}

export default FlashCard

