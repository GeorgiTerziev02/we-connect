import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import { useHistory } from 'react-router-dom'

const SearchBar = () => {
    const [searchParams, setSearchParams] = useState('')
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        
        history.push(`/search/${searchParams}`)
        setSearchParams('')
    }

    return (
        <Form inline onSubmit={submitHandler}>
            <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                value={searchParams}
                onChange={(e) => setSearchParams(e.target.value)}
            />
            <Button variant="outline-info" type="submit">Search</Button>
        </Form>
    )
}

export default SearchBar