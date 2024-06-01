import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function KusinaNavBar() {
  return (
    <div className="flex justify-center">
      <div className="mt-10 absolute w-11/12 navbar bg-gradient-to-r from-kusinaprimary to-kusinaprimarylight rounded-full drop-shadow-xl">
        <div className="flex-1">
          <a
            className="btn btn-ghost text-xl font-bold text-white"
            href="/kusina"
          >
            Kusina
          </a>
        </div>
        <div className="flex-none">
          <Link to="/">
            <button className="btn btn-square btn-ghost">
              <FontAwesomeIcon
                icon={faRightFromBracket}
                className="text-white size-5 hover:text-kusinasecondary"
              />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default KusinaNavBar;
