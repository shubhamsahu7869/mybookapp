import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [errors, setErrors] = useState({});

  const formValidator = () => {
    let newErrors = {};

    let { name, email, password, phone, address } = formData;

    // Name Validation
    if (name.trim().length < 2) {
      newErrors.name = "Name Must be atleast 2 Characters Long";
    }

    const isValidName = /^[a-zA-Z ]*$/;
    if (!isValidName.test(name)) {
      newErrors.name = "Enter a Valid Name";
    }

    const isValidEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!isValidEmail.test(email)) {
      newErrors.email = "Enter a Valid Email";
    }

    let isValidPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,20}$/;

    if (!isValidPassword.test(password)) {
      newErrors.password = "Enter a Valid Password";
    }

    const isValidPhone =
      /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

    if (!isValidPhone.test(phone)) {
      newErrors.phone = "Enter a Valid Contact Number";
    }

    if (address.trim().length === 0) {
      newErrors.address = "Address is Required";
    }

    return newErrors;
  };

  const changeHandler = (e) => {
    let { name, value } = e.target;
    console.log(name, value);

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const validateErrors = formValidator();
    setErrors(validateErrors);
    if (Object.keys(validateErrors).length === 0) {
      let existingUsers = JSON.parse(localStorage.getItem("user-Data")) || [];
      const updatedUsers = [...existingUsers, formData];
      localStorage.setItem("user-Data", JSON.stringify(updatedUsers));

      toast.success("Signup Successfull");
      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
      });
    }
  };

  return (
    <form className="signup-form" onSubmit={submitHandler}>
      <ToastContainer position="top-center" autoClose={1000} />
      <h1>Signup to Book-App</h1>

      <label htmlFor="name">Name: </label>
      <input
        type="text"
        placeholder="Enter Your Name"
        id="name"
        name="name"
        value={formData.name}
        onChange={changeHandler}
      />
      {errors.name && <span className="error">{errors.name}</span>}

      <label htmlFor="email">Email: </label>
      <input
        type="email"
        placeholder="Enter Your Email"
        id="email"
        name="email"
        value={formData.email}
        onChange={changeHandler}
      />
      {errors.email && <span className="error">{errors.email}</span>}

      <label htmlFor="pass">Password: </label>
      <input
        type="password"
        placeholder="Enter Your Password"
        id="pass"
        name="password"
        value={formData.password}
        onChange={changeHandler}
      />
      {errors.password && <span className="error">{errors.password}</span>}

      <label htmlFor="phone">Phone No: </label>
      <input
        type="number"
        placeholder="Enter Your Phone Number"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={changeHandler}
      />
      {errors.phone && <span className="error">{errors.phone}</span>}

      <label htmlFor="add">Address: </label>
      <input
        type="text"
        placeholder="Enter Your Address"
        id="add"
        name="address"
        value={formData.address}
        onChange={changeHandler}
      />
      {errors.address && <span className="error">{errors.address}</span>}

      <button type="submit">Signup</button>
      <p>
        <Link to="/login">Already Have an Account</Link>
      </p>
    </form>
  );
}

export default Signup;
