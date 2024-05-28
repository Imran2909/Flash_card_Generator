import React from 'react'
import styles from "../flashcards/AllFlashcard.module.css"
import IndividualCards from './IndividualCards'

function AllFlashCards() {
  return (
    <div>
        <div className={styles.cont} >
          <IndividualCards  />
        </div>
    </div>
  )
}

export default AllFlashCards
