//components
import AddContact from "./components/AddContact";
import AllContacts from "./components/AllContacts";

//routing
import {  Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
  
      <AllContacts />
      <Routes>
        {/* <Route path="/api/contacts" element={<AllContacts/>} />  */}
       <Route path="/add"  element={<AddContact />}  />

      </Routes>
    
    </>
  );
}

export default App;
