import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/App.css'; // Reusing the CSS for consistent styling

function ForgotPasswordPage() {
  const [contact, setContact] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logic to handle sending OTP to the user's email or phone number
    console.log('OTP request for:', contact);
  };

  return (
    <div
      className="plain-background"
      style={{
       
        borderRadius: "15px",
        height: "100vh",
      
      }}
    >
      <div className="mask d-flex align-items-center h-100 plain-background">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6" style={{  display:'flex',
        alignItems: "center",
        justifyContent: "center"}}>
              <div className="card" style={{ borderRadius: "15px", flex:1  }}>
                <div className="card-body p-5">
                  <h4 className="text-uppercase text-center mb-3">
                    Forgot Password
                  </h4>

                  <form onSubmit={handleSubmit}>
                    {/* Email or Phone Number Input */}
                    <div className="form-outline mb-4">
                      <input
                        type="text"
                        className="form-control form-control-lg mb-3"
                        id="contact"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        placeholder="Enter your email or phone number"
                        required
                      />
                      <label className="form-label" htmlFor="contact">
                        Email / Phone Number
                      </label>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-block"
                    >
                      Send OTP
                    </button>

                    {/* Back to Login Link */}
                    <div className="text-center mt-3">
                      Back to{" "}
                      <Link to="/login" className="text-body">
                        <u>Login</u>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
