import React from "react";
import { useEffect, useState } from "react";
import { getContacts } from "../server/api";
import DataTable from 'react-data-table-component'
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

const AllContacts = () => {
  const [contacts, setContacts] = useState([]);



  // const filterData = (e) => {
  //   if(e.target.value !== ''){
  //     setValue(e.target.value);
  //     const filterTable = 
  //   }
  // }

  // const filteredData= contacts.filter(
  //   items => items.some(item => item.toString().toLocaleLowerCase('TR').includes(search.toLocaleLowerCase('TR')))
  // )
  

  useEffect(() => {
    getAllContacts();
  }, []);

  const getAllContacts = async () => {
    let response = await getContacts();
    setContacts(response.data);
    console.log(response.data);
  };

  const columns = [
    {
      name:'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name:'Lastname',
      selector: row => row.lastName
    },
    {
      name:'Email',
      selector: row => row.email
    },
    {
      name:'Birth Date',
      selector: row => row.birthDate
    },
    {
      name:'Phone Number',
      selector: row => row.phoneNumber
    },
    {
      name: 'Edit',
      selector: row =><> <Button>Edit</Button>
      <Button>Delete</Button> </>
    }

  ]




  return (
    <div>
     

      <nav className="navbar kanit">
        <div className="logo">Contact App</div>
        <ul className="nav-links">
          <div className="menu">
            <li>
              <input  type='text' placeholder="Search contacts... "  />
            </li>
           
            <li>
              <a href="/" className="nav-item">
                <i className="bi-chat-text-fill me-2"></i>Send Feedback
              </a>
            </li>
            <li className="mobile-nav">
              Menu<i className="bi-list"></i>
            </li>
          </div>
        </ul>
      </nav>
      <br></br>
     

      <section className="container">
      <Link to="/add" className="btn btn-primary">Add Contact</Link>

        <DataTable columns={columns}
          data={contacts}
          pagination
          >
            
          
        </DataTable>
      </section>
    </div>
  );
};

export default AllContacts;
