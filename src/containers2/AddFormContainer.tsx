import React, { useState, useRef, useEffect } from "react";
import { AddForm as AddFormBase } from "../components";

interface IAddFormContainer {
  columnIndex: any,
  children?: any,
  onAddCard: any,
  onAddColumn: any,
  isEmptyColumn: any
}

const AddFormContainer = ({
  columnIndex,
  children,
  onAddCard,
  onAddColumn,
  isEmptyColumn
}: IAddFormContainer) => {
  const [showForm, setShowForm] = React.useState(false);
  const [value, setValue] = React.useState("");
  const textareaRef = React.useRef<HTMLHeadingElement>(null);

  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [showForm]);

  
  const onAdd = (buttonRef: any) => {
  //  елси клик таргет !== баттон => setshow(false)
    // debugger;
    // if(buttonRef.current.contains()){
    //   alert(123)
    // }
    if(!value) return
    if (isEmptyColumn) {
      onAddColumn({ title: value, cards: []});
    } else {
      onAddCard({ columnIndex, value });
    }
    setValue("");
    setShowForm(false);
  };

  return (
    <AddFormBase
      onAdd={onAdd}
      showForm={showForm}
      setShowForm={setShowForm}
      value={value}
      setValue={setValue}
      textareaRef={textareaRef}
      isEmptyColumn={isEmptyColumn}
    />
  );
};

export default AddFormContainer;
