import React,{useState, useEffect} from 'react';
import axios from 'axios';
import {useNavigate, useParams} from 'react-router-dom';
import { BASE_URL } from '../Utils';

const EditNote = () => {

    const [judul, setJudul] = useState('');
    const [catatan, setCatatan] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        getNotesById(id);
    }, []);

    async function updateNotes(e) {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            await axios.put(`${BASE_URL}/edit-notes/${id}`, {
                Headers : {
                    Authorization : `Bearer ${token}`
                }
            } ,{ judul, catatan });
            console.log({token});
            navigate('/notes');
        } catch (error) {
            console.log(error);
        }
    }

    const getNotesById = async () => {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get(`${BASE_URL}/notes/${id}`, {
            Headers : {
                Authorization : `Bearer ${token}`
            }
        });
        setJudul(res.data.judul);
        setCatatan(res.data.catatan);
    }

  return (
    <div className="columns mt-5 is-centered">
        <div className="column is-half">
            <form onSubmit={updateNotes}>
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
                        <button className="button is-success is-small" type="submit">Update</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditNote