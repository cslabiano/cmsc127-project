import React, { useState, useEffect } from "react";
import KusinaNavBar from "../components/KusinaNavBar";
import KusinaSearchBar from "../components/KusinaSearchBar";
import KusinaBox from "../components/KusinaBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function Kusina() {
  const [sort, setSort] = useState("High");
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/establishments')
    .then(res => res.json())
    .then(data => setData(data))
    .catch(err => console.log(err))
  }, [])

  const handleSearch = () => {
    fetch('http://localhost:3001/establishmentSearch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ estab_name: searchTerm })
    })
    .then(res => res.json())
    .then(searchData => setSearchData(searchData))
    .catch(err => console.log(err));
  };

  const establishmentsToShow = searchTerm !== '' && searchData.length > 0 ? searchData : data;

  const handleArrowClick = () => {
    setSearchData([]);
  }

  return (
    <div className="bg-kusinabg min-h-screen min-w-screen z-0">
      <div className="z-10">
        <KusinaNavBar />
      </div>
      <div className="flex flex-col mt-36 mb-36">
        <div className="flex flex-col items-center justify-center">
          <div className="pt-20 flex flex-row items-center">
            <KusinaSearchBar placeholder="Search a kusina" 
                              value={searchTerm}
                              onChange={(e) => setSearchTerm(e.target.value)}
                              onSearch={handleSearch}/>
            {searchData.length > 0 && (
              <button className="btn btn-square btn-ghost" onClick={handleArrowClick}>
                <FontAwesomeIcon icon={faArrowLeft} className="text-kusinaprimary hover:text-kusinaprimarylight size-7"/>
              </button>
            )}
            
          </div>
        </div>
      </div>
      <div className="px-10">
        <div className="flex justify-around flex-wrap">
          <div className="mt-8 flex align-middle">
            <p className="px-4 py-2 text-kusinaaccent font-bold text-xl">
              Filter Kusinas by
            </p>
            <div className="flex gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setSort(sort === "High" ? "NONE" : "High")}
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
                onClick={() => setSort(sort === "Low" ? "NONE" : "Low")}
                className={`border-2 border-kusinaaccent font-semibold rounded-full px-4 py-2 ${
                  sort === "Low"
                    ? "bg-kusinaaccent text-white"
                    : "bg-kusinabg text-kusinaaccent"
                }`}
              >
                Lowest Rating to Highest
              </button>
            </div>
          </div>
        </div>
        <hr className="mt-10 border-gray-500"></hr>
        <div className="flex">
        {establishmentsToShow.map((establishment) => (
          <KusinaBox image={"https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg"} 
          name={establishment.estab_name} 
          address={establishment.address}
          rating={"4.8"} />
        ))}
        </div>
        
      </div>
    </div>
  );
}

export default Kusina;
