import { Modal, Box } from "@mui/material";
import { styled } from "@mui/system";

import classes from "./topModal.module.scss";

const MyModal = styled(Modal)({
  "& .MuiBox-root": {
    background: "#1a1a1a",
  },
});

const GeneralModal = ({ open, handleClose, children, widthe, maxHait }) => {
  const style = {
    background: "#1a1a1a",
    color: "whitesmoke",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "450px",
    bgcolor: "background.paper",
    border: "1px solid #FFFFFF4D",
    borderRadius: "8px",
    maxHeight: maxHait ? maxHait : null,
    overflowY: "scroll",
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
      <Box
        sx={{ ...style, width: widthe ? widthe : 400 }}
        className={classes.modalRoot}
      >
        {children}
      </Box>
    </MyModal>
  );
};
export default GeneralModal;
