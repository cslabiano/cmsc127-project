import React, { useState, useEffect } from "react";
import KusinaNavBar from "../components/KusinaNavBar";
import KusinaSearchBar from "../components/KusinaSearchBar";
import KusinaBox from "../components/KusinaBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import KusinaSkeleton from "../components/KusinaSkeleton";
import { useNavigate } from "react-router-dom";

function Kusina() {
  const user_id = localStorage.getItem("user_id");
  const [sort, setSort] = useState("High");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [ratingFilter, setRatingFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 9;

  const fetchData = (order) => {
    setIsLoading(true);
    fetch(`http://localhost:3001/establishment?sort=${order}`)
      .then((res) => res.json())
      .then((data) => setData(Array.isArray(data) ? data : []))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchData(sortOrder);
  }, [sortOrder]);

  const handleSearch = () => {
    fetch("http://localhost:3001/establishmentSearch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ estab_name: searchTerm }),
    })
      .then((res) => res.json())
      .then((searchData) =>
        setSearchData(Array.isArray(searchData) ? searchData : [])
      )
      .catch((err) => console.log(err));
  };

  const handleArrowClick = () => {
    setSearchData([]);
    setSearchTerm("");
  };

  const handleSortChange = (order) => {
    setSort(order);
    setSortOrder(order === "High" ? "desc" : "asc");
    setCurrentPage(1);
  };

  const handleRatingFilterToggle = () => {
    setRatingFilter(!ratingFilter);
    setCurrentPage(1);
  };

  const applyFiltersAndSorting = (data) => {
    let filteredData = data;
    if (ratingFilter) {
      filteredData = filteredData.filter((estab) => estab.avg_rating >= 4);
    }
    return filteredData.sort((a, b) =>
      sortOrder === "desc"
        ? b.avg_rating - a.avg_rating
        : a.avg_rating - b.avg_rating
    );
  };

  const establishmentsToShow = applyFiltersAndSorting(
    searchTerm !== "" && searchData.length > 0 ? searchData : data
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = establishmentsToShow.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const [contactNumbers, setContactNumbers] = useState([""]);

  const handleAddContactField = () => {
    setContactNumbers([...contactNumbers, ""]);
  };

  const handleContactChange = (index, value) => {
    const newContacts = [...contactNumbers];
    newContacts[index] = value;
    setContactNumbers(newContacts);
  };

  // function to handle adding a new establishment
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Extract values from the form fields
    const estabName = event.target.name.value;
    const address = event.target.address.value;
    const imageLink = event.target.link.value;

    // Prepare the request body, including the contactNumbers array
    const requestBody = {
      estab_name: estabName,
      address: address,
      contacts: contactNumbers, // Pass contactNumbers array
      image_link: imageLink,
      user_id: user_id,
    };

    // Send a POST request to the server
    fetch("http://localhost:3001/establishments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody), // Convert the request body to JSON
    })
      .then((res) => {
        if (res.ok) {
          // If the response is successful, navigate to the "/kusina" route
          fetchData(sortOrder);
          // Close the modal dialog
          document.getElementById("add_modal").close();
          navigate("/kusina");
        } else {
          // If there's an error in the response, throw an error
          return res.json().then((error) => {
            throw new Error(error.error);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-kusinabg min-h-screen min-w-screen z-0">
      <div className="z-10">
        <KusinaNavBar />
      </div>
      <div className="flex flex-col mt-36 mb-36">
        <div className="flex flex-col items-center justify-center">
          <div className="pt-20 flex flex-row items-center animate-transitionIn">
            <KusinaSearchBar
              placeholder="Search a kusina"
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
        </div>
      </div>
      <div className="px-10">
        <div className="flex justify-between flex-wrap items-center mt-8">
          <div className="flex gap-2 flex-wrap animate-transitionIn">
            <p className="px-4 py-2 text-kusinaaccent font-bold text-xl animate-transitionIn">
              Filter Kusinas by
            </p>
            <button
              type="button"
              onClick={() =>
                handleSortChange(sort === "High" ? "NONE" : "High")
              }
              className={`border-2 border-kusinaaccent font-semibold rounded-full px-4 py-2 ${
                sort === "High"
                  ? "bg-kusinaaccent text-white"
                  : "bg-kusinabg text-kusinaaccent"
              }`}
            >
              Highest Rating to Lowest
            </button>
            <button
              type="button"
              onClick={() => handleSortChange(sort === "Low" ? "NONE" : "Low")}
              className={`border-2 border-kusinaaccent font-semibold rounded-full px-4 py-2 ${
                sort === "Low"
                  ? "bg-kusinaaccent text-white"
                  : "bg-kusinabg text-kusinaaccent"
              }`}
            >
              Lowest Rating to Highest
            </button>

            <button
              type="button"
              onClick={handleRatingFilterToggle}
              className={`border-2 border-kusinaaccent font-semibold rounded-full px-4 py-2 ${
                ratingFilter
                  ? "bg-kusinaaccent text-white"
                  : "bg-kusinabg text-kusinaaccent"
              }`}
            >
              Rating {">="} 4
            </button>
          </div>
          <div className="flex w-56 justify-center bg-kusinaprimary text-white rounded-3xl">
            <button
              className="text-kusinabg font-semibold px-8 py-2"
              onClick={() => document.getElementById("add_modal").showModal()}
            >
              Add a <span className="italic">Kusina</span>
            </button>
          </div>
        </div>
        <hr className="my-10 border-gray-500 animate-transitionIn"></hr>
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-transitionIn mb-20">
            {isLoading
              ? Array.from({ length: itemsPerPage }).map((_, index) => (
                  <KusinaSkeleton key={index} />
                ))
              : currentItems.map((establishment) => (
                  <KusinaBox
                    key={establishment.estab_id}
                    image={establishment.image_link}
                    id={establishment.estab_id}
                    name={establishment.estab_name}
                    address={establishment.address}
                    rating={
                      establishment.avg_rating
                        ? Number(establishment.avg_rating).toFixed(1)
                        : "0"
                    }
                  />
                ))}
          </div>
        </div>
        <div className="flex justify-center pb-20">
          <div className="join">
            <button
              className="join-item btn bg-kusinaprimary border-kusinaprimary text-kusinabg hover:bg-kusinaprimary hover:border-kusinaprimary disabled:bg-kusinaprimary disabled:border-kusinaprimary disabled:text-kusinabg"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              «
            </button>
            <div className="flex flex-col justify-center align-middle items-center bg-kusinaprimary border-kusinaprimary text-kusinabg">
              Product Page {currentPage}
            </div>
            <button
              className="join-item btn bg-kusinaprimary border-kusinaprimary text-kusinabg hover:bg-kusinaprimary hover:border-kusinaprimary disabled:bg-kusinaprimary disabled:border-kusinaprimary disable:text-kusinabg"
              onClick={() => paginate(currentPage + 1)}
              disabled={
                currentPage ===
                Math.ceil(establishmentsToShow.length / itemsPerPage)
              }
            >
              »
            </button>
          </div>
        </div>
      </div>
      <dialog id="add_modal" className="modal">
        <div className="modal-box bg-white text-kusinaprimary">
          <h3 className="font-bold text-lg pb-5">Add Establishment</h3>
          <form
            method="dialog"
            className="modal-content"
            onSubmit={handleSubmit}
          >
            <div className="mb-2">
              <p className="mb-2">Establishment Name:</p>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Establishment Name"
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
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleAddContactField}
                  className="flex justify-end items-end text-kusinaprimary py-2 underline rounded-3xl focus:outline-none focus:shadow-outline"
                >
                  <p>Add Another Contact Number</p>
                </button>
              </div>
            </div>
            <div className="mb-2">
              <p className="mb-2">Image Link:</p>
              <input
                type="text"
                id="link"
                name="link"
                placeholder="Image Link"
                className="bg-white font-poppins shrink appearance-none h-16 pl-4 pr-4 text-base w-full max-w-screen rounded-md border mb-2"
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-kusinaprimarylight hover:bg-kusinaprimary text-white font-bold py-2 px-4 rounded-3xl focus:outline-none focus:shadow-outline"
                //   onClick={}
              >
                Add Establishment
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
  );
}

export default Kusina;
