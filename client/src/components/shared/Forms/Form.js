import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";
import { useSelector } from "react-redux";

const Form = ({ submitBtn, formTitle, formType }) => {
  const { loading } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  return (
    <>
      <form
        onSubmit={(e) => {
          if (formType === "Login") {
            return handleLogin(e, email, password, role);
          } else if (formType === "Register") {
            return handleRegister(
              e,
              email,
              password,
              role,
              name,
              organisationName,
              hospitalName,
              website,
              address,
              phoneNo,
            );
          }
        }}
      >
        <fieldset disabled={loading}>
          <h1 className="text-center mb-4">{formTitle}</h1>
          <hr />
          <div className="d-flex mb-3">
            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                id="donarRadio"
                value={"donar"}
                onChange={(e) => setRole(e.target.value)}
                defaultChecked
              />
              <label htmlFor="donarRadio" className="form-check-label">
                Donar
              </label>
            </div>

            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                id="adminRadio"
                value={"admin"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="adminRadio" className="form-check-label">
                Admin
              </label>
            </div>

            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                id="organisationRadio"
                value={"organisation"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="organisationRadio" className="form-check-label">
                Organisation
              </label>
            </div>

            <div className="form-check ms-2">
              <input
                type="radio"
                className="form-check-input"
                name="role"
                id="hospitalRadio"
                value={"hospital"}
                onChange={(e) => setRole(e.target.value)}
              />
              <label htmlFor="hospitalRadio" className="form-check-label">
                Hospital
              </label>
            </div>
          </div>

          {formType === "Register" ? (
            <>
              {(role === "admin" || role === "donar") && (
                <InputType
                  labelText={"Name"}
                  labelFor={"name"}
                  inputType={"text"}
                  name={"name"}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              )}

              {role === "organisation" && (
                <InputType
                  labelText={"Organisation Name"}
                  labelFor={"organisationName"}
                  InputType={"text"}
                  name={"organisationName"}
                  value={organisationName}
                  onChange={(e) => setOrganisationName(e.target.value)}
                />
              )}
              {role === "hospital" && (
                <InputType
                  labelText={"Hospital Name"}
                  labelFor={"hospitalName"}
                  InputType={"text"}
                  name={"hospitalName"}
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                />
              )}
              {(role === "organisation" || role === "hospital") && (
                <InputType
                  labelText={"Website"}
                  labelFor={"website"}
                  InputType={"text"}
                  name={"website"}
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              )}
              <InputType
                labelText={"Address"}
                labelFor={"address"}
                InputType={"text"}
                name={"address"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <InputType
                labelText={"Phone Number"}
                labelFor={"phoneNo"}
                InputType={"text"}
                name={"phoneNo"}
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </>
          ) : null}

          <InputType
            labelText={"Email"}
            labelFor={"email"}
            InputType={"email"}
            name={"email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputType
            labelText={"Password"}
            labelFor={"password"}
            InputType={"password"}
            name={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="d-flex flex-column justify-content-between">
            {formType === "Login" ? (
              <p>
                Not registered? <Link to="/register">Register here</Link>
              </p>
            ) : (
              <p>
                Already registered? <Link to="/login">Login here</Link>
              </p>
            )}
            <button type="submit" className="btn btn-primary">
              {loading ? "Processing..." : submitBtn}
            </button>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default Form;
