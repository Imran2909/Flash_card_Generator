import React, { useEffect, useState } from 'react';
import styles from '../styles/card.module.css';
import SingleCrad from './SingleCrad';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddCardData } from '../redux/action';
import { v4 as uuidv4 } from 'uuid';

function Cards() {
    const [count, setCount] = useState(1);
    const allCardData = useSelector((store) => store.allCardData);
    const cardData = useSelector((store) => store.cardData);
    const dispatch = useDispatch();

    const handleAdd = () => {
        setCount(count + 1);
        const newCard = { id: uuidv4(), term: '', def: '', image: null };
        let arr = [...allCardData, newCard];
        dispatch(handleAddCardData(arr));
        console.log(arr);
    };

    useEffect(() => {
    }, [count]);

    return (
        <div className={styles.box}>
            {
                allCardData.map((card, index) => (
                    <SingleCrad key={card.id} card={card} index={index + 1} />
                ))
            }
            <div className={styles.add} onClick={handleAdd}>
                {
                    count === 1 ? "+ Add Card" : "+ Add More Cards"
                }
                <br />
                <div style={{height:"20px"}} >
                </div>
            </div>
        </div>
    );
}

export default Cards;
