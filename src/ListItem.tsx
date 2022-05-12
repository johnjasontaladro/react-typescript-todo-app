import React, { useContext } from "react";
import { AppContext, myTodoListInterface } from "./App";

const ListItem: React.FC = () => {
  const { todo, setTodo } = useContext(AppContext);
  const { display } = useContext(AppContext);

  let todoListItem: myTodoListInterface[] = [];

  switch (display) {
    default:
    case "All":
      todoListItem = todo;
      break;
    case "Active":
      todoListItem = todo.filter((item, index) => {
        return item.status === "Active";
      });
      break;
    case "Completed":
      todoListItem = todo.filter((item, index) => {
        return item.status === "Completed";
      });
      break;
  }

  const onClickRemove = (event: React.SyntheticEvent<EventTarget>) => {
    if (!(event.target instanceof HTMLElement)) {
      return;
    }

    const selectedTodo: string | undefined = event.target.dataset.todo;
    const newTodo = todo.filter((item, index) => {
      return item.todo !== selectedTodo;
    });

    setTodo(newTodo);

    // set local storage
    localStorage.setItem('myTodoList', JSON.stringify(newTodo));
  };

  const onChangeComplete = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTodo: myTodoListInterface[] = [];
    const selectedTodo: string | undefined = event.target.dataset.todo;

    todo.forEach((element) => {
      let status = element.status;

      if (element.todo === selectedTodo) {
        status = event.target.checked ? "Completed" : "Active";
      }

      newTodo.push({
        todo: "" + element.todo,
        status: status,
      });
    });

    setTodo(newTodo);

    // set local storage
    localStorage.setItem('myTodoList', JSON.stringify(newTodo));
    

  }

  return(
    <div className="list-wrapper">
      {!todoListItem.length && (
        <div className="alert alert-secondary mt-4">No list available!</div>
      )}
      <ul className="d-flex flex-column-reverse todo-list">
        {todoListItem.map((item, key) => (
          <li
            key={key.toString() + item}
            className={item.status === "Completed" ? "completed" : ""}
          >
            <div className="form-check">
              <label className="form-check-label">
                <input
                  className="checkbox"
                  type="checkbox"
                  onChange={onChangeComplete}
                  data-todo={item.todo}
                  checked={item.status === "Completed"}
                />{" "}
                {item.todo}
                <i className="input-helper"></i>
              </label>
            </div>
            <i
              className="remove mdi mdi-close-circle-outline"
              onClick={onClickRemove}
              data-todo={item.todo}
            ></i>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListItem;