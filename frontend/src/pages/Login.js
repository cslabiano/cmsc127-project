import React from 'react';
import KusinaButton from '../components/KusinaButton';

function Login() {
    return (
        <div className='bg-kusinabg min-h-screen min-w-screen flex flex-col items-center justify-center'>
            <div className='text-kusinaprimary font-bold text-4xl pb-5 text-left w-full max-w-xs px-11'>
                Sign in
            </div>
                <div className='flex flex-col align-middle justify-center items-center'>
                    <div className='pb-4'>
                        <input type="text" placeholder="Username" className="input input-bordered input-accent w-full max-w-xs placeholder-accent bg-transparent" />
                    </div>
                    <div className='pb-2'>
                        <input type="password" placeholder="Password" className="input input-bordered input-accent w-full max-w-xs placeholder-accent bg-transparent" />
                    </div>
                </div>
            <div className='text-kusinaprimary font-semibold text-xs text-left w-full max-w-xs px-11 hover:text-kusinaprimarylight'>
                <a href='/'>Forgot password?</a>
            </div>
            <div className='pt-6'>
                <KusinaButton link='/kusina' action='Sign in' />
            </div>
            <div className='pt-5 text-kusinablack font-medium text-xs text-left w-full max-w-xs px-11'>
                New to Kusina? <a  className='text-kusinaprimary font-semibold hover:text-kusinaprimarylight' href='/sign-up'>Tara, sali ka</a>
            </div>
        </div>
    )
}

export default Login;