import React, { useState, useEffect } from "react";
import KusinaNavBar from "../components/KusinaNavBar";
import KusinaSearchBar from "../components/KusinaSearchBar";
import sort_icon from "../assets/Sort.png";
import delete_icon from "../assets/delete.png";
import edit_icon from "../assets/edit.png";
import KusinaFoodBox from "../components/KusinaFoodBox";
import KusinaComment from "../components/KusinaComment";
import { useNavigate, useParams } from "react-router-dom";

function KusinaMenu(props) {
  let { establishment_id } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [classification, setClassification] = useState("NONE");
  const [price, setPrice] = useState("NONE");
  const [between, setBetween] = useState(false);
  const [minprice, setMinPrice] = useState(0);
  const [maxprice, setMaxPrice] = useState(0);
  const [itemClassifications, setItemClassifications] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortReviews, setSortReviews] = useState("month");
  const [activeTab, setActiveTab] = useState("food");
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3001/${establishment_id}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching food items:", error));
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const stars = [];
  const rating = 4.5;
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

  const toggleClassification = (classType) => {
    if (itemClassifications.includes(classType)) {
      setItemClassifications(
        itemClassifications.filter((cls) => cls !== classType)
      );
    } else {
      setItemClassifications([...itemClassifications, classType]);
    }
  };

  // function to handle adding a new food item
  const handleAddFoodItem = (event) => {
    document.getElementById("add_modal").close();

    fetch("http://localhost:3001/item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        price: event.target.price.value,
        name: event.target.name.value,
        description: event.target.desc.value,
        estab_id: 1,
        classifications: itemClassifications,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((error) => {
            throw new Error(error.error);
          });
        }
      })
      .then(() => {
        navigate("/kusina");
      });
  };

  // function to handle deleting a food item
  const handleDeleteFoodItem = (id) => {
    setFoodItems(foodItems.filter((item) => item.id !== id));
  };

  // function to handle updating a food item
  const handleUpdateFoodItem = (event) => {
    event.preventDefault();
    const updatedItem = {
      ...editItem,
      name: event.target.name.value,
      description: event.target.desc.value,
      price: event.target.price.value,
    };
    setFoodItems(
      foodItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
    setEditItem(null);
    document.getElementById("edit_modal").close();
  };

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
              {data.length > 0
                ? data[0].establishmentName
                : "Establishment Name"}
            </h2>
            <p className="text-3xl mt-4">
              {data.length > 0
                ? data[0].establishmentAddress
                : "Establishment Name"}
            </p>
            <p className="text-xl mt-2">Contact Number: 09XXXXXXXXX</p>
          </div>
          <div className="flex flex-col">
            <h2 className="card-title text-5xl font-extrabold text-kusinaprimary justify-end">
              4.5
            </h2>
            <div className="rating rating-lg mt-4">{stars}</div>
            <div className="flex justify-end mt-4">
              <button
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
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

        <div
          role="tablist"
          className="tabs tabs-lifted m-10 text-kusinaprimary"
        >
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab text-xl h-10 w-full font-semibold"
            aria-label="Foods"
            checked={activeTab === "food"}
            onClick={() => setActiveTab("food")}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-10"
          >
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                {" "}
                <div className="flex w-56 justify-center bg-kusinaprimary text-white rounded-3xl mt-10">
                  <button
                    className="text-kusinabg font-semibold px-8 py-3"
                    onClick={() =>
                      document.getElementById("add_modal").showModal()
                    }
                  >
                    Add a Food Item
                  </button>
                </div>
              </div>
              <p className="pt-10 text-center">or</p>
              <div className="py-10 flex justify-center">
                <KusinaSearchBar placeholder="Search for a food item..." />
              </div>
              <button onClick={togglePopup}>
                <div className="flex">
                  <p className="py-2 font-semibold">Sort Food Items by</p>
                  <img src={sort_icon} className="h-8 pl-2 pt-2"></img>
                </div>
              </button>
              {showPopup && (
                <div className="popup flex justify-between flex-wrap animate-transitionIn">
                  <div className="Category mt-8 flex align-middle">
                    <p className="px-4 py-2 text-grn-i font-bold">
                      Classification:
                    </p>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() =>
                          setClassification(
                            classification === "meat" ? "NONE" : "meat"
                          )
                        }
                        className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                          classification === "meat"
                            ? "bg-kusinaprimary text-white"
                            : "bg-kusinabg text-kusinaprimary"
                        }`}
                      >
                        Meat
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setClassification(
                            classification === "vegetable"
                              ? "NONE"
                              : "vegetable"
                          )
                        }
                        className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                          classification === "vegetable"
                            ? "bg-kusinaprimary text-white"
                            : "bg-kusinabg text-kusinaprimary"
                        }`}
                      >
                        Vegetable
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setClassification(
                            classification === "dairy" ? "NONE" : "dairy"
                          )
                        }
                        className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                          classification === "dairy"
                            ? "bg-kusinaprimary text-white"
                            : "bg-kusinabg text-kusinaprimary"
                        }`}
                      >
                        Dairy
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setClassification(
                            classification === "pastry" ? "NONE" : "pastry"
                          )
                        }
                        className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                          classification === "pastry"
                            ? "bg-kusinaprimary text-white"
                            : "bg-kusinabg text-kusinaprimary"
                        }`}
                      >
                        Pastry
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setClassification(
                            classification === "beverage" ? "NONE" : "beverage"
                          )
                        }
                        className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                          classification === "beverage"
                            ? "bg-kusinaprimary text-white"
                            : "bg-kusinabg text-kusinaprimary"
                        }`}
                      >
                        Beverage
                      </button>
                    </div>
                  </div>

                  <div className="mt-8 flex align-middle">
                    <p className="px-4 py-2 text-grn-i font-bold">Price:</p>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() =>
                          setPrice(price === "high" ? "NONE" : "high")
                        }
                        className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                          price === "high"
                            ? "bg-kusinaprimary text-white"
                            : "bg-kusinabg text-kusinaprimary"
                        }`}
                      >
                        Descending
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setPrice(price === "low" ? "NONE" : "low")
                        }
                        className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                          price === "low"
                            ? "bg-kusinaprimary text-white"
                            : "bg-kusinabg text-kusinaprimary"
                        }`}
                      >
                        Ascending
                      </button>

                      <button
                        type="button"
                        onClick={() => setBetween(!between)}
                        className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                          between
                            ? "bg-kusinaprimary text-white"
                            : "bg-kusinabg text-kusinaprimary"
                        }`}
                      >
                        Between...
                      </button>
                    </div>
                  </div>

                  {between && (
                    <div className="mt-8 flex align-middle">
                      <p className="px-4 py-2 text-grn-i font-bold">
                        Min Price:
                      </p>
                      <input
                        type="number"
                        value={minprice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 bg-kusinabg text-kusinaprimary"
                      />
                      <p className="px-4 py-2 text-grn-i font-bold">
                        Max Price:
                      </p>
                      <input
                        type="number"
                        value={maxprice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 bg-kusinabg text-kusinaprimary"
                      />
                    </div>
                  )}

                  <div className="sortbutton mt-8">
                    <button
                      type="button"
                      //   onClick={() => }
                      className={`bg-kusinaprimary border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 bg-grn-i text-white`}
                    >
                      Apply changes
                    </button>
                  </div>
                </div>
              )}
              <div>
                {data.map((item) => (
                  <div key={item.id}>
                    <KusinaFoodBox
                      name={item.name}
                      description={item.description}
                      price={item.price}
                      rating={2} // TODO: make this dynamic
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab text-xl h-10 font-semibold"
            aria-label="Reviews"
            checked={activeTab === "reviews"}
            onClick={() => setActiveTab("reviews")}
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-12"
          >
            <div className="flex justify-center mt-12 text-kusinaaccent">
              <div className="flex flex-col mr-12 justify-center">
                <h2 className="card-title text-4xl font-extrabold flex justify-end">
                  Rate us:
                </h2>
                <div className="">
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
                  onClick={() =>
                    document.getElementById("add_modal").showModal()
                  }
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
            />
          </div>
        </div>
        <dialog id="my_modal_1" className="modal">
          <div className="modal-box bg-white text-kusinaprimary">
            <h3 className="font-bold text-lg pb-5">
              Edit Establishment Details
            </h3>
            <form
              method="dialog"
              className="modal-content"
              //   onSubmit={handleSubmit}
            >
              <div className="mb-2">
                <p className="mb-2">Name:</p>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
                  //   value={editData.name || ""}
                  //   onChange={handleInfoChange}
                  //   value="Food Establishment"
                  className="bg-white font-poppins shrink appearance-none h-16 pl-4 pr-4 text-base w-full max-w-screen rounded-md border mb-2"
                />
              </div>
              <div className="mb-2">
                <p className="mb-2">Address:</p>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  //   value="Address of the food establishment"
                  className="bg-white font-poppins shrink appearance-none h-16 pl-4 pr-4 text-base w-full max-w-screen rounded-md border mb-2"
                />
              </div>
              <div className="mb-2">
                <p className="mb-2">Contact No:</p>
                <input
                  type="text"
                  id="contact"
                  name="contact"
                  placeholder="Contact"
                  //   value="09XXXXXXXXX"
                  className="bg-white font-poppins shrink appearance-none h-16 pl-4 pr-4 text-base w-full max-w-screen rounded-md border mb-2"
                />
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
                  onClick={() => document.getElementById("my_modal_1").close()}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>

        <dialog id="add_modal" className="modal">
          <div className="modal-box bg-white text-kusinaprimary">
            <h3 className="font-bold text-lg pb-5">Add Food Item</h3>
            <form
              method="dialog"
              className="modal-content"
              onSubmit={handleAddFoodItem}
            >
              <div className="mb-2">
                <p className="mb-2">Food Item Name:</p>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Item Name"
                  //   value={editData.name || ""}
                  //   onChange={handleInfoChange}
                  className="bg-white font-poppins shrink appearance-none h-16 pl-4 pr-4 text-base w-full max-w-screen rounded-md border mb-2"
                />
              </div>
              <div className="mb-2">
                <p className="mb-2">Description:</p>
                <input
                  type="text"
                  id="desc"
                  name="desc"
                  placeholder="Description"
                  //   value={editData.name || ""}
                  //   onChange={handleInfoChange}
                  className="bg-white font-poppins shrink appearance-none h-16 pl-4 pr-4 text-base w-full max-w-screen rounded-md border mb-2"
                />
              </div>
              <div className="mb-2">
                <p className="mb-2">Price:</p>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="0"
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
                  Add food item
                </button>
                <button
                  type="button"
                  className="ml-4 bg-kusinabg hover:bg-kusinaprimarylight hover:text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                  onClick={() => document.getElementById("add_modal").close()}
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
              Are you sure you want to delete this establishment, including all
              of its food items and reviews?
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

export default KusinaMenu;
