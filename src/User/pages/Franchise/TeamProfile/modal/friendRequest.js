import { Formik } from "formik";
import React from "react";
import Modal from "../../../../components/topModal/topModal";
import SelectField from "../../../../../Admin/components/Input/selectField";
import FormSubmitButton from "../../../../../Admin/components/FormSubmitButton/formSubmitbutton";

export default function joinTeamModal({
  open,
  friends,
  handleClose,
  handleTeamInviteToFriend,
}) {
  const friendsArr = [];
  friends.map((x) => {
    friendsArr.push({ _id: x._id, gameName: x.fullName });
  });

  return (
    <Modal open={open} handleClose={handleClose} widthe={500}>
      <Formik
        initialValues={{
          friendId: "",
        }}
        onSubmit={(values) => handleTeamInviteToFriend(values)}
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <div style={{ marginTop: "7%" }}></div>
              <SelectField
                placeholder="Select Friend"
                name="friendId"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.friendId}
                items={friendsArr}
              />
              <FormSubmitButton title={"Add"} clickHandler={function () {}} />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
