import React, { useEffect, useState } from 'react';
import styles from '../flashcards/AllFlashcard.module.css';
import IndividualCards from './IndividualCards';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getData, getDataSuccess } from '../../redux/action';

function AllFlashCards() {
  const data = useSelector((store) => store.allData);
  const loading = useSelector((store) => store.isLoading);
  const error = useSelector((store) => store.isError);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData);
  }, [dispatch]);

  return (
    <div>
      <div className={styles.cont}>
        {loading ? (
          <div className={styles.spinnerContainer}>
            <div className={styles.spinner}></div>
            <p className={styles.load} >Loading Data...</p>
          </div>
        ) : (
          data?.map((card, index) => <IndividualCards key={index} {...card} />)
        )}
      </div>
    </div>
  );
}

export default AllFlashCards;
