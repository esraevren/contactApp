import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { BiPhoneCall } from "react-icons/bi";
import { BsTelephonePlus } from "react-icons/bs";
import { getContactAsync, editContactAsync } from "../contacts/contactsSlice";
import { useNavigate } from "react-router-dom";
const defaultValue = {
  name: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  birthDate: "",
};

const EditContact = () => {
  const [contact, setContact] = useState(defaultValue);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("idle");
  const { name, lastName, email, phoneNumber, birthDate } = contact;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };
  const { id } = useParams();

  useEffect(() => {
    loadContactDetail(id);
  }, []);

  const loadContactDetail = async (id) => {
    const response = await dispatch(getContactAsync(id));

    setContact(response.payload);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !lastName || !email || !phoneNumber || !birthDate) {
      setError("All inputs are required ! ");
      return;
    }

    try {
      setStatus("loading");
      setError("");

      await dispatch(editContactAsync({ id, contact }));
      setStatus("fulfilled");

      navigate("/");
    } catch (error) {
      setStatus("rejected");
      setError(error.message);
    }
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          {" "}
          <BiPhoneCall /> Contact App
        </div>
      </nav>
      <br></br>
      <section className="contact">
        {error && <h3>{error}</h3>}

        <form onSubmit={handleSubmit}>
          <h2>Edit Contact</h2>
          <div className="divider mb-5">
            <div className="darkline"></div>
            <div className="phoneimg">
              <BsTelephonePlus />{" "}
            </div>
            <div className="darkline"></div>
          </div>
          <label htmlFor="name">
            <input
              type="text"
              id="name"
              placeholder="Name"
              value={name}
              name="name"
              onChange={handleInputChange}
              required
            />
            <span>Name</span>
          </label>
          <label htmlFor="lastName">
            <input
              type="text"
              id="lastName"
              placeholder="lastName"
              name="lastName"
              onChange={handleInputChange}
              value={lastName}
              required
            />
            <span>Last name</span>
          </label>
          <label htmlFor="email">
            <input
              type="email"
              id="email"
              placeholder="Email"
              onChange={handleInputChange}
              value={email}
              name="email"
              required
            />
            <span>Email addres </span>
          </label>
          <label htmlFor="phoneNumber">
            <input
              type="text"
              id="phoneNumber"
              placeholder="phoneNumber"
              onChange={handleInputChange}
              value={birthDate}
              name="birthDate"
              required
            />
            <span>Birth Date</span>
          </label>
          <label htmlFor="phoneNumber">
            <input
              type="text"
              id="phoneNumber"
              placeholder="phoneNumber"
              onChange={handleInputChange}
              value={phoneNumber}
              name="phoneNumber"
              required
            />
            <span>Phone Number</span>
          </label>
          <button
            type="submit"
            disabled={status === "loading"}
            className="btn btn-info mb-4"
          >
            Update
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditContact;
