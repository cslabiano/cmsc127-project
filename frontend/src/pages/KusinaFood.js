import React, { useState, useEffect } from "react";
import KusinaNavBar from "../components/KusinaNavBar";
import KusinaSearchBar from "../components/KusinaSearchBar";
import sort_icon from "../assets/Sort.png";
import delete_icon from "../assets/delete.png";
import edit_icon from "../assets/edit.png";
import KusinaComment from "../components/KusinaComment";
import { useParams } from "react-router-dom";

function KusinaFood() {
  let { establishment_id, item_id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [sortReviews, setSortReviews] = useState("month");
  const [sort, setSort] = useState("month");
  const [itemClassifications, setItemClassifications] = useState([]);
  const [itemData, setItemData] = useState([]);

  const fetchItemData = () => {
    fetch(`http://localhost:3001/${establishment_id}/${item_id}`)
      .then((res) => res.json())
      .then((itemData) => setItemData(itemData))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchItemData();
  }, [])

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const toggleClassification = (classType) => {
    if (itemClassifications.includes(classType)) {
      setItemClassifications(
        itemClassifications.filter((cls) => cls !== classType)
      );
    } else {
      setItemClassifications([...itemClassifications, classType]);
    }
  };

  const stars = [];
  let rating = 0;
  if (
    itemData &&
    itemData.length > 0 &&
    itemData[0].avg_rating !== undefined
  ) {
    rating = itemData[0].avg_rating;
  }
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <input
        key={i}
        type="radio"
        name="rating-2"
        className={`mask mask-star-2 ${
          i <= rating ? "bg-kusinaprimary" : "bg-lightstar"
        } hover:cursor-default`}
        checked={i <= Math.floor(rating)}
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
              {itemData.length > 0 ? itemData[0].name : "NONE"}
            </h2>
            <p className="text-3xl mt-4 font-semibold">
              {itemData.length > 0 ? itemData[0].estab_name : "NONE"}
            </p>
            <p className="text-xl mt-2">{itemData.length > 0 ? itemData[0].description : "NONE"}</p>
            <p className="text-3xl mt-2 font-semibold">PHP {itemData.length > 0 ? itemData[0].price : "NONE"}</p>
          </div>
          <div className="flex flex-col">
            {itemData.length > 0 && (
              <>
                <h2 className="card-title text-5xl font-extrabold text-kusinaprimary justify-end">
                  {itemData[0].avg_rating? Number(itemData[0].avg_rating).toFixed(1)
                        : "0"}
                </h2>
              </>
            )}
            <div className="rating rating-lg mt-4">{stars}</div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => document.getElementById("edit_food").showModal()}
              >
                <img src={edit_icon} className="h-10 pl-2 pt-2"></img>
              </button>
              <button
                onClick={() =>
                  document.getElementById("delete_modal").showModal()
                }
              >
                <img src={delete_icon} className="h-10 pl-2 pt-2"></img>
              </button>
            </div>
          </div>
        </div>
        <div className="p-20">
          <div className="flex justify-center mt-12 text-kusinaaccent">
            <div className="flex flex-col mr-12 justify-center">
              <h2 className="card-title text-4xl font-extrabold flex justify-end">
                Rate this item:
              </h2>
              <div className="flex justify-end">
                <div className="rating rating-lg">
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-kusinaaccent"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-kusinaaccent"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-kusinaaccent"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-kusinaaccent"
                  />
                  <input
                    type="radio"
                    name="rating-8"
                    className="mask mask-star-2 bg-kusinaaccent"
                  />
                </div>
              </div>
            </div>
            <textarea
              placeholder="Add a comment here"
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <div className="flex w-56 justify-center bg-kusinaaccent text-white rounded-3xl mt-10">
              <button
                className="text-kusinabg font-semibold px-8 py-3"
                // onClick={() => document.getElementById("add_modal").showModal()}
              >
                Submit Review
              </button>
            </div>
          </div>
          <div className="Category mt-12 flex justify-center align-middle">
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSortReviews("month")}
                className={`border-2 border-kusinaaccent font-semibold rounded-full px-4 py-2 ${
                  sortReviews === "month"
                    ? "bg-kusinaaccent text-white"
                    : "bg-kusinabg text-kusinaaccent"
                }`}
              >
                Submitted the past month
              </button>
              <button
                type="button"
                onClick={() => setSortReviews("new")}
                className={`border-2 border-kusinaaccent font-semibold rounded-full px-4 py-2 ${
                  sortReviews === "new"
                    ? "bg-kusinaaccent text-white"
                    : "bg-kusinabg text-kusinaaccent"
                }`}
              >
                Newest to Oldest
              </button>

              <button
                type="button"
                onClick={() => setSortReviews("old")}
                className={`border-2 border-kusinaaccent font-semibold rounded-full px-4 py-2 ${
                  sortReviews === "old"
                    ? "bg-kusinaaccent text-white"
                    : "bg-kusinabg text-kusinaaccent"
                }`}
              >
                Oldest to Newest
              </button>
            </div>
          </div>
          <hr className="my-10 border-kusinaprimary"></hr>

          <KusinaComment
            name={"Juan Dela Cruz"}
            rating={4.2}
            comment={
              "Masarap naman, budget meal talaga siya. Medyo maliit lang serving pero ok lang kasi mura naman. May free delivery din sila pag tinatamad ka lumabas."
            }
            date={"May 20, 2021"}
          />
        </div>
        <dialog id="edit_food" className="modal">
          <div className="modal-box bg-white text-kusinaprimary">
            <h3 className="font-bold text-lg pb-5">Edit Food Item Details</h3>
            <form
              method="dialog"
              className="modal-content"
              //   onSubmit={handleSubmit}
            >
              <div className="mb-2">
                <p className="mb-2">Item Name:</p>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Item Name"
                  //   value={editData.name || ""}
                  //   onChange={handleInfoChange}
                  //   value="Food Establishment"
                  className="bg-white font-poppins shrink appearance-none h-16 pl-4 pr-4 text-base w-full max-w-screen rounded-md border mb-2"
                />
              </div>
              <div className="mb-2">
                <p className="mb-2">Item Description:</p>
                <input
                  type="text"
                  id="desc"
                  name="desc"
                  placeholder="Description"
                  //   value="Address of the food establishment"
                  className="bg-white font-poppins shrink appearance-none h-16 pl-4 pr-4 text-base w-full max-w-screen rounded-md border mb-2"
                />
              </div>
              <div className="mb-2">
                <p className="mb-2">Price:</p>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Contact"
                  //   value="09XXXXXXXXX"
                  className="bg-white font-poppins shrink appearance-none h-16 pl-4 pr-4 text-base w-full max-w-screen rounded-md border mb-2"
                />
              </div>

              <div className="mb-2">
                <p className="mb-2">Image Link:</p>
                <input
                  type="text"
                  id="link"
                  name="link"
                  placeholder="Link"
                  //   value="09XXXXXXXXX"
                  className="bg-white font-poppins shrink appearance-none h-16 pl-4 pr-4 text-base w-full max-w-screen rounded-md border mb-2"
                />
              </div>
              <div className="mb-2">
                <p className="mb-2">Classification:</p>
                <div className="flex gap-2 flex-wrap">
                  <button
                    type="button"
                    onClick={() => toggleClassification("meat")}
                    className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                      itemClassifications.includes("meat")
                        ? "bg-kusinaprimary text-white"
                        : "bg-kusinabg text-kusinaprimary"
                    }`}
                  >
                    Meat
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleClassification("vegetable")}
                    className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                      itemClassifications.includes("vegetable")
                        ? "bg-kusinaprimary text-white"
                        : "bg-kusinabg text-kusinaprimary"
                    }`}
                  >
                    Vegetable
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleClassification("dairy")}
                    className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                      itemClassifications.includes("dairy")
                        ? "bg-kusinaprimary text-white"
                        : "bg-kusinabg text-kusinaprimary"
                    }`}
                  >
                    Dairy
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleClassification("pastry")}
                    className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                      itemClassifications.includes("pastry")
                        ? "bg-kusinaprimary text-white"
                        : "bg-kusinabg text-kusinaprimary"
                    }`}
                  >
                    Pastry
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleClassification("beverage")}
                    className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                      itemClassifications.includes("beverage")
                        ? "bg-kusinaprimary text-white"
                        : "bg-kusinabg text-kusinaprimary"
                    }`}
                  >
                    Beverage
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-kusinaprimarylight hover:bg-kusinaprimary text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                  //   onClick={}
                >
                  Apply Changes
                </button>
                <button
                  type="button"
                  className="ml-4 bg-kusinabg hover:bg-kusinaprimarylight hover:text-kusinabg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                  onClick={() => document.getElementById("edit_food").close()}
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
              Are you sure you want to delete this food item, including all of
              its reviews?
            </h3>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-kusinaprimarylight hover:bg-kusinaprimary text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                //   onClick={}
              >
                I am sure.
              </button>
              <button
                type="button"
                className="ml-4 bg-kusinabg hover:bg-kusinaprimarylight hover:text-kusinabg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                onClick={() => document.getElementById("delete_modal").close()}
              >
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default KusinaFood;
