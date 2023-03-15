//components
import AddContact from "./components/AddContact";
import AllContacts from "./components/AllContacts";

//routing
import {  Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
  
      
      <Routes>
        <Route path="/" element={<AllContacts/>} />  
       <Route path="/add"  element={<AddContact />}  />

      </Routes>
    
    </>
  );
}

export default App;
