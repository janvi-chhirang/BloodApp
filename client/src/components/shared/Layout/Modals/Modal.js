import React, { useState } from "react";
import { toast } from "react-toastify";
import API from "../../../../services/API";
import { useSelector } from "react-redux";

const Modal = () => {
  const [inventoryType, setInventoryType] = useState("in");
  const [bloodGroup, setBloodGroup] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => state.auth);

  const handleModalSubmit = async () => {
    try {
      if (!bloodGroup || quantity <= 0) {
        return toast.error("Please Provide all fields", { autoClose: 2000 });
      }

      const payload = {
        email: email,
        userId: user?._id,
        inventoryType: inventoryType.toLowerCase(),
        bloodGroup,
        quantity,
      };
      if (inventoryType === "out") {
      }

      const { data } = await API.post("/inventory/create-Inventory", payload);

      if (data?.inventory) {
        toast.success("New Record Created!!", { autoClose: 2000 });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      toast.error(message);
      console.log("Full Error Object:", error.response?.data);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Manage Blood Record
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <div className="d-flex align-items-center mb-4">
                <span>Blood Type:</span> &nbsp;
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inventoryType"
                    id="in"
                    value="in"
                    onChange={(e) => setInventoryType(e.target.value)}
                    defaultChecked
                  />
                  <label className="form-check-label" htmlFor="in">
                    In
                  </label>
                </div>
                <div className="form-check ms-3">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="inventoryType"
                    id="out"
                    value="out"
                    onChange={(e) => setInventoryType(e.target.value)}
                  />
                  <label className="form-check-label" htmlFor="out">
                    Out
                  </label>
                </div>
              </div>


              <div className="mb-3">
                <label className="form-label">Select Blood Group</label>
                <select
                  className="form-select"
                  onChange={(e) => setBloodGroup(e.target.value)}
                >
                  <option defaultValue>Open this select menu</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>


              <div className="mb-3">
                <label htmlFor="Email" className="form-label">
                   Email
                </label>
                <input
                  id="donarEmail"
                  type="email"
                  className="form-control"
                  value={email}
                  placeholder="Enter donor's email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="quantity" className="form-label">
                  Quantity (ML)
                </label>
                <input
                  id="quantity"
                  type="number"
                  className="form-control"
                  value={quantity}
                  placeholder="e.g. 500"
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary px-4"
                onClick={handleModalSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
