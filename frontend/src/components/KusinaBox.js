import React from "react";

const KusinaBox = (props) => {
  const rating = Number(props.rating);
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <input
        key={i}
        type="radio"
        name={`rating-${props.id}`}
        className="mask mask-star-2 bg-kusinaprimary hover:cursor-default"
        checked={i <= rating}
        disabled
      />
    );
  }

  return (
    <>
      <div className="card w-96 shadow-xl bg-kusinasecondary text-kusinaprimary">
        <figure>
          <img src={props.image} alt={`Photo of  ${props.name}`} />
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
