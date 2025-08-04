/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";
import axios from "axios";
import { useHistory } from "react-router-dom";

axios.defaults.headers.common["x-api-key"] = "reqres-free-v1";

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
export default function Login() {
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

  // for redirect Success page

  let history = useHistory();

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

  function handleSubmit(event) {
    event.preventDefault();
    if (!isValid) return;
    // for post request
    axios
      .post("https://reqres.in/api/users", formData)
      .then((response) => {
        console.log(response);
        //for clear the form with  used controlled inputs
        setFormData(initialFormData);
        history.push("/success");
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label for="name">Ad :</Label>
          <Input
            id="name"
            name="name"
            placeholder="Adinizi Yaziniz"
            type="text"
            onChange={handleChange}
            invalid={errors.name}
            value={formData.name}
          />
          {errors.name && <FormFeedback>{errorMessages.name}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="surname">Soyad :</Label>
          <Input
            id="surname"
            name="surname"
            placeholder="Soyadinizi Yaziniz"
            type="text"
            onChange={handleChange}
            invalid={errors.surname}
            value={formData.surname}
          />
          {errors.surname && (
            <FormFeedback>{errorMessages.surname}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="email">Email :</Label>
          <Input
            id="email"
            name="email"
            placeholder="Mail Adresinizi Yaziniz"
            type="email"
            onChange={handleChange}
            invalid={errors.email}
            value={formData.email}
          />
          {errors.email && <FormFeedback>{errorMessages.email}</FormFeedback>}
        </FormGroup>
        <FormGroup>
          <Label for="password">Sifre :</Label>
          <Input
            id="password"
            name="password"
            placeholder="Sifrenizi Yaziniz"
            type="password"
            onChange={handleChange}
            invalid={errors.password}
            value={formData.password}
          />
          {errors.password && (
            <FormFeedback>{errorMessages.password}</FormFeedback>
          )}
        </FormGroup>
        <FormGroup check>
          <Input
            id="terms"
            name="terms"
            type="checkbox"
            onChange={handleChange}
            invalid={errors.terms}
            value={formData.terms}
          />
          <Label check for="terms">
            “I agree to the terms and conditions as set out by the user
            agreement.”
          </Label>
          {errors.terms && <FormFeedback>{errorMessages.terms}</FormFeedback>}
        </FormGroup>

        <Button disabled={!isValid}>Kayit Ol</Button>
      </Form>
    </>
  );
}
