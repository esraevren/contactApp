//components
import AddContact from "./components/AddContact";
import AllContacts from "./components/AllContacts";
import EditContact from "./components/EditContact"

//routing
import {  Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<AllContacts/>} />  
       <Route path="/add"  element={<AddContact />}  />
       <Route path="edit/:id"  element={<EditContact />}  />
      </Routes>
    </>
  );
}

export default App;
