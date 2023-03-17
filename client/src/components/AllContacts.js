import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { Button } from "react-bootstrap";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Link, useNavigate } from "react-router-dom";
import {
  getContactsAsync,
  deleteContactAsync,
  getContactAsync,
} from "../contacts/contactsSlice";

const AllContacts = () => {
  const state = useSelector((states) => states.contacts);

  const dispatch = useDispatch();
  const id = useSelector((state) => state.contacts.items);

  useEffect(() => {
    dispatch(getContactsAsync());
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure ? ")) {
      await dispatch(deleteContactAsync(id));
    }
  };

  const navigate = useNavigate();
  const handleEdit = async (id) => {
    await dispatch(getContactAsync(id));
    navigate(`/edit/${id}`);
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => <> <img className="rounded-circle img-fluid" style={{width:'30px'}} src="https://www.w3schools.com/howto/img_avatar.png" ></img> {row.name} </>,
      sortable: true,
    },
    {
      name: "Lastname",
      selector: (row) => row.lastName,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Birth Date",
      selector: (row) => row.birthDate,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNumber,
    },
    {
      name: "Edit",
      selector: (row) => (
        <>
          <Button onClick={() => handleEdit(row._id)}> Edit</Button>
          <Button onClick={() => handleDelete(row._id)}>Delete</Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <nav className="navbar">
        <div className="logo"> <BiPhoneCall />  Contact App</div>
        <ul className="nav-links">
          <div className="menu">
              <input type="text" placeholder="Search contacts... " />
          </div>
        </ul>
      </nav>
      <br></br>
      <section className="container">
        <Link to="/add" className="btn btn-primary">
        <AiOutlinePlus/>  Add Contact
        </Link>
        <ToastContainer />
        {state.status === "loading" && <span>Loading...</span>}
        {state.status === "fulfilled" && (
          <DataTable columns={columns} data={state.items} pagination sortable/>
        )}
      </section>
    </div>
  );
};

export default AllContacts;
