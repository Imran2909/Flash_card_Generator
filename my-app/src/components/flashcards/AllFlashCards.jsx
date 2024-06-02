import React, { useEffect, useState } from 'react';
import styles from '../flashcards/AllFlashcard.module.css';
import IndividualCards from './IndividualCards';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getData, getDataSuccess, requestData } from '../../redux/action';

function AllFlashCards() {
  const data = useSelector((store) => store.allData);
  const loading = useSelector((store) => store.isLoading);
  const error = useSelector((store) => store.isError);
  const [showAll, setShowAll] = useState(false);

  const dispatch = useDispatch();
  const toggleShowAll = () => {
    setShowAll(!showAll);
  };
  useEffect(() => {
    dispatch(requestData)
    dispatch(getData);
  }, [dispatch]);

  return (
    <div>
      <div className={styles.cont}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.load}>Loading Data...</p>
          </div>
        ) : (
          (showAll ? data : data?.slice(0, 6)).map((card, index) => (
            <IndividualCards key={index} {...card} />
          ))
        )
      }
      {
        data.length>6 ?
        <button onClick={toggleShowAll} className={styles.toggleButton}>
        {  showAll ? 'Show Less' : 'Show All'}
      </button> : ""
      }
      </div>
    </div>
  );
}

export default AllFlashCards;

