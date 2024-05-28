import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewFlashcard from './NewFlashcard'
import AllFlashCards from './flashcards/AllFlashCards'

function AllRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<NewFlashcard />} />
                <Route path="/create" element={<NewFlashcard />} />
                <Route path="/flashcards" element={<AllFlashCards />} />
            </Routes>
        </div>
    )
}

export default AllRoutes
