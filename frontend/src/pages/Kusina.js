import React from 'react';
import KusinaNavBar from '../components/KusinaNavBar';
import KusinaSearchBar from '../components/KusinaSearchBar';

function Kusina() {
    return (
        <div className='bg-kusinabg min-h-screen min-w-screen z-0'>
            <div className='z-10'>
                <KusinaNavBar />
            </div>
            <div className='flex flex-col'>
                <div className='flex flex-col items-center justify-center'>
                    <div className='pt-20'>
                        <KusinaSearchBar placeholder='Search a kusina' />
                    </div>
                </div>

            </div>

            
        </div>
    )
}

export default Kusina;