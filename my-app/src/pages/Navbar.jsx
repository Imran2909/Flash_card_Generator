import React from 'react'
import { NavLink } from 'react-router-dom'
import styles from './navbar.module.css'
import AllRoutes from '../components/AllRoutes'

function Navbar() {

    return (
        <div>
            <div className={styles.nav} >
                <NavLink className={({ isActive }) => isActive ? styles.activeNavlink : styles.nonActive}
                    to={"/create"} > Create New </NavLink>
                <NavLink className={({ isActive }) => isActive ? styles.activeNavlink : styles.nonActive}
                    to={"/flashcards"} > My Flashcard </NavLink>
                <hr />
            </div>
            <div>
            <AllRoutes />
            </div>
        </div>
    )
}

export default Navbar
