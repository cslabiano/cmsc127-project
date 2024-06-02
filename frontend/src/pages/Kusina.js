import React, { useState, useEffect } from "react";
import KusinaNavBar from "../components/KusinaNavBar";
import KusinaSearchBar from "../components/KusinaSearchBar";
import KusinaBox from "../components/KusinaBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import KusinaSkeleton from "../components/KusinaSkeleton";

function Kusina() {
  const [sort, setSort] = useState("High");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [ratingFilter, setRatingFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
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
    setCurrentPage(1); // Reset page number when sort order changes
  };

  const handleRatingFilterToggle = () => {
    setRatingFilter(!ratingFilter);
    setCurrentPage(1); // Reset page number when filter changes
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
        <div className="flex justify-around flex-wrap">
          <div className="mt-8 flex align-middle">
            <p className="px-4 py-2 text-kusinaaccent font-bold text-xl animate-transitionIn">
              Filter Kusinas by
            </p>
            <div className="flex gap-2 flex-wrap animate-transitionIn">
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
                onClick={() =>
                  handleSortChange(sort === "Low" ? "NONE" : "Low")
                }
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
              className="join-item btn bg-kusinaprimary border-kusinaprimary text-kusinabg hover:bg-kusinaprimary hover:border-kusinaprimary disabled:bg-kusinaprimary disabled:border-kusinaprimary disabled:text-kusinabg"
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
    </div>
  );
}

export default Kusina;
