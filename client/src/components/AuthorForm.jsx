import React, { useState } from 'react'
import axios from 'axios';
import { Link, useHistory } from 'react-router-dom';

const AuthorForm = () => {

    // const { changeSubmitted } = props;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const history = useHistory();
    const [errors, setErrors] = useState([]);


    const onSubmitHandler = e => {
        e.preventDefault();
        const postData = {
            firstName,
            lastName
        }
        axios.post('http://localhost:4000/api/new_author', postData)
            .then(res => {
                console.log(postData)
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
                console.log(err)
            })
    }

    return (
        <div className='flex justify-center '>
            <div className=" w-1/2 text-center bg-white shadow p-4 mt-6 rounded-xl"  >
                <Link className="bg-indigo-300 font-Montserrat text-sm font-bold text-white rounded-full mt-4 p-1 px-3 m-1 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:bg-indigo-600 hover:shadow-xl" to={"/"}>
                    Home
                </Link>

                <p className='text-lg font-bold mt-2'>Add a new author:</p>
                <form className='font-Quicksand text-center' onSubmit={onSubmitHandler}>
                    {errors.map((err, index) => <p className='text-red-500' key={index}>{err}</p>)}
                    <label className='text-sm font-Quicksand m-1'>First Name</label>
                    <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white">
                        <input type="text" onChange={(e) => setFirstName(e.target.value)} value={firstName} />
                    </p>
                    <label className='text-sm font-Quicksand m-1'>Last Name</label>
                    <p className="flex items-center border-2 border-gray-50 shadow-md rounded-full bg-white">
                        <input type="text" onChange={(e) => setLastName(e.target.value)} value={lastName} />
                    </p>
                    <input className="bg-indigo-300 font-Montserrat text-sm font-bold text-white rounded-full mt-4 p-1 px-3 m-1 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:bg-indigo-600 hover:shadow-xl" type="submit" value="Create" />
                    <button className="bg-indigo-300 font-Montserrat text-sm font-bold text-white rounded-full mt-4 p-1 px-3 m-1 cursor-pointer active:scale-90 transform transition duration-500 hover:scale-90 hover:bg-indigo-600 hover:shadow-xl" onClick={(e) => history.push('/')}>Cancel</button>
                </form>
            </div>
        </div>
    )
}
export default AuthorForm;