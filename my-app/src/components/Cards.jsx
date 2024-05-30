import React, { useEffect, useState } from 'react';
import styles from '../styles/card.module.css';
import SingleCrad from './SingleCrad';
import { useDispatch, useSelector } from 'react-redux';
import { getCardData, handleAddCardData, handleCardData } from '../redux/action';
import { Wrap, WrapItem, useToast, Button } from '@chakra-ui/react';

function Cards() {
    const [data, setData] = useState([])
    const cardData = useSelector((store) => store.cardData);
    const [count, setCount] = useState(cardData.length + 1);
    const groupData = useSelector((store) => store.groupData);
    const dispatch = useDispatch();
    const toast = useToast()
    let ec=false

    const handleAdd = () => {
        console.log(groupData);
        if (groupData.groupName === "" || groupData.description === "" || groupData.image === null) {
            toast({
                title: `Please fill all the group data`,
                position: "top",
                status: 'info',
                isClosable: true,
            })
            return
        }

        else {
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
            } else {
                console.log(count);
                const val = { Id: count, term: "", def: "", image: null };
                const updatedCardData = [...cardData, val];
                dispatch(handleCardData(updatedCardData));
                setCount(count + 1);
                console.log("Updated card data:", updatedCardData);
            }


        }
    };

    const addData = () => {
        setData(cardData)
    }


    useEffect(() => {
        addData()
    }, [count, cardData, data]);

    return (
        <div className={styles.box}>
            {
                data.map((elem, index) => (
                    <SingleCrad {...elem} key={index} index={index} />
                ))
            }
            <div className={styles.add} onClick={handleAdd}>
                {count == 1 ? "+ Add Card" : "+ Add More Cards"}
                <br />
                <div style={{ height: "20px" }} >
                </div>
            </div>
        </div>
    );
}

export default Cards;
