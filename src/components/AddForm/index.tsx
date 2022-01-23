import React from "react";
import { Button, Card } from "..";
import addSvg from "../../assets/add.svg";
import clearSvg from "../../assets/clear.svg";
import "./AddForm.scss";

interface IAddForm {
  value: any,
  showForm: any,
  setValue: any,
  textareaRef: any,
  setShowForm: any,
  onAdd: any,
  isEmptyColumn: boolean
}

const AddForm = ({
  value,
  showForm,
  setValue,
  textareaRef,
  setShowForm,
  onAdd,
  isEmptyColumn
}: IAddForm) => {


  return showForm ? (
    <div className="add-form">
      <div className="add-form__input">
        <Card>
          <textarea
            onChange={e => setValue(e.target.value)}
            value={value}
            placeholder={
              isEmptyColumn
                ? "Write the name of the column"
                : "Write the name of the card"
            }
            ref={textareaRef}
            rows={3}
          />
        </Card>
        <div className="add-form__bottom">
          <Button onClick={onAdd} setShowForm={setShowForm}>
            {isEmptyColumn ? "add a column" : "add a card"}
          </Button>
          <img
            onClick={setShowForm.bind(this, false)}
            className="add-form__bottom-clear"
            src={clearSvg}
            alt="Clear svg icon"
          />
        </div>
      </div>
    </div>
  ) : (
    <div className="add-form__bottom">
      <div
        onClick={setShowForm.bind(this, true)}
        className="add-form__bottom-add-btn"
      >
        <img src={addSvg} alt="Add svg icon" />
        <span>
          {isEmptyColumn
            ? "add new column"
            : "add new card"}
        </span>
      </div>
    </div>
  );
};

export default AddForm;