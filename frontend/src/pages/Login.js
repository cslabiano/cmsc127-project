import React, { useState, useEffect } from 'react';
import KusinaButton from '../components/KusinaButton';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [data, setData] = useState([]);
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        fetch('http://localhost:3001/users')
        .then(res => res.json())
        .then(data => setData(data))
        .catch(err => console.log(err));
    }, [])

    const handleLogin = () => {
        const user = data.find(user => user.user_name === inputUsername && user.password === inputPassword);
        if (user) {
            navigate('/kusina');
        } else {
            setError('Invalid username or password');
        }
    }

    return (
        <div className='bg-kusinabg min-h-screen min-w-screen flex flex-col items-center justify-center'>
            <div className='text-kusinaprimary font-bold text-4xl pb-5 text-left w-full max-w-xs px-11'>
                Sign in
            </div>
                <div className='flex flex-col align-middle justify-center items-center'>
                    <div className='pb-4'>
                        <input type="text" value={inputUsername} onChange={(e)=>setInputUsername(e.target.value)} placeholder="Username" className="input input-bordered input-accent w-full max-w-xs placeholder-accent bg-transparent" />
                    </div>
                    <div className='pb-2'>
                        <input type="password" value={inputPassword} placeholder="Password" onChange={(e)=>setInputPassword(e.target.value)} className="input input-bordered input-accent w-full max-w-xs placeholder-accent bg-transparent" />
                    </div>
                </div>
                {error && <div className='text-kusinaprimary '>{error}</div>}
            <div className='text-kusinaprimary font-semibold text-xs text-left w-full max-w-xs px-11 hover:text-kusinaprimarylight'>
                <a href='/'>Forgot password?</a>
            </div>
            <div className='pt-6'>
                <KusinaButton link='/kusina' action='Sign in' onClick={handleLogin}/>
            </div>
            <div className='pt-5 text-kusinablack font-medium text-xs text-left w-full max-w-xs px-11'>
                New to Kusina? <a  className='text-kusinaprimary font-semibold hover:text-kusinaprimarylight' href='/sign-up'>Tara, sali ka</a>
            </div>
        </div>
    )
}

export default Login;