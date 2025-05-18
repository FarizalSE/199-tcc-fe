import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BASE_URL } from "../Utils";


const UserList = () => {
    const [users, setUsers] = useState([]);
    
    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`${BASE_URL}/users`, {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error("Unauthorized or error:", error);
        }
    };

    // const deleteNotes = async (id) => {
    //     try {
    //         await axios.delete(`${BASE_URL}/delete-users/${id}`);
    //         getUsers();
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <Link to={`/notes`} className="button">Kembali</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Email</th>
                        <th>Gender</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                        <td>{index + 1}</td> 
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.gender}</td>
                        {/* <td><button onClick={()=> deleteNotes(note.id)} className="button is-danger is-small">Delete</button></td>
                        <td><button className="button is-success is-small">Detail</button></td> */}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default UserList;