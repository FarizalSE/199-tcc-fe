import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { BASE_URL } from '../Utils';

const AddNote = () => {

    const [judul, setJudul] = useState('');
    const [catatan, setCatatan] = useState('');
    const navigate = useNavigate();

    const saveNotes = async (e) => {
        e.preventDefault();
        console.log("Tombol ditekan")
        try {
            await axios.post(`${BASE_URL}/add-notes`, {judul, catatan});
            console.log("Data berhasil ditambahkan");
            navigate('/');
        } catch (error) {
            console.log(error);
            console.log("Data gagal ditambahkan");
        }
    }

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={saveNotes}>
                <div className="field">
                    <label className="label">Judul</label>
                    <div className="control">
                        <input type="text" className="input" value={judul} onChange={(e)=> setJudul(e.target.value)} placeholder='Judul' />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Catatan</label>
                    <div className="control">
                        <input type="text" className="input" value={catatan} onChange={(e)=> setCatatan(e.target.value)} placeholder='Tulis Catatan......' />
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <button className="button is-success is-small" type="submit">SaveNote</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddNote