import React from 'react'
import Form from '../../components/shared/Forms/Form'
import { useSelector } from 'react-redux'
import Spinner from '../../components/shared/spinner'

const Register = () => {
  const { loading } = useSelector((state) => state.auth);
  return (
    
    <div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container-fluid">
          <div className="row g-0">
            <div className="col-md-8 banner-2">
              <img src="/assets/img2.jpg" alt="login" className="img2" />
            </div>
            <div className="col-md-4 d-flex flex-column justify-content-center align-items-center form-container">
              <Form submitBtn={"Register"} formTitle={"Create a new account"} formType={"Register"} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Register
