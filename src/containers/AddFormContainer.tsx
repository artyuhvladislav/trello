import React  from "react";
import { AddForm as AddFormBase } from "../components";
import { IAddCard, IAddColumn } from "../redux/reduxSlice";

interface IAddFormContainer {
  columnIndex?: number,
  onAddColumn(obj: IAddColumn): void;
  onAddCard(obj: IAddCard): void;
  isEmptyColumn: boolean
}

const AddFormContainer = ({
  columnIndex,
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
  
  const onAdd = () => {
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
