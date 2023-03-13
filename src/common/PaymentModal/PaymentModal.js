import { Modal, Box, Button } from "@mui/material";
import { styled } from "@mui/system";
import { NotificationManager } from "react-notifications";

import './index.css'
const MyModal = styled(Modal)({
  "& .MuiBox-root": {
    background: "#1a1a1a",
  },
});

const DeleteButton = styled(Button)({
  backgroundColor: "#F26826 !important",
  margin: "4px",
  "&:hover": {
    backgroundColor: `#F26826 important`,
  },
});

const PaymentModal = ({ open, handleClose, text, type }) => {
  const style = {
    background: "#1a1a1a",
    color: "whitesmoke",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "8px",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    textAlign: "center",
  };

  return (
    <MyModal
      open={open}
      onClose={() => handleClose(false)}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style, width: '80vw' }}>
        <div className="padding">
          <div className="row">
            <div className="container-fluid d-flex justify-content-center">
              <div className="col-sm-8 col-md-8">
                <div className="card bg-dark text-white">
                  <div className="card-header border-0">

                    <div className="row">
                      <div className="col-md-12 pt-5">
                        <span className="h2">Set up Credit/Debit card</span>

                      </div>

                    </div>
                    <div className="row">

                      <div className="col-md-6 pt-3 " style={{ "marginTop": "-5px" }}>

                        <img src="https://img.icons8.com/color/36/000000/visa.png" />
                        <img src="https://img.icons8.com/color/36/000000/mastercard.png" />
                        <img src="https://img.icons8.com/color/36/000000/amex.png" />

                      </div>

                    </div>

                  </div>
                  <div className="card-body" style={{ "height": "auto" }}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <input id="cc-number" type="tel"
                            className="input-lg form-control border-bottom cc-number bg-transparent border-light text-white"
                            autoComplete="cc-number" placeholder="Full Name *" required />
                        </div>
                      </div>
                      <div className="col-md-6">

                        <div className="form-group">
                          <input type="text"
                            className="input-lg form-control border-bottom bg-transparent border-light text-white"
                            placeholder="Card Number *" required />
                        </div>

                      </div>

                    </div>
                    <div className="row pt-4">

                      <div className="col-md-6">
                        <div className="form-group">
                          <input id="cc-exp" type="tel"
                            className="input-lg form-control border-bottom bg-transparent border-light cc-exp text-white"
                            autoComplete="cc-exp" placeholder="Expiration Date *" required />
                        </div>


                      </div>

                      <div className="col-md-6">
                        <div className="form-group">
                          <input id="cc-cvc" type="tel"
                            className="input-lg form-control border-bottom cc-cvc bg-transparent border-light text-white"
                            autoComplete="off" placeholder="Security Code (CVV) *" required />
                        </div>
                      </div>

                    </div>
                    {type != "withdraw" ?
                      <div className="col-md-6 mt-3">
                        <div className="form-group">
                          <input id="cc-exp" type="number"
                            className="input-lg form-control border-bottom bg-transparent border-light cc-exp text-white"
                            autoComplete="cc-exp" placeholder="Enter Ammount" required />
                        </div>

                      </div>
                      :
                      null
                    }


                    <div className="row pt-5">
                      <div className="col-md-12 mb-2">
                        <span className="text-secondary">By checking the checkbox below, you agree to our terms of use, Privacy
                          Statement.
                        </span>
                      </div>
                    </div>
                    <div className="form-group text-center">
                      <input value={type == "withdraw" ? "Withdraw" : "Add "} type="button" onClick={() => {
                        NotificationManager.success("Withdraw send to your account");
                        handleClose(false)
                      }} className="btn btn-success btn-lg border-0"
                        style={{ "fontSize": "0.8rem" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p id="parent-modal-description">
          <DeleteButton variant="contained" onClick={() => handleClose(false)}>
            Close
          </DeleteButton>
        </p>
      </Box>
    </MyModal>
  );
};
export default PaymentModal;
