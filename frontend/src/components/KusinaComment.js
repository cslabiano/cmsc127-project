import React, { useState } from "react";
import edit_icon from "../assets/edit.png";
import delete_icon from "../assets/delete.png";

const KusinaComment = (props) => {
  const [estRating, setEstRating] = useState(0);
  const user_id = localStorage.getItem("user_id");

  console.log("user_id:", user_id);
  console.log("props.userid:", props.userid);

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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const handleEditClick = () => {
    if (user_id === props.userid) {
      document.getElementById("edit_comment_modal").showModal();
    } else {
      document.getElementById("unauthorized_modal").showModal();
    }
  };

  const handleDeleteClick = () => {
    if (user_id - props.userid === 0) {
      const comm = props.comment;
      console.log("Comment to delete:", comm);
      document.getElementById("delete_modal").showModal();
      // Add a listener for the delete button to call handleDeleteComment
      document.getElementById("confirm_delete_button").onclick = () => {
        handleDeleteComment(comm);
        if (props.onCommentDelete) {
          props.onCommentDelete(); // Call the callback function
        }
      };
    } else {
      document.getElementById("unauthorized_modal").showModal();
    }
  };

  const handleDeleteComment = (comm) => {
    console.log("Deleting comment:", comm);
    document.getElementById("delete_modal").close();
    const requestOptions = {
      method: "POST", // Changed from DELETE to POST
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: comm }),
    };

    if (props.estab === true) {
      fetch(
        `http://localhost:3001/deleteEstabReview/${user_id}/${props.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(() => {
          if (props.onCommentDelete) {
            props.onCommentDelete(); // Call the callback function after deletion
          }
        });
    } else {
      fetch(
        `http://localhost:3001/deleteItemReview/${user_id}/${props.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(() => {
          if (props.onCommentDelete) {
            props.onCommentDelete(); // Call the callback function after deletion
          }
        });
    }
  };

  return (
    <>
      <div className="mt-10 flex justify-between">
        <div className="flex flex-col">
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
        </div>
        <div className="flex flex-col items-end justify-start">
          <button className="mb-2" onClick={handleEditClick}>
            <img src={edit_icon} className="h-10" alt="Edit" />
          </button>
          <button onClick={handleDeleteClick}>
            <img src={delete_icon} className="h-10" alt="Delete" />
          </button>
        </div>
      </div>
      <hr className="mt-10 border-kusinaprimary" />

      <dialog id="edit_comment_modal" className="modal">
        <div className="modal-box bg-white text-kusinaprimary">
          <h3 className="font-bold text-lg pb-5">Edit Comment</h3>
          <form method="dialog" className="modal-content">
            <div className="mb-2">
              <p className="mb-2">New Rating:</p>
              <div className="rating rating-lg mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-kusinaprimary"
                    onClick={() => setEstRating(i)}
                  />
                ))}
              </div>
            </div>
            <div className="mb-2">
              <p className="mb-2">New Comment:</p>
              <textarea
                placeholder="Type your comment here"
                className="mb-4 textarea textarea-bordered textarea-lg w-full"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-kusinaprimarylight hover:bg-kusinaprimary text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
              >
                Apply Changes
              </button>
              <button
                type="button"
                className="ml-4 bg-kusinabg hover:bg-kusinaprimarylight hover:text-kusinabg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                onClick={() =>
                  document.getElementById("edit_comment_modal").close()
                }
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <dialog id="delete_modal" className="modal">
        <div className="modal-box bg-white text-kusinaprimary">
          <h3 className="font-bold text-lg pb-5">
            Are you sure you want to delete this comment?
          </h3>
          <div className="flex justify-end">
            <button
              id="confirm_delete_button"
              type="button"
              className="bg-kusinaprimarylight hover:bg-kusinaprimary text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
            >
              I am sure.
            </button>
            <button
              type="button"
              className="ml-4 bg-kusinabg hover:bg-              kusinaprimarylight hover:text-kusinabg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
              onClick={() => document.getElementById("delete_modal").close()}
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>

      <dialog id="unauthorized_modal" className="modal">
        <div className="modal-box bg-white text-kusinaprimary">
          <h3 className="font-bold text-lg pb-5">Unauthorized</h3>
          <p>You cannot edit/delete a comment that wasn't written by you.</p>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              className="bg-kusinabg hover:bg-kusinaprimarylight hover:text-kusinabg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
              onClick={() =>
                document.getElementById("unauthorized_modal").close()
              }
            >
              Cancel
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default KusinaComment;
