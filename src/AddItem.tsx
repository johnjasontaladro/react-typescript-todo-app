import React, { useRef, useContext } from "react";
import { AppContext, myTodoListInterface } from "./App";

const AddItem: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { todo, setTodo } = useContext(AppContext);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const newValue: myTodoListInterface = {
      todo: "" + (inputRef === null || inputRef.current === null ? "" : inputRef.current.value),
      status: "Active"
    }
    setTodo([...todo, newValue]);

    if (!(inputRef === null || inputRef.current === null)) {
      inputRef.current.value = "";
    }

    // set local storage
    localStorage.setItem('myTodoList', JSON.stringify([...todo, newValue]));
  }

  return(
    <form onSubmit={onSubmit}>
      <div className="add-items d-flex">
        <input
          type="text"
          className="form-control todo-list-input"
          placeholder="What do you need to do today?"
          ref={inputRef}
        />
        <button
          type="submit"
          className="add btn btn-primary font-weight-bold todo-list-add-btn"
        >
          Add
        </button>
      </div>
    </form>
  )
}

export default AddItem;