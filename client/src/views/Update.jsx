import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, Link, useHistory } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const history = useHistory();
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/api/authors/${id}`)
            .then(res => {
                setFirstName(res.data.firstName);
                setLastName(res.data.lastName);
            })
    }, []);

    const updateAuthor = e => {
        e.preventDefault();
        axios.put(`http://localhost:4000/api/authors/${id}`, {
            firstName,
            lastName
        })
            .then(res => {
                history.push("/")
            })
            .catch(err => {
                const errorResponse = err.response.data.errors;
                console.log(errorResponse)
                const errorArr = [];
                for (const key of Object.keys(errorResponse)) {
                    errorArr.push(errorResponse[key].message)
                }
                setErrors(errorArr);
            })
    }

    return (
        <div className='flex justify-center '>
            <div className=" w-1/2 text-center bg-white shadow p-4 mt-6 rounded-xl" >
                <Link className="bg-indigo-300 font-Montserrat text-sm font-bold text-white rounded-full mt-4 p-1 px-3 m-1 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:bg-indigo-600 hover:shadow-xl" to={"/"}>
                    Home
                </Link>
                <p className='text-lg font-bold'>Edit this author:</p>
                <form className='font-Quicksand text-center' onSubmit={updateAuthor}>
                    {errors.map((err, index) => <p className='text-red-500' key={index}>{err}</p>)}
                    <label className='text-sm font-Montserrat m-1'>First Name</label>
                    <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white">
                        <input className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" type="text"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => { setFirstName(e.target.value) }} />
                    </p>
                    <label className='text-sm font-Montserrat m-1'>Last Name</label>
                    <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white">
                        <input className="flex-grow pl-1 bg-transparent outline-none text-sm sm:m-1 md:text-center sm:text-left text-gray-600 font-Quicksand bg-white" type="text"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => { setLastName(e.target.value) }} />
                    </p>
                    <input className="bg-indigo-300 font-Montserrat text-sm font-bold text-white rounded-full mt-4 p-1 px-3 m-1 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:bg-indigo-600 hover:shadow-xl" type="submit" value="Update" onSubmit={(e) => history.push("/")} />
                    <button className="bg-indigo-300 font-Montserrat text-sm font-bold text-white rounded-full mt-4 p-1 px-3 m-1 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:bg-indigo-600 hover:shadow-xl" onClick={(e) => history.push("/")}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default Update;