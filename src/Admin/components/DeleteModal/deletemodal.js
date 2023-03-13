import { Modal, Box, Button } from "@mui/material";
import { styled } from "@mui/system";

const MyModal = styled(Modal)({
  "& .MuiBox-root": {
    background: "#1a1a1a",
  },
});

const CancelButton = styled(Button)({
  backgroundColor: ` #4A4A4A !important`,
  margin: "4px",
  "&:hover": {
    backgroundColor: `#4A4A4A important`,
  },
});
const DeleteButton = styled(Button)({
  backgroundColor: "#F26826 !important",
  margin: "4px",
  "&:hover": {
    backgroundColor: `#F26826 important`,
  },
});

const DeleteModal = ({ open, handleClose, confirmDeleteHandler }) => {
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
    border: "2px solid #000",
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
        <h5 id="parent-modal-title">Are you sure ?</h5>
        <p id="parent-modal-description">
          <CancelButton variant="contained" onClick={() => handleClose(false)}>
            Cancel
          </CancelButton>
          <DeleteButton variant="contained" onClick={confirmDeleteHandler}>
            Yes
          </DeleteButton>
        </p>
      </Box>
    </MyModal>
  );
};
export default DeleteModal;
