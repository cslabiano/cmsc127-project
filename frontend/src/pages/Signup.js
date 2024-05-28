import React from 'react';

function Signup() {
    return (
        <div className='bg-kusinabg min-h-screen min-w-screen flex flex-col items-center justify-center'>
            <div className='text-kusinaprimary font-bold text-4xl pb-5 text-left w-full max-w-xs px-11'>
                Sign up
            </div>
                <div className='flex flex-col align-middle justify-center items-center'>
                    <div className='pb-4'>
                        <input type="text" placeholder="Username" className="input input-bordered input-accent w-full max-w-xs placeholder-accent bg-transparent" />
                    </div>
                    <div className='pb-2'>
                        <input type="password" placeholder="Password" className="input input-bordered input-accent w-full max-w-xs placeholder-accent bg-transparent" />
                    </div>
                </div>
                
            <div className='pt-6'>
                <button className='px-20 rounded-full bg-gradient-to-r from-kusinaprimary to-kusinaprimarylight outline-none py-3 text-white font-medium 
                                    hover:from-kusinaprimarylight hover:to-kusinaprimary shadow-lg'>
                                        Sign up</button>
            </div>
            <div className='pt-5 text-kusinablack font-medium text-xs text-left w-full max-w-xs px-11'>
               Already have an account? <a  className='text-kusinaprimary font-semibold hover:text-kusinaprimarylight' href='/'>Tara, tuloy ka</a>
            </div>
        </div>
    )
}

export default Signup;