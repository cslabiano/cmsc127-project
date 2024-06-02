import React from "react";

const KusinaComment = (props) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <input
        key={i}
        type="radio"
        name={`rating-${props.name}`}
        className="mask mask-star-2 bg-kusinaprimary hover:cursor-default"
        checked={i <= props.rating}
        disabled
      />
    );
  }

  // Format date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Adjust the format as needed
  };

  return (
    <>
      <div className="mt-10 flex flex-col">
        <div className="flex items-center mb-4">
          <p className="mr-4 text-2xl text-kusinaprimary font-semibold">
            {props.name}
          </p>
          <div className="rating">{stars}</div>
        </div>
        <p className="text-slate-600 text-lg">{props.comment}</p>

        <p className="mt-4 text-md text-kusinaprimary font-semibold">
          {formatDate(props.date)}, {props.time}
        </p>

        <hr className="mt-10 border-kusinaprimary"></hr>
      </div>
    </>
  );
};

export default KusinaComment;
