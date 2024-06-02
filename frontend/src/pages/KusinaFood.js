import React, { useState } from "react";
import KusinaNavBar from "../components/KusinaNavBar";
import KusinaSearchBar from "../components/KusinaSearchBar";
import sort_icon from "../assets/Sort.png";
import delete_icon from "../assets/delete.png";
import edit_icon from "../assets/edit.png";

function KusinaFood() {
  const [showPopup, setShowPopup] = useState(false);
  const [sort, setSort] = useState("month");

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const stars = [];
  const rating = 4.2;
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <input
        key={i}
        type="radio"
        name="rating-2"
        className={`mask mask-star-2 ${
          i <= rating ? "bg-kusinaprimary" : "bg-kusinaprimary"
        } hover:cursor-default`}
        checked={i === Math.floor(rating)}
        disabled
      />
    );
  }

  return (
    <>
      <div className="z-10">
        <KusinaNavBar />
      </div>
      <div className="h-max bg-kusinabg font-sans">
        <img
          src="https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg"
          className="object-cover"
          style={{ width: "100%", maxHeight: "36rem" }}
        ></img>
        <div className="flex justify-between p-12">
          <div className="flex flex-col text-kusinaprimary">
            <h2 className="card-title text-5xl font-extrabold text-kusinaprimary">
              Food Item
            </h2>
            <p className="text-3xl mt-4">
              Food Establishment serving the item.
            </p>
            <p className="text-xl mt-2">A description of the food item.</p>
            <p className="text-3xl mt-4">PHP 65</p>
          </div>
          <div className="flex flex-col">
            <h2 className="card-title text-5xl font-extrabold text-kusinaprimary justify-end">
              {rating}
            </h2>
            <div className="rating rating-lg mt-4">{stars}</div>
            <div className="flex justify-end mt-4">
              <button
              // onClick={() =>
              //   document.getElementById("my_modal_1").showModal()
              // }
              >
                <img src={edit_icon} className="h-10 pl-2 pt-2"></img>
              </button>
              <button>
                <img src={delete_icon} className="h-10 pl-2 pt-2"></img>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KusinaFood;
