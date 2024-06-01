import React, { useState, useEffect } from 'react';
import KusinaButton from '../components/KusinaButton';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [data, setData] = useState([]);
    const [inputUsername, setInputUsername] = useState('');
    const [inputPassword, setInputPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = () => {
        fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_name: inputUsername,
                password: inputPassword
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(error => { throw new Error(error.error);});
            }
        })
        .then(() => {
            navigate('/');
        })
        .catch(err => {
            setError(err.message);
        })
    }

    return (
        <div className='bg-kusinabg min-h-screen min-w-screen flex flex-col items-center justify-center'>
            <div className='text-kusinaprimary font-bold text-4xl pb-5 text-left w-full max-w-xs px-11'>
                Sign up
            </div>
                <div className='flex flex-col align-middle justify-center items-center'>
                    <div className='pb-4'>
                        <input type="text" placeholder="Username" onChange={(e)=>setInputUsername(e.target.value)} className="input input-bordered input-accent w-full max-w-xs placeholder-accent bg-transparent" />
                    </div>
                    <div className='pb-2'>
                        <input type="password" placeholder="Password" onChange={(e)=>setInputPassword(e.target.value)} className="input input-bordered input-accent w-full max-w-xs placeholder-accent bg-transparent" />
                    </div>
                </div>
                {error && <div className='text-kusinaprimary '>{error}</div>}
            <div className='pt-6'>
                <KusinaButton link='/' action='Sign up' onClick={handleSignup}/>
            </div>
            <div className='pt-5 text-kusinablack font-medium text-xs text-left w-full max-w-xs px-11'>
               Already have an account? <a  className='text-kusinaprimary font-semibold hover:text-kusinaprimarylight' href='/'>Tara, tuloy ka</a>
            </div>
        </div>
    )
}

export default Signup;