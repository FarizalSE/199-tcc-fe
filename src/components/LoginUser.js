import React,{useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { BASE_URL } from '../Utils';

const UserLogin = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const Navigate = useNavigate();

    const userLogin = async (e) => {
        e.preventDefault();
        console.log("Tombol di Tekan");

        try {
            if (email != null || password != null) {
                const response = await axios.post(`${BASE_URL}/login`, {email, password});
                console.log("Selamat, anda berhasil melakukan login");
                localStorage.setItem("accessToken", response.data.accessToken);
                console.log("AccesToken : ", response.data.accessToken);
                Navigate("/");
            }
        } catch (error) {
            console.log(error);
            console.log("Email atau Password yang anda masukan salah")
        }
    }

    const toRegister = async () => {
        Navigate(`/register`);
    }

    return (
        <section className="section">
            <div className="container">
                <div className="column is-half is-offset-one-quarter">
                    <h1 className="title has-text-centered">Login</h1>
                    <form onSubmit={userLogin}>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Masukkan email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <label className="label">Password</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Masukkan password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="field">
                            <div className="control">
                                <button className="button is-primary is-fullwidth" type="submit">
                                    Login
                                </button>
                                <br />
                                <button onClick={toRegister} className="button is-secondary is-fullwidth">Registrasi</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );

}
export default UserLogin;