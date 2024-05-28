import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function KusinaSearchBar ({placeholder}) {
    return (
        <div className='relative flex'>
            <div className="absolute inset-y-0 left-0 pl-10 flex items-center pointer-events-none z-10">
                <FontAwesomeIcon icon={faSearch} className="text-kusinaaccentlight size-6" />
            </div>
            <input type="text" 
                    placeholder={placeholder}
                    className="px-24 py-4 bg-kusinaaccent placeholder-kusinaaccentlight rounded-2xl placeholder-text-lg font-medium text-white text-3xl shadow-inner-custom drop-shadow-lg" />
        </div>
    )
}

export default KusinaSearchBar;