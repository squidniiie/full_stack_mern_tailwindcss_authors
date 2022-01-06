import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link } from "react-router-dom";

const Detail = () => {
    const [author, setAuthor] = useState({})
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/api/authors/${id}`)
            .then(res => setAuthor(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div>
            <div>
                <p>First Name: {author.firstName}</p>
                <p>Last Name: {author.lastName}</p>
            </div>
            <Link to={"/authors/" + author._id + "/edit"}>
                Edit
            </Link>
        </div>
    )
}

export default Detail;