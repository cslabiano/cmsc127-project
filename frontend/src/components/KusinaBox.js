import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

const KusinaBox = (props) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <input
        key={i}
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-kusinaprimary"
        checked={i === Math.round(props.rating)}
        disabled
      />
    );
  }

  return (
    <>
      <div className="card w-96 shadow-xl bg-kusinasecondary text-kusinaprimary scale-75">
        <figure>
          <img
            src="https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg"
            alt={`Photo of  ${props.name}`}
          />
        </figure>
        <div className="card-body font-sans">
          <h2 className="card-title font-sans text-xl font-extrabold">
            {props.name}
          </h2>
          <p>{props.address}</p>
          <div className="flex justify-between">
            <h2 className="card-title text-xl font-extrabold">
              {props.rating}
            </h2>
            <div>
              <div className="rating">{stars}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KusinaBox;
