import React from "react";
import KusinaNavBar from "../components/KusinaNavBar";
import KusinaSearchBar from "../components/KusinaSearchBar";

function Kusina() {
  return (
    <div className="bg-kusinabg min-h-screen min-w-screen z-0">
      <div className="z-10">
        <KusinaNavBar />
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col items-center justify-center">
          <div className="pt-20">
            <KusinaSearchBar placeholder="Search a kusina" />
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="card w-96 shadow-xl bg-kusinasecondary text-kusinaprimary scale-75">
          <figure>
            <img
              src="https://cdn.vox-cdn.com/thumbor/5d_RtADj8ncnVqh-afV3mU-XQv0=/0x0:1600x1067/1200x900/filters:focal(672x406:928x662)/cdn.vox-cdn.com/uploads/chorus_image/image/57698831/51951042270_78ea1e8590_h.7.jpg"
              alt="Shoes"
            />
          </figure>
          <div className="card-body font-sans">
            <h2 className="card-title font-sans text-xl font-extrabold">
              Food Establishment
            </h2>
            <p>This is where you put the address of the food establishment.</p>
            <div className="flex justify-between">
              <h2 className="card-title text-xl font-extrabold">4.8</h2>
              <div>
                <div className="rating">
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-kusinaprimary"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-kusinaprimary"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-kusinaprimary"
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-kusinaprimary"
                    checked
                    disabled
                  />
                  <input
                    type="radio"
                    name="rating-2"
                    className="mask mask-star-2 bg-kusinaprimary"
                    disabled
                  />
                </div>
              </div>
            </div>
            {/* <div className="card-actions justify-end">
              <div className="badge badge-outline">Fashion</div>
              <div className="badge badge-outline">Products</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Kusina;
