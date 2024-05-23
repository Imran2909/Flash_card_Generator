import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewFlashcard from './NewFlashcard'

function AllRoutes() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<NewFlashcard />} />
                <Route path="/create" element={<NewFlashcard />} />
            </Routes>
        </div>
    )
}

export default AllRoutes
