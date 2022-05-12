import React, { createContext, useState } from 'react';
import AddItem from './AddItem';
import './App.css';
import ListItem from './ListItem';
import TodoNav from './TodoNav';


export interface myTodoListInterface {
  todo: string,
  status: "Active" | "Completed"
}

const useValue = () => {
  const todoLocalStorage: string = localStorage.getItem('myTodoList') || '[]';
  const [todo, setTodo] = useState<myTodoListInterface[]>(JSON.parse(todoLocalStorage));
  const [display, setDisplay] = useState<string>("All"); 

  return {
    todo,
    setTodo,
    display,
    setDisplay
  }
}

export const AppContext = createContext({} as ReturnType<typeof useValue>);

const App: React.FC = () => {
  return(
    <AppContext.Provider value={useValue()}>
    <div className="App">
      <div className="page-content page-container" id="page-content">
        <div className="padding">
          <div className="row-fluid container d-flex justify-content-center">
            <div className="col-md-12">
              <div className="card px-3">
                <div className="card-body">
                  <h4 className="card-title">Todo list by JT</h4>
                  <AddItem />
                  <TodoNav />
                  <ListItem />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </AppContext.Provider>
  )
}

export default App;
