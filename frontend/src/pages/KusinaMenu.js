import React, { useState, useEffect } from "react";
import KusinaNavBar from "../components/KusinaNavBar";
import KusinaSearchBar from "../components/KusinaSearchBar";
import sort_icon from "../assets/Sort.png";
import delete_icon from "../assets/delete.png";
import edit_icon from "../assets/edit.png";
import KusinaFoodBox from "../components/KusinaFoodBox";
import KusinaComment from "../components/KusinaComment";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import KusinaSkeleton from "../components/KusinaSkeleton";

function KusinaMenu() {
  const user_id = localStorage.getItem("user_id");
  let { establishment_id } = useParams();
  let { search_term } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [classification, setClassification] = useState("NONE");
  const [price, setPrice] = useState("NONE");
  const [sortPrice, setSortPrice] = useState([]);
  const [between, setBetween] = useState(false);
  const [estRating, setEstRating] = useState(5);
  const [minprice, setMinPrice] = useState(0);
  const [maxprice, setMaxPrice] = useState(0);
  const [itemClassifications, setItemClassifications] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [sortReviews, setSortReviews] = useState("month");
  const [activeTab, setActiveTab] = useState("food");
  const [estabData, setEstabData] = useState([]);
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [reviewData, setReviewData] = useState([]);
  const [estReview, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [contactNumbers, setContactNumbers] = useState([""]);
  const [iclass, setIclass] = useState("");

  // const itemsToShow =
  //   searchTerm !== "" && searchData.length > 0 ? searchData : data;

  const fetchItemData = () => {
    let endpoint;

    if (price === "NONE") {
      endpoint = `http://localhost:3001/${establishment_id}`;
    } else {
      const sortOrder = price;
      endpoint = `http://localhost:3001/${establishment_id}/itemsort?sort=${sortOrder}`;
    }

    if (iclass !== "" || minprice && maxprice ) {
      endpoint = `http://localhost:3001/${establishment_id}/filterClass?classification=${iclass}&min=${minprice}&max=${maxprice}`;
    }

    fetch(endpoint)
      .then((res) => res.json())
      .then((foodItems) => {
        setFoodItems(foodItems);
        console.log("Item Data:", foodItems);
      })
      .catch((error) => console.error("Error fetching food items:", error));
  };

  const fetchEstabData = () => {
    fetch(`http://localhost:3001/${establishment_id}/estab`)
      .then((res) => res.json())
      .then((estabData) => setEstabData(estabData))
      .catch((err) => console.log(err));
  };

  // useEffect(() => {
  //   fetchItemData();
  //   fetchEstabData();
  // }, []);

  const handleInputChange = (event) => {
    setIclass(event.target.value);
  };

  const fetchFilteredItems = () => {
    const classificationQuery = itemClassifications
      .map((cls) => `'${cls}'`)
      .join(",");
    // const classificationsArray = classificationQuery.split(',');
    // const placeholders = classificationsArray.map(() => '?').join(',');
    console.log(classificationQuery);
    console.log("Before query: ", foodItems);
    fetch(
      `http://localhost:3001/${establishment_id}/filterClass?classification=${classificationQuery}`
    )
      .then((res) => res.json())
      .then((foodItems) => {
        console.log("Filter food items: ", foodItems);
        setFoodItems(foodItems);
      })
      .catch((error) =>
        console.error("Error fetching filtered food items:", error)
      );
  };

  const fetchSortedData = (orderQuery) => {
    // console.log("Price: ", price)
    console.log("OrderQuery: ", orderQuery);

    if (orderQuery === "none") {
      setSortPrice([]); // Reset to no sorting
      fetchItemData();
      setIsLoading(false);
      return;
    }

    const order = orderQuery === "asc" ? "ASC" : "DESC";
    console.log("Order: ", order);

    fetch(`http://localhost:3001/${establishment_id}/sortprice?order=${order}`)
      .then((res) => res.json())
      .then((sortPrice) => {
        console.log("Sorted Price: ", sortPrice);
        setSortPrice(Array.isArray(sortPrice) ? sortPrice : []);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  };

  const fetchReviewData = () => {
    let endpoint;
    if (sortReviews === "month") {
      endpoint = `http://localhost:3001/${establishment_id}/estmonthreviews`;
    } else {
      const sort = sortReviews;
      endpoint = `http://localhost:3001/${establishment_id}/estreviews?sort=${sort}`;
    }

    fetch(endpoint)
      .then((res) => res.json())
      .then((reviewData) => {
        console.log("Review Data:", reviewData);
        setReviewData(reviewData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchEstabData();
    if (itemClassifications.length > 0) {
      fetchFilteredItems();
    } else {
      fetchItemData();
    }
    // fetchFilteredItems();
    fetchReviewData();
  }, [itemClassifications]);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const stars = [];
  let rating = 0;
  if (
    estabData &&
    estabData.length > 0 &&
    estabData[0].avg_rating !== undefined
  ) {
    rating = estabData[0].avg_rating;
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

  const toggleClassification = (classType) => {
    setItemClassifications((prevClassifications) => {
      if (prevClassifications.includes(classType)) {
        return prevClassifications.filter((cls) => cls !== classType);
      } else {
        return [...prevClassifications, classType];
      }
    });
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
        estab_id: establishment_id,
        classifications: itemClassifications,
        image_link: event.target.link.value,
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

  const handleDeleteEstablishment = () => {
    fetch(`http://localhost:3001/deleteEstablishment/${establishment_id}`, {
      method: "POST",
    })
      .then((res) => {
        if (res.ok) {
          navigate("/kusina");
        } else {
          return res.json().then((error) => {
            throw new Error(error.error);
          });
        }
      })
      .catch((error) => {
        console.error("Error deleting establishment:", error);
      });
  };

  const handleChangeEstReview = (event) => {
    setComment(event.target.value);
  };

  // function to handle adding a new food item
  const handleAddEstReview = (event) => {
    fetch(`http://localhost:3001/${establishment_id}/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        user_id: user_id,
        estab_id: establishment_id,
        rating: estRating,
        comment: estReview,
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
        fetchReviewData();
        navigate(`/kusina/${establishment_id}`);
      });
  };

  const handleAddContactField = () => {
    setContactNumbers([...contactNumbers, ""]);
  };

  const handleContactChange = (index, value) => {
    const newContacts = [...contactNumbers];
    newContacts[index] = value;
    setContactNumbers(newContacts);
  };

  const handleUpdateEstab = (e) => {
    e.preventDefault();

    const estabName = e.target.name.value;
    const address = e.target.address.value;
    const imageLink = e.target.link.value;

    const updatedEstab = {
      estab_name: estabName,
      address: address,
      image_link: imageLink,
      contacts: contactNumbers,
    };

    fetch(`http://localhost:3001/${establishment_id}/updateestab`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedEstab),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          console.error("Error updating item:", data.error);
        } else {
          console.log("Item updated successfully:", data);
          window.location.reload();
        }
      })
      .catch((error) => console.error("Network error:", error));
  };

  const handleArrowClick = () => {
    setSearchData([]);
  };

  const handleSearch = () => {
    fetch(`http://localhost:3001/${establishment_id}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: searchTerm }),
    })
      .then((res) => res.json())
      .then((searchData) => {
        console.log("Search data: ", searchData);
        setSearchData(Array.isArray(searchData) ? searchData : []);
      })
      .catch((err) => console.log(err));
  };

  const handleSortPrice = (order) => {
    console.log("handleSortPrice: ", order);

    setPrice((prevPrice) => {
      let newPrice;
      if (order === "asc") {
        newPrice = prevPrice === "low" ? "NONE" : "low";
      } else {
        newPrice = prevPrice === "high" ? "NONE" : "high";
      }
      setIsLoading(true);
      fetchSortedData(
        newPrice === "low" ? "asc" : newPrice === "high" ? "desc" : "none"
      );
      return newPrice;
    });
  };

  const foodToShow =
    searchTerm !== "" && searchData.length > 0 ? (
      searchData
    ) : isLoading ? (
      <KusinaSkeleton />
    ) : sortPrice.length > 0 ? (
      sortPrice
    ) : (
      foodItems
    );
  // const foodToShow = foodItems;

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
          {estabData.length > 0 && (
            <>
              <div className="flex flex-col text-kusinaprimary">
                <h2 className="card-title text-5xl font-extrabold text-kusinaprimary">
                  {estabData[0].estab_name}
                </h2>
                <p className="text-3xl mt-4">{estabData[0].address}</p>
                <p className="text-xl mt-2">
                  Contact Number: {estabData[0].contact}
                </p>
              </div>
            </>
          )}

          <div className="flex flex-col">
            {estabData.length > 0 && (
              <>
                <h2 className="card-title text-5xl font-extrabold text-kusinaprimary justify-end">
                  {estabData[0].avg_rating
                    ? Number(estabData[0].avg_rating).toFixed(1)
                    : "0"}
                </h2>
                <div className="rating rating-lg mt-4">{stars}</div>
              </>
            )}

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
                  document.getElementById("delete_est_modal").showModal()
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
              <div className="py-10 flex justify-center items-center">
                <KusinaSearchBar
                  placeholder="Search for a food item..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onSearch={handleSearch}
                />
                {searchData.length > 0 && (
                  <button
                    className="btn btn-square btn-ghost"
                    onClick={handleArrowClick}
                  >
                    <FontAwesomeIcon
                      icon={faArrowLeft}
                      className="text-kusinaprimary hover:text-kusinaprimarylight size-7"
                    />
                  </button>
                )}
              </div>
              <button onClick={togglePopup}>
                <div className="flex">
                  <p className="py-2 font-semibold">Sort Food Items by</p>
                  <img src={sort_icon} className="h-8 pl-2 pt-2"></img>
                </div>
              </button>
              {showPopup && (
                <div className="popup flex justify-between flex-wrap animate-transitionIn">
                  <div className="mt-8 flex align-middle">
                    <p className="px-4 py-2 text-grn-i font-bold">Price:</p>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={() => {
                          setPrice(price === "asc" ? "NONE" : "asc");
                          fetchItemData();
                        }}
                        className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                          price === "asc"
                            ? "bg-kusinaprimary text-white"
                            : "bg-kusinabg text-kusinaprimary"
                        }`}
                      >
                        Descending
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setPrice(price === "desc" ? "NONE" : "desc");
                          fetchItemData();
                        }}
                        className={`border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 ${
                          price === "desc"
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

                  <div className="mt-8 flex align-middle">
                    <p className="px-4 py-2 text-grn-i font-bold">Category:</p>
                    <input
                      type="text"
                      placeholder="'meat', 'vegetable'"
                      className="input w-full max-w-xs"
                      value={iclass}
                      onChange={handleInputChange}
                    />
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
                      onClick={() => {
                        setPrice("NONE");
                        fetchItemData();
                      }}
                      className={`bg-kusinaprimary border-2 border-kusinaprimary font-semibold rounded-full px-4 py-2 bg-grn-i text-white`}
                    >
                      Apply filter
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-center mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isLoading && <KusinaSkeleton />}
                  {!isLoading &&
                    foodToShow.map((item) => (
                      <div key={item.id}>
                        <KusinaFoodBox
                          name={item.name}
                          item_id={item.item_id}
                          estab_id={item.estab_id}
                          description={item.description}
                          price={item.price}
                          image={item.image_link}
                          classifications={item.classifications}
                          rating={
                            item.avg_rating
                              ? Number(item.avg_rating).toFixed(1)
                              : "0"
                          }
                        />
                      </div>
                    ))}
                </div>
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
                      onClick={() => setEstRating(1)}
                    />
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-kusinaaccent"
                      onClick={() => setEstRating(2)}
                    />
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-kusinaaccent"
                      onClick={() => setEstRating(3)}
                    />
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-kusinaaccent"
                      onClick={() => setEstRating(4)}
                    />
                    <input
                      type="radio"
                      name="rating-8"
                      className="mask mask-star-2 bg-kusinaaccent"
                      onClick={() => setEstRating(5)}
                    />
                  </div>
                </div>
              </div>
              <textarea
                placeholder="Add a comment here"
                value={estReview}
                onChange={handleChangeEstReview}
                className="textarea textarea-bordered textarea-lg w-full max-w-xs"
              ></textarea>
            </div>
            <div className="flex justify-center">
              <div className="flex w-56 justify-center bg-kusinaaccent text-white rounded-3xl mt-10">
                <button
                  className="text-kusinabg font-semibold px-8 py-3"
                  onClick={handleAddEstReview}
                >
                  Submit Review
                </button>
              </div>
            </div>
            <div className="Category mt-12 flex justify-center align-middle">
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => {
                    console.log("Filtering by month");
                    setSortReviews("month");
                    fetchReviewData(); // Call fetchReviewData after setting the sort state
                  }}
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
                  onClick={() => {
                    console.log("Filtering by month");
                    setSortReviews("asc");
                    fetchReviewData(); // Call fetchReviewData after setting the sort state
                  }}
                  className={`border-2 border-kusinaaccent font-semibold rounded-full px-4 py-2 ${
                    sortReviews === "asc"
                      ? "bg-kusinaaccent text-white"
                      : "bg-kusinabg text-kusinaaccent"
                  }`}
                >
                  Newest to Oldest
                </button>

                <button
                  type="button"
                  onClick={() => {
                    console.log("Filtering by month");
                    setSortReviews("desc");
                    fetchReviewData(); // Call fetchReviewData after setting the sort state
                  }}
                  className={`border-2 border-kusinaaccent font-semibold rounded-full px-4 py-2 ${
                    sortReviews === "desc"
                      ? "bg-kusinaaccent text-white"
                      : "bg-kusinabg text-kusinaaccent"
                  }`}
                >
                  Oldest to Newest
                </button>
              </div>
            </div>

            <hr className="mt-10 border-kusinaprimary"></hr>

            <div className="">
              <div className="">
                {reviewData.map((review) => (
                  <div key={review.id}>
                    <KusinaComment
                      userid={review.user_id}
                      name={review.user_name}
                      rating={review.rating}
                      comment={review.comment}
                      date={review.date}
                      time={review.time}
                      id={establishment_id}
                      estab={true}
                      onCommentDelete={fetchReviewData}
                    />
                  </div>
                ))}
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
              onSubmit={handleUpdateEstab}
            >
              <div className="mb-2">
                <p className="mb-2">Name:</p>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Name"
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
                  className="bg-white font-poppins shrink appearance-none h-16 pl-4 pr-4 text-base w-full max-w-screen rounded-md border mb-2"
                />
              </div>
              <div className="mb-2">
                <p className="mb-2">Contact Numbers:</p>
                {contactNumbers.map((contact, index) => (
                  <input
                    key={index}
                    type="text"
                    value={contact}
                    onChange={(e) => handleContactChange(index, e.target.value)}
                    placeholder={`Contact Number ${index + 1}`}
                    className="bg-white font-poppins shrink appearance-none h-16 pl-4 pr-4 text-base w-full max-w-screen rounded-md border mb-2"
                  />
                ))}
              </div>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleAddContactField}
                  className="flex justify-end items-end text-kusinaprimary py-2 underline rounded-3xl focus:outline-none focus:shadow-outline"
                >
                  <p>Add Another Contact Number</p>
                </button>
              </div>
              <div className="mb-2">
                <p className="mb-2">Image Link:</p>
                <input
                  type="text"
                  id="link"
                  name="link"
                  placeholder="Link"
                  className="bg-white font-poppins shrink appearance-none h-16 pl-4 pr-4 text-base w-full max-w-screen rounded-md border mb-2"
                />
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

        <dialog id="delete_est_modal" className="modal">
          <div className="modal-box bg-white text-kusinaprimary">
            <h3 className="font-bold text-lg pb-5">
              Are you sure you want to delete this establishment, including all
              of its items and reviews?
            </h3>
            <div className="flex justify-end">
              <button
                id="confirm_delete_button"
                type="button"
                className="bg-kusinaprimarylight hover:bg-kusinaprimary text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                onClick={handleDeleteEstablishment}
              >
                I am sure.
              </button>
              <button
                type="button"
                className="ml-4 bg-kusinabg hover:bg-              kusinaprimarylight hover:text-kusinabg font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                onClick={() =>
                  document.getElementById("delete_est_modal").close()
                }
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
