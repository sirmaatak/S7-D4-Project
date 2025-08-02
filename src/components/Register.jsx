/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

// for clear the form after submitted it
const initialFormData = {
  name: "",
  surname: "",
  email: "",
  password: "",
  terms: false,
};
//if users validation is false then show this messages
const errorMessages = {
  name: "Minimum 3 characters needed",
  surname: "Minimum 3 characters needed",
  email: "Invalid mail adress",
  password:
    "8 characters long 1 uppercase & 1 lowercase character and 1 number needed",
  terms: "Must accept the terms",
};
export default function Register() {
  const [formData, setFormData] = useState(initialFormData);
  // for validation setters
  const [errors, setErrors] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    terms: false,
  });
  const [isValid, setIsValid] = useState(false);

  //function for validate email
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // for regex password validation
  let regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,15}$/;

  //checking the isValid
  useEffect(() => {
    if (
      formData.name.replaceAll(" ", "").length >= 3 &&
      formData.surname.replaceAll(" ", "").length >= 3 &&
      validateEmail(formData.email) &&
      regex.test(formData.password) &&
      formData.terms
    ) {
      setIsValid(true);
      //console.log(errors);
    } else {
      //console.log(errors);
      setIsValid(false);
    }
    //console.log(isValid);
  }, [formData]);

  function handleChange(event) {
    //for catch which input has used and its text
    let { type, name, checked, value } = event.target;
    value = type == "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: value });

    //VALIDATIONS

    //name and surname validation
    if (name == "name" || name == "surname") {
      if (value.replaceAll(" ", "").length >= 3) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    //email validation
    if (name == "email") {
      if (validateEmail(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }

    //password validation
    if (name == "password") {
      if (regex.test(value)) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
    // terms validation
    if (name === "terms") {
      if (value) {
        setErrors({ ...errors, [name]: false });
      } else {
        setErrors({ ...errors, [name]: true });
      }
    }
  }

  return (
    <>
      <Form>
        <FormGroup>
          <Label for="name">Ad :</Label>
          <Input
            id="name"
            name="name"
            placeholder="Adinizi Yaziniz"
            type="text"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="surname">Soyad :</Label>
          <Input
            id="surname"
            name="surname"
            placeholder="Soyadinizi Yaziniz"
            type="text"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email :</Label>
          <Input
            id="email"
            name="email"
            placeholder="Mail Adresinizi Yaziniz"
            type="email"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label for="password">Sifre :</Label>
          <Input
            id="password"
            name="password"
            placeholder="Sifrenizi Yaziniz"
            type="password"
            onChange={handleChange}
          />
        </FormGroup>
        <FormGroup check>
          <Input id="exampleCheck" name="check" type="checkbox" />
          <Label check for="exampleCheck">
            “I agree to the terms and conditions as set out by the user
            agreement.”
          </Label>
        </FormGroup>
        <Button disabled={!isValid}>Kayit Ol</Button>
        <FormGroup>
          <Label>User ID :</Label>
        </FormGroup>
      </Form>
    </>
  );
}
