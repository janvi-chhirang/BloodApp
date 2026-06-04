import React from "react";
import Form from "../../components/shared/Forms/Form";
import { useSelector } from "react-redux"; 
import Spinner from "../../components/shared/spinner";

const Login = () => {

  const { loading } = useSelector((state) => state.auth);

  return (
    <>
    
      {loading ? (
        <Spinner />
      ) : (
        <div className="container-fluid">
          <div className="row g-0">
            <div className="col-md-8 banner-1">
              <img src="/assets/img1.jpg" alt="login" className="img1" />
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center form-container">
              <Form 
                submitBtn={"Login"} 
                formTitle={"Login to your account"} 
                formType={"Login"} 
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
