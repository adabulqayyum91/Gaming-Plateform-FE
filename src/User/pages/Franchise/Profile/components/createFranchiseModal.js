import { Formik } from "formik";
import React from "react";
import moneyIcon from "../../../../../assets/money.png";
import Modal from "../../../../components/topModal/topModal";
import RectangleImgUpload from "../../../../components/rectangleImgUpload/rectangleImgUpload";
import Input from "../../../../../Admin/components/Input/input";
import FormSubmitButton from "../../../../../Admin/components/FormSubmitButton/formSubmitbutton";
import MultiLineField from "../../../../../Admin/components/Input/multiLineField";

export default function CreateFranchiseModal({
  open,
  handleClose,
  handleCreateFranchise,
}) {
  const MoneyIcon = () => (
    <img
      alt=""
      src={moneyIcon}
      style={{
        position: "absolute",
        top: "9px",
        right: "2px",
      }}
    />
  );
  return (
    <Modal open={open} handleClose={handleClose} widthe={540}>
      <Formik
        initialValues={{
          franchiseTitleImage: "",
          franchiseName: "",
          occupation: "",
          yearlyIncome: "",
          address: "",
        }}
        onSubmit={(values) => {
          let formData = new FormData();
          formData.append("franchiseTitleImage", values.franchiseTitleImage);
          formData.append("franchiseName", values.franchiseName);
          formData.append("occupation", values.occupation);
          formData.append("yearlyIncome", values.yearlyIncome);
          formData.append("address", values.address);

          return handleCreateFranchise(formData);
        }}
      >
        {({ values, handleChange, setFieldValue, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <RectangleImgUpload
                name="franchiseTitleImage"
                required={true}
                value={values.franchiseTitleImage}
                onchange={setFieldValue}
              />
              <Input
                placeholder="Grand Prix Name"
                name="franchiseName"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.franchiseName}
              />
              <Input
                placeholder="Occupation (Real Life)"
                name="occupation"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.occupation}
              />
              <Input
                placeholder="Yearly Income"
                name="yearlyIncome"
                type="text"
                required={true}
                onchange={handleChange}
                value={values.yearlyIncome}
                icon={<MoneyIcon />}
              />
              <MultiLineField
                placeholder="Address"
                name="address"
                onchange={handleChange}
                value={values.address}
              />
              <FormSubmitButton
                title={"Create Grand Prix"}
                clickHandler={function () {}}
              />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
