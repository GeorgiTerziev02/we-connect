import React, { useState, useRef } from 'react'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'
import Tooltip from 'react-bootstrap/Tooltip'
import { useHistory } from 'react-router-dom'

const SearchBar = () => {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    const [searchParams, setSearchParams] = useState('')
    const history = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();

        if (searchParams) {
            history.push(`/search/${searchParams}`)
            setSearchParams('')
            setShow(false)
        } else {
            setShow(true)
            setTimeout(() => { setShow(false) }, 2000)
        }
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
            <Button variant="outline-info" type="submit" ref={target}>Search</Button>
            <Overlay target={target.current} show={show} placement="bottom">
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        Enter something
                    </Tooltip>
                )}
            </Overlay>
        </Form>
    )
}

export default SearchBar