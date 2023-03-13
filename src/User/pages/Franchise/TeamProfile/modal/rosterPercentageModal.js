import { Formik } from "formik";
import React from "react";
import Modal from "../../../../components/topModal/topModal";
import Input from "../../../../../Admin/components/Input/input";
import FormSubmitButton from "../../../../../Admin/components/FormSubmitButton/formSubmitbutton";
import { capitalize } from "../../../../../utils/apisauce";

export default function RosterPercentageModal({
  perctObj,
  handleClose,
  confirmPerctHandler,
}) {
  return (
    <Modal open={perctObj?.open} handleClose={handleClose}>
      <Formik
        initialValues={{
          percentage: perctObj?.percentage,
        }}
        onSubmit={(values) =>
          confirmPerctHandler({
            ...values,
            id: perctObj?.id,
            type: perctObj?.title,
          })
        }
      >
        {({ values, handleChange, handleSubmit }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Input
                placeholder={`Update ${capitalize(perctObj?.title)}%`}
                name="percentage"
                type="number"
                required={true}
                onchange={handleChange}
                value={values.percentage}
              />
              <FormSubmitButton
                title={"Update"}
                clickHandler={function () {}}
              />
            </form>
          );
        }}
      </Formik>
    </Modal>
  );
}
