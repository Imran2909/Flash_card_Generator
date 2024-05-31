import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewFlashcard from './NewFlashcard'
import AllFlashCards from './flashcards/AllFlashCards'
import FlashCard from './flashcards/FlashCard'

function AllRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<NewFlashcard />} />
                <Route path="/create" element={<NewFlashcard />} />
                <Route path="/flashcards" element={<AllFlashCards />} />
                <Route path="/flashcards/:id" element={< FlashCard />} />
            </Routes>
        </div>
    )
}

export default AllRoutes
