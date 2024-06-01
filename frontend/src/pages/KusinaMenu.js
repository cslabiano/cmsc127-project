import React, { useState } from "react";
import KusinaNavBar from "../components/KusinaNavBar";
import KusinaSearchBar from "../components/KusinaSearchBar";
import sort_icon from "../assets/Sort.png";
import KusinaFoodBox from "../components/KusinaFoodBox";

function KusinaMenu() {
  const [showPopup, setShowPopup] = useState(false);
  const [showPricePopup, setShowPricePopup] = useState(false);
  const [classification, setClassification] = useState("NONE");
  const [price, setPrice] = useState("NONE");
  const [between, setBetween] = useState(false);
  const [minprice, setMinPrice] = useState(0);
  const [maxprice, setMaxPrice] = useState(0);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <input
        key={i}
        type="radio"
        name="rating-2"
        className="mask mask-star-2 bg-kusinaprimary hover:cursor-default"
        checked={i === Math.round(4)}
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
                <div className="popup flex justify-around flex-wrap animate-transitionIn">
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
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-kusinaprimary mb-4">
                Reviews
              </h3>
              <div className="review mb-4">
                <div className="flex items-center mb-2">
                  <h4 className="text-xl font-semibold text-kusinaprimary">
                    John Doe
                  </h4>
                  <div className="flex ml-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`rating-${star}`}
                        className="mask mask-star-2 bg-kusinaprimary hover:cursor-default"
                        checked={star <= 4} // Assume the rating is 4
                        disabled
                      />
                    ))}
                  </div>
                </div>
                <p className="text-md text-kusinaprimary">
                  Great food and excellent service. Highly recommend!
                </p>
              </div>
              <div className="review mb-4">
                <div className="flex items-center mb-2">
                  <h4 className="text-xl font-semibold text-kusinaprimary">
                    Jane Smith
                  </h4>
                  <div className="flex ml-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <input
                        key={star}
                        type="radio"
                        name={`rating-${star}`}
                        className="mask mask-star-2 bg-kusinaprimary hover:cursor-default"
                        checked={star <= 5} // Assume the rating is 5
                        disabled
                      />
                    ))}
                  </div>
                </div>
                <p className="text-md text-kusinaprimary">
                  Absolutely loved the ambiance and the food quality.
                </p>
              </div>
              {/* Add more reviews as needed */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default KusinaMenu;
