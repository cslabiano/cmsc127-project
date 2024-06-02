import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Kusina from "./pages/Kusina";
import KusinaMenu from "./pages/KusinaMenu";
import KusinaFood from "./pages/KusinaFood";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/kusina" element={<Kusina />} />
          <Route path="/kusina/:establishment_id" element={<KusinaMenu />} />
          <Route path="/kusina/estab" element={<KusinaMenu />} />
          <Route
            path="/kusina/:establishment_id/:item_id"
            element={<KusinaFood />}
          />
          <Route path="/kusina/estab/item" element={<KusinaFood />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
