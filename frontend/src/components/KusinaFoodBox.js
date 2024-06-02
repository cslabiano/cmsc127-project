import React from "react";
import { useNavigate } from "react-router-dom";

const KusinaFoodBox = (props) => {
  const navigate = useNavigate();
  const stars = [];
  const rating = Number(props.rating)
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <input
        key={i}
        type="radio"
        name={`rating-${props.name}`}
        className="mask mask-star-2 bg-kusinaprimary hover:cursor-default"
        checked={i <= rating}
        disabled
      />
    );
  }

  let renderClassifications = null;
  if (Array.isArray(props.classifications)) {
    renderClassifications = props.classifications.map(
      (classification, index) => (
        <div key={index} className="badge badge-outline">
          {classification}
        </div>
      )
    );
  }

  const handleClick = () => {
    navigate(`/kusina/${props.estab_id}/${props.id}`);
  };

  return (
    <div
      className="card w-96 shadow-xl bg-kusinasecondary text-kusinaprimary"
      onClick={handleClick}
    >
      <figure>
        <img src={props.image} alt={`Photo of ${props.name}`} />
      </figure>
      <div className="card-body font-sans">
        <h2 className="card-title font-sans text-xl font-extrabold">
          {props.name}
        </h2>
        <p>{props.description}</p>
        <h2 className="card-title font-sans text-xl font-extrabold">
          PHP {props.price}
        </h2>
        <div className="card-actions justify-start">
          {renderClassifications}
        </div>
        <div className="flex justify-between">
          <h2 className="card-title text-xl font-extrabold">{props.rating}</h2>
          <div>
            <div className="rating">{stars}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KusinaFoodBox;
