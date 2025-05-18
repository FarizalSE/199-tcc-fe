import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../Utils";


const NotesList = () => {
    const [notes, setNotes] = useState([]);
    const Navigate = useNavigate();
    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get(`${BASE_URL}/notes`);
        console.log({token})
        localStorage.setItem(`token`, token);
        setNotes(res.data); 
    };

    const deleteNotes = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/delete-notes/${id}`);
            getNotes();
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        try {
            await axios.delete(`${BASE_URL}/logout`);
            console.log("Tombol berhasil ditekan, dan berhasil logout");
            Navigate(`/`);
        } catch (error) {
            console.log("logout gagal", error);
        }
    }

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <Link to={`/add`} className="button">Add New</Link>
            <table className="table is-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Judul</th>
                        <th>Catatan</th>
                        <th>Edit</th>
                        <th>Delete</th>
                        <th>Detail</th>
                    </tr>
                </thead>
                <tbody>
                    {notes.map((note, index) => (
                        <tr key={note.id}>
                        <td>{index + 1}</td> 
                        <td>{note.judul}</td>
                        <td>{note.catatan}</td>
                        <td><Link  to={`/edit/${note.id}`} className="button is-warning is-small">Edit</Link></td>
                        <td><button onClick={()=> deleteNotes(note.id)} className="button is-danger is-small">Delete</button></td>
                        <td><button className="button is-success is-small">Detail</button></td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div className="columns is-mobile">
                <div className="column has-text-centered">
                    <Link to={`/users`} className="button is-primary is-small">
                    Admin
                </Link>
                </div>
                <div className="column has-text-centered">
                    <button onClick={logout} className="button is-danger is-small">Logout</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default NotesList;