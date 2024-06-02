import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleCard, requestData } from '../../redux/action';
import styles from '../flashcards/singleCard.module.css';
import { Button, useDisclosure } from '@chakra-ui/react';

function FlashCard() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector((store) => store.isLoading);
    const data = useSelector((store) => store.singleCard);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(requestData());
        dispatch(getSingleCard(id));
    }, [dispatch, id]);

    const handleNext = () => {
        if (currentIndex < 7) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton} onClick={() => navigate(-1)}>←</button>
                <h1 className={styles.title}>{data && data.length > 0 ? data[0].groupName : "Loading..."}</h1>
            </div>
            <p className={styles.description}>{data && data.length > 0 ? data[0].description : "Loading..."}</p>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <h2>Flashcards</h2>
                    <hr />
                    <div className={styles.flashcardList}>
                        {Array.from({ length: 8 }, (_, i) => (
                            <div
                                key={i}
                                className={`${styles.card} ${i === currentIndex ? styles.activeCard : ''}`}
                                onClick={() => setCurrentIndex(i)}
                            >
                                Card {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
                <div className={styles.mainContent}>
                    {loading ? (
                        <div className={styles.spinnerContainer}>
                            <div className={styles.spinner}></div>
                            <p className={styles.load}>Loading Data...</p>
                        </div>
                    ) : (
                        data && data.length > 0 && (
                            <>
                                <div className={styles.imageContainer}>
                                    <img src={data[currentIndex].image} alt="No Image Available" className={styles.image} />
                                </div>
                                <div className={styles.cardDescription}>
                                    <p>{data[currentIndex].definition}</p>
                                </div>
                            </>
                        )
                    )}
                </div>
                <div className={styles.actions}>
                    <Button onClick={onOpen} className={styles.actionButton}>Share</Button>
                    <Button className={styles.actionButton}>Download</Button>
                    <Button className={styles.actionButton} onClick={() => window.print()}>Print</Button>
                </div>
            </div>
            <div className={styles.navButtons}>
                <button className={styles.navButton} onClick={handlePrev}>{"<"}</button>
                <span className={styles.navStatus}>{`${currentIndex + 1}/8`}</span>
                <button className={styles.navButton} onClick={handleNext}>{">"}</button>
            </div>
        </div>
    );
}

export default FlashCard;
