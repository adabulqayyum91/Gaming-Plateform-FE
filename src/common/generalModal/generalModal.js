import { Modal, Box, Button } from "@mui/material";
import { styled } from "@mui/system";

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

const GeneralModal = ({ open, handleClose, text }) => {
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
      <Box sx={{ ...style, width: 400 }}>
        <h5
          id="parent-modal-title"
          style={{ margin: "10px auto", marginBottom: "10%" }}
        >
          {text}
        </h5>
        <p id="parent-modal-description">
          <DeleteButton variant="contained" onClick={() => handleClose(false)}>
            Close
          </DeleteButton>
        </p>
      </Box>
    </MyModal>
  );
};
export default GeneralModal;
