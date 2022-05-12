import React, { useContext } from "react";
import { AppContext } from "./App";

const TodoNav: React.FC = () => {
  const { setDisplay } = useContext(AppContext);
  const onClickDisplay = (display: string, event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    setDisplay(display);

    const navItems = document.querySelectorAll(".nav-item");
    navItems.forEach(navItem => {
      const parent = navItem.closest('li');
      if (parent !== null) {
        parent.classList.remove("current");
      }
    });

    const currentParent = event.currentTarget.closest('li');
    if (currentParent !== null) {
      currentParent.classList.add("current");
    }
  };

  return(
    <ul className="nav nav-pills todo-nav">
      <li role="presentation" className="nav-item all-task current">
        <button className="nav-link" onClick={(event) => onClickDisplay("All", event)}>
          All
        </button>
      </li>
      <li role="presentation" className="nav-item active-task">
        <button className="nav-link" onClick={(event) => onClickDisplay("Active", event)}>
          Active
        </button>
      </li>
      <li role="presentation" className="nav-item completed-task">
        <button
          className="nav-link"
          onClick={(event) => onClickDisplay("Completed", event)}
        >
          Completed
        </button>
      </li>
    </ul>
  )
}

export default TodoNav;