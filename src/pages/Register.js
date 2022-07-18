import { async } from '@firebase/util';
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, dataBase } from "../firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        error: null,
        loading: false,
        reveal: false
    });

    const navigate = useNavigate();
    const { name, email, password, error, loading, reveal } = data;
    const handleChange = h => {
        setData({ ...data, [h.target.name]: h.target.value });
    };
    const handleSubmit = async s => {
        s.preventDefault();
        setData({ ...data, error: null, loading: true });
        if (!name || !email || !password){
            setData({ ...data, error: "Please fill in all fields!" })
        }
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(dataBase, 'users', result.user.uid), {
                uid: result.user.uid,
                name,
                email,
                password,
                createdAt: Timestamp.fromDate(new Date()),
                isOnline: true,
                reveal: reveal
            });
            setData({name: '', email: '', password: '', error: null, loading: false, reveal: false});
            navigate("/");
        } catch (er) {
            setData({ ...data, error: er.message, loading: false, reveal: false });
        }
    }

    return (
    <section>
        <h3>Create an Account</h3>
        <form className='form' onSubmit={handleSubmit}>
            <div className='input_container'>
                <label htmlFor='name'>Username</label>
                <input type="text" name="name" value={name} onChange={handleChange} />
            </div>
            <div className='input_container'>
                <label htmlFor='email'>Email Address</label>
                <input type="text" name="email" value={email} onChange={handleChange} />
            </div>
            <div className='input_container'>
                <label htmlFor='password'>Password</label>
                <input type="text" name="password" value={password} onChange={handleChange} />
            </div>
            {error ? <p className='error'>{error}</p> : null}
            <div className='btn_container'>
                <button className="btn" disabled={loading}>{loading? 'Creating User': 'Create Account'}</button>
            </div>
        </form>
    </section>
  )
}

export default Register