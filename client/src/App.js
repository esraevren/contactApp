//components
import AddContact from "./components/AddContact";
import AllContacts from "./components/AllContacts";
import Navbar from "./components/Navbar";
//routing
import {  Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
       <Route path="/all" element={<AllContacts/>} />
       <Route path="/add"  element={<AddContact />}  />

      </Routes>
    
    </>
  );
}

export default App;
