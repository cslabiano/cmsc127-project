import React from "react";

const KusinaComment = (props) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <input
        key={i}
        type="radio"
        name="rating-2"
        className={`mask mask-star-2 ${
          i <= props.rating ? "bg-kusinaprimary" : "bg-kusinaprimary"
        } hover:cursor-default`}
        checked={i <= Math.floor(props.rating)}
        disabled
      />
    );
  }
  return (
    <>
      <div className="flex flex-col">
        <div className="flex items-center mb-4">
          <p className="mr-4 text-2xl font-semibold">{props.name}</p>
          <div className="rating">{stars}</div>
        </div>
        <p className="text-slate-600 text-lg">{props.comment}</p>

        <p className="mt-4 text-md font-semibold">{props.date}</p>

        <hr className="mt-10 border-kusinaprimary"></hr>
      </div>
    </>
  );
};

export default KusinaComment;
