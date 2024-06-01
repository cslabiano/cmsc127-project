import React from "react";

function KusinaButton ({action, onClick}) {
    return (
        <div>
                <button className='px-20 rounded-full bg-gradient-to-r from-kusinaprimary to-kusinaprimarylight outline-none py-3 text-white font-medium 
                                    hover:from-kusinaprimarylight hover:to-kusinaprimary shadow-lg'
                        onClick={(e) => {e.preventDefault(); if (onClick) onClick();}}         
                        >
                        {action}
                </button>
        </div>
    )
}

export default KusinaButton;