import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../../pages/Home";
import Applayout from "../../pages/Applayout";
import Doctors from "../../pages/Doctors";
import Clinics from "../../pages/Clinics";
import ListDocs from "../container/Doctor/ListDocs";
import ClinicsList from "../container/Clinics/ClinicsList";
import DocDetail from "../container/Doctor/DocDetail";

function Index() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Applayout />}>
          <Route index element={<Home />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/listDoc/:id" element={<ListDocs />} />
          <Route path="/doctors/:id" element={<DocDetail />} />
          <Route path="/doctors/listClinics" element={<ClinicsList />} />
          <Route path="/clinics" element={<Clinics />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Index;
