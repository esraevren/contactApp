import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiPhoneCall } from "react-icons/bi";
import { AiOutlineEdit, AiOutlinePlus } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from "mdb-react-ui-kit";

import { Link, useNavigate } from "react-router-dom";
import {
  getContactsAsync,
  deleteContactAsync,
  getContactAsync,
} from "../contacts/contactsSlice";

const AllContacts = () => {
  const [query, setQuery] = useState("");
  const state = useSelector((states) => states.contacts);
  const id = useSelector((state) => state.contacts.items);
  const filteredData = state.items.filter((contact) =>
    contact.name.toLowerCase().includes(query)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getContactsAsync());
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure ? ")) {
      await dispatch(deleteContactAsync(id));
    }
  };

  const handleEdit = async (id) => {
    await dispatch(getContactAsync(id));
    navigate(`/edit/${id}`);
  };

  return (
    <div>
      <nav className="navbar mb-4">
        <div className="logo">
          <BiPhoneCall /> Contact App
        </div>
      </nav>

      {state.status === "loading" && <span>Loading...</span>}
      {state.status === "fulfilled" && (
        <section className="container">
          <Link to="/add">
            <button type="button" className="btn btn-info mb-4">
              <AiOutlinePlus /> Add New Contact
            </button>
          </Link>
          <div className="input-group rounded">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search contacts "
              aria-label="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <ToastContainer />
          <div className="table-responsive ">
            <MDBTable align="middle">
              <MDBTableHead>
                <tr >
                  <th scope="col">Name</th>
                  <th scope="col">Phone Number</th>
                  <th scope="col" className="sm-none">
                    Birth Date
                  </th>
                  <th scope="col">Actions</th>
                </tr>
              </MDBTableHead>
              <MDBTableBody>
                {filteredData.map((item) => (
                  <tr>
                    <td>
                      <div className="d-flex align-items-center">
                        <img
                          src="https://png.pngtree.com/png-vector/20190114/ourlarge/pngtree-vector-avatar-icon-png-image_313572.jpg"
                          alt=""
                          style={{ width: "45px", height: "45px" }}
                          className="rounded-circle"
                        />
                        <div className="ms-3">
                          <p className="fw-bold mb-1">
                            {item.name} {item.lastName}
                          </p>
                          <p className="text-muted mb-0">{item.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <p className="fw-normal mb-1">{item.phoneNumber}</p>
                    </td>

                    <td>
                      <p className="fw-normal mb-1">{item.birthDate}</p>
                    </td>
                    <td>
                      <MDBBtn
                        color="link"
                        rounded
                        size="sm"
                        onClick={() => handleDelete(item._id)}
                      >
                        <TiDeleteOutline /> Delete
                      </MDBBtn>
                      <MDBBtn
                        color="link"
                        rounded
                        size="sm"
                        onClick={() => handleEdit(item._id)}
                      >
                        <AiOutlineEdit /> Edit
                      </MDBBtn>
                    </td>
                  </tr>
                ))}
              </MDBTableBody>
            </MDBTable>
          </div>
        </section>
      )}
    </div>
  );
};

export default AllContacts;
