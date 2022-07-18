import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth, dataBase } from "../firebase";
import { doc, updateDoc } from "firebase/firestore"
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        error: null,
        loading: false,
    });

    const navigate = useNavigate();
    const { email, password, error, loading } = data;
    const handleChange = h => {
        setData({ ...data, [h.target.name]: h.target.value });
    };
    const handleSubmit = async s => {
        s.preventDefault();
        setData({ ...data, error: null, loading: true });
        if (!email || !password){
            setData({ ...data, error: "Please fill in all fields!" })
        }
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            await updateDoc(doc(dataBase, 'users', result.user.uid), {
                isOnline: true,
            });
            setData({email: '', password: '', error: null, loading: false});
            navigate("/");
        } catch (er) {
            setData({ ...data, error: er.message, loading: false });
        }
    }

    return (
    <section>
        <h3>Login into existing account</h3>
        <form className='form' onSubmit={handleSubmit}>
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
                <button className="btn" disabled={loading}>{loading ? 'logging in' : 'Sign in'}</button>
            </div>
        </form>
    </section>
  )
}

export default Login;