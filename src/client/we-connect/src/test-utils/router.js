import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import UserContext from '../Context'

const TestingEnvironment = ({ value, children }) => {
    return (
        <BrowserRouter>
            <UserContext.Provider value={value}>
                {children}
            </UserContext.Provider>
        </BrowserRouter>
    )
}

export default TestingEnvironment