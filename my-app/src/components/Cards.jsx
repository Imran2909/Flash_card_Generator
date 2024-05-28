import React, { useEffect, useState } from 'react';
import styles from '../styles/card.module.css';
import SingleCrad from './SingleCrad';
import { useDispatch, useSelector } from 'react-redux';
import { getCardData, handleAddCardData, handleCardData } from '../redux/action';
import { Wrap, WrapItem, useToast, Button } from '@chakra-ui/react';

function Cards() {
    const [data, setData] = useState([])
    const cardData = useSelector((store) => store.cardData);
    const [count, setCount] = useState( cardData.length+1);
    const groupData = useSelector((store) => store.groupData);
    const dispatch = useDispatch();
    const toast = useToast()
   

    const handleAdd = () => {
        // if (groupData.groupName === "" || groupData.description === "" || groupData.image === null) {
        //     toast({
        //         title: `Please add all group data`,
        //         position: "top",
        //         status:'info',
        //         isClosable: true,
        //       })
        // }else{
            console.log(count);
            const val = { Id: count, term: "", def: "", image: null };
            const updatedCardData = [...cardData, val];
            dispatch(handleCardData(updatedCardData));
            setCount(count + 1);
            console.log("Updated card data:", updatedCardData);
        // }
    };

    const addData = () => {
        setData(cardData)
        // console.log("data",cardData);
    }


    useEffect(() => {
        addData()
        // console.log("from card.jsx");
    }, [count, cardData, data]);

    return (
        <div className={styles.box}>
            {/* {
                console.log("ok")
            } */}
            {
                data.map((elem, index) => (
                    <SingleCrad count={count - 1} {...elem} key={index} />
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
