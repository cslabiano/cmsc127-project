import React from "react";
import { Link } from "react-router-dom";

function KusinaButton ({link, action, onClick}) {
    return (
        <div>
            <Link to={link} onClick={(e) => {
                e.preventDefault();
                if (onClick) onClick();}}>
                <button className='px-20 rounded-full bg-gradient-to-r from-kusinaprimary to-kusinaprimarylight outline-none py-3 text-white font-medium 
                                    hover:from-kusinaprimarylight hover:to-kusinaprimary shadow-lg'
                        >
                        {action}
                </button>
            </Link>
        </div>
    )
}

export default KusinaButton;