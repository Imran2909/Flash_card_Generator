import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getSingleCard, requestData } from '../../redux/action';
import styles from '../flashcards/singleCard.module.css';
import { Button, useDisclosure } from '@chakra-ui/react';
import { FaRegShareSquare } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";
import { FiPrinter } from "react-icons/fi";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import { FaRegCopy } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { IoMail } from "react-icons/io5";


function FlashCard() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const loading = useSelector((store) => store.isLoading);
    const data = useSelector((store) => store.singleCard);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const navigate = useNavigate();
    const contentRef = useRef(null);


    useEffect(() => {
        dispatch(requestData());
        dispatch(getSingleCard(id));
    }, [dispatch, id, currentIndex]);


    return (
        <div className={styles.container}>
            <div className={styles.top} >
                <div className={styles.header}>
                    <button className={styles.backButton} onClick={() => navigate(-1)}>←</button>
                    <h1 className={styles.title}>{data && data.length > 0 ? data[0].groupName : "Loading..."}</h1>
                </div>
                <p className={styles.description}>{data && data.length > 0 ? data[0].description : "Loading..."}</p>
            </div>
            <div className={styles.content}>
                <div className={styles.sidebar}>
                    <h2>Flashcards</h2>
                    <hr /> <hr /> <br />
                    <div className={styles.flashcardList}>
                        {
                            data && data.length > 0 && data[0].cards.map((el, ind) => {

                                return <div
                                    key={ind}
                                    className={`${el.Id === currentIndex + 1 ? styles.activeCard : styles.card}`}
                                    onClick={() => setCurrentIndex(el.Id - 1)}
                                >
                                    {el.term}
                                    {/* Card {ind + 1} */}
                                </div>
                            })
                        }
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
                                    <img src={data[0].cards[currentIndex].image} alt="No Image Available" className={styles.image} />
                                </div>
                                <div className={styles.cardDescription}>
                                    <p>{data[0].cards[currentIndex].def}</p>
                                </div>
                            </>
                        )
                    )}
                </div>
                <div className={styles.actions}>
                    <button onClick={onOpen} className={styles.actionBut}> <FaRegShareSquare className={styles.logo} />
                        Share</button>
                    <button className={styles.actionBut}  onClick={() => window.print()} ><MdOutlineFileDownload className={styles.logo} />
                        Download</button>
                    <button className={styles.actionBut} onClick={() => window.print()}><FiPrinter className={styles.logo} />
                        Print</button>
                </div>
            </div>
            <div
                className={styles.navButtons}>
                <button className={currentIndex === 0 ? styles.disable : styles.navButton}
                    onClick={() => {
                        setCurrentIndex(+(+currentIndex - 1))
                    }} >{"<"}</button>

                <span className={styles.navStatus}>{`${currentIndex + 1} / ${data && data.length > 0 && data[0].cards.length || 'loading....'}`}</span>

                <button
                    className={currentIndex === (data && data.length > 0 && data[0].cards.length - 1) ? styles.disable : styles.navButton}
                    onClick={() => {
                        setCurrentIndex(+(+currentIndex + 1))
                    }}>{">"}</button>
            </div>
            <div>
                <>
                    {/* <Button onClick={onOpen}>Open Modal</Button> */}
                    <Modal isCentered onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom' className={styles.modal} >
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Share</ModalHeader>
                            <div className={styles.share} >
                                <div className={styles.link} >
                                    <div className={styles.shareLink} >
                                        <p> <b>Link : </b>    http://localhost:3000/flashca...</p>
                                        <FaRegCopy className={styles.copy} />
                                        <FaRegShareSquare className={styles.fwd} />
                                    </div>
                                    <div className={styles.shares} >
                                        <div><BsFacebook className={styles.media} onClick={()=>window.location.href = 'https://www.facebook.com'} /></div>
                                        <div><FaLinkedin className={styles.media} onClick={()=>window.location.href = 'https://www.linkedin.com'} /></div>
                                        <div><FaWhatsappSquare className={styles.media} onClick={()=>window.location.href = 'https://web.whatsapp.com'} /></div>
                                        <div><FaTwitter className={styles.media} onClick={()=>window.location.href = 'https://www.twitter.com'} /></div>
                                        <div><IoMail className={styles.media} onClick={()=>window.location.href = 'https://mail.google.com'} /></div>

                                    </div>

                                </div>

                            </div>
                            <ModalCloseButton />
                            <ModalFooter>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </>
            </div>

        </div>
    );
}

export default FlashCard;
