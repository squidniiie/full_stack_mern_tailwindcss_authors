import React from 'react';
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';
import '../static/AuthorList.css'

const AuthorList = (props) => {
    const { removeFromDom } = props;
    const history = useHistory();


    const deleteAuthor = (authorId) => {
        axios.delete('http://localhost:4000/api/authors/' + authorId)
            .then(res => {
                removeFromDom(authorId)
            })
            .catch(err => console.error(err));
    }

    return (
        <div>
            <table className='text-center table-fixed'>
                <thead>
                    <tr>
                        <th>Authors</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {props.authors.map((author, idx) => {
                        return <tr key={idx}>
                            <td>
                                <Link className='text-md font-Quicksand' to={"/authors/:id" + author._id}>
                                    {author.lastName}, {author.firstName}
                                </Link>
                            </td>
                            <td>
                                <button className="bg-indigo-300 font-Montserrat text-sm font-bold text-white rounded-full mt-4 p-1 px-3 m-1 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:bg-indigo-600 hover:shadow-xl" onClick={(e) => { deleteAuthor(author._id) }}>
                                    Delete
                                </button>
                                <button className="bg-indigo-200 font-Montserrat text-sm font-bold text-white rounded-full mt-4 p-1 px-3 m-1 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:bg-indigo-400 hover:shadow-xl" onClick={(e) => history.push(`authors/${author._id}/edit`)}>
                                    Edit
                                </button>
                            </td>

                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default AuthorList;