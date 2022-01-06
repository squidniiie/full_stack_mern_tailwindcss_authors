import React, { useEffect, useState } from 'react'
import axios from 'axios';
import AuthorList from '../components/AuthorList';
import { Link } from 'react-router-dom';

const Main = () => {
    const [authors, setAuthors] = useState([]);
    const [submitted, setSubmitted] = useState(false);

    const changeSubmitted = () => {
        setSubmitted(!submitted)
    }

    useEffect(() => {
        axios.get('http://localhost:4000/api/authors')
            .then(res => {
                setAuthors(res.data);
                setSubmitted(res.data);
            })
            .catch(err => console.error(err));
    }, [submitted]);

    const removeFromDom = authorId => {
        setAuthors(authors.filter(author => author._id !== authorId));
    }

    return (
        <div className='flex justify-center'>
            <div className="text-center bg-white shadow p-4 mt-6 rounded-xl">
                <h1 className='text-2xl font-bold'>Favorite Authors</h1>
                <Link className='rounded-full bg-indigo-200 font-Montserrat text-lg font-bold text-white  mt-4 p-1 px-3 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:bg-indigo-300 hover:shadow-xl' to="/new_author">Create New Author</Link>
                <br />
                {submitted && <AuthorList authors={authors} removeFromDom={removeFromDom} />}
            </div>
        </div>
    );
}

export default Main;