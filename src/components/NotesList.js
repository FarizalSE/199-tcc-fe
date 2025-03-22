import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


const NotesList = () => {
    const [notes, setNotes] = useState([]);
    
    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        const res = await axios.get("http://localhost:5000/notes");
        setNotes(res.data); 
    };

    const deleteNotes = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/delete-notes/${id}`);
            getNotes();
        } catch (error) {
            console.log(error);
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
        </div>
    </div>
  )
}

export default NotesList;