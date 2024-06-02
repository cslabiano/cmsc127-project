import React, { useState } from "react";
import KusinaNavBar from "../components/KusinaNavBar";
import KusinaSearchBar from "../components/KusinaSearchBar";
import sort_icon from "../assets/Sort.png";
import delete_icon from "../assets/delete.png";
import edit_icon from "../assets/edit.png";
import KusinaFoodBox from "../components/KusinaFoodBox";

function KusinaMenu() {
  const [showPopup, setShowPopup] = useState(false);
  const [classification, setClassification] = useState("NONE");
  const [price, setPrice] = useState("NONE");
  const [between, setBetween] = useState(false);
  const [minprice, setMinPrice] = useState(0);
  const [maxprice, setMaxPrice] = useState(0);
  const [itemClassifications, setItemClassifications] = useState([]);

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
          i <= rating ? "bg-kusinaprimary" : "bg-red-200"
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
              Food Establishment
            </h2>
            <p className="text-3xl mt-4">
              Place the address of the food establishment here.
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
              <button>
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
            checked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-10"
          >
            <div className="flex flex-col justify-center">
              <div className="flex justify-center">
                {" "}
                {/* Add this div to center the button */}
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

              <KusinaFoodBox
                name={"Food Item"}
                image={
                  "https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg"
                }
                description={"Description of the food item"}
                price={"100"}
                rating={2}
              />
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab text-xl h-10 font-semibold"
            aria-label="Reviews"
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-6"
          >
            <div className="flex justify-around">
              <div className="flex flex-col">
                <h2 className="card-title text-5xl font-extrabold text-kusinaprimary">
                  Rate us:
                </h2>
                <div className="">
                  <div className="rating rating-lg">
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-orange-400"
                      checked
                    />
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-orange-400"
                    />
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-orange-400"
                    />
                  </div>
                </div>
              </div>
            </div>
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
                  className="ml-4 bg-neutral hover:bg-grn-i hover:text-neutral text-grn-i font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
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
              //   onSubmit={handleSubmit}
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
      </div>
    </>
  );
}

export default KusinaMenu;
