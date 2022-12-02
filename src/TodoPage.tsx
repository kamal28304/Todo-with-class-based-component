import React, { ChangeEvent, Component } from 'react';
import Todo from "./Todo"
import DoneTodo from './DoneTodo';
import Button from "./Button"
import Input from "./Input"

type Todos = {
  checked: boolean;
  value: string;
  
}
type TodoState = {
  click: boolean;
  todos: any[]; 
  inputValue: string;
  doneTodos:any[];
}




class TodoPage extends Component<Todos, TodoState> {
  constructor(props: Todos) {
    super(props)

    this.onCheckboxClick = this.onCheckboxClick.bind(this)
    this.onDoneCheckboxClick = this.onDoneCheckboxClick.bind(this)
    this.handleInputChangeValue=this.handleInputChangeValue.bind(this)
    this.deleteTodo = this.deleteTodo.bind(this)
    this.deleteDoneTodo = this.deleteDoneTodo.bind(this)
    this.openForm = this.openForm.bind(this)
    this.closeForm = this.closeForm.bind(this)
    this.addToDo=this.addToDo.bind(this)

    this.state = {
      click: false,
      todos: [],
      inputValue: "",
      doneTodos:[],
      
    }
  }

  handleInputChangeValue(event: ChangeEvent<HTMLInputElement>) {
    this.setState({ inputValue: event.target.value })
  }

  addToDo(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if(this.state.inputValue===""){
      return;
    }
    this.setState({ todos: [...this.state.todos, { checked: false, value: this.state.inputValue}],inputValue:"", click:false })
    
  }
   openForm() {
    this.setState({ click: true })
  }

  closeForm() {
    this.setState({ click: false });
    this.setState({ inputValue: "" })
  }



  onCheckboxClick(todo:Todos) {
    console.log("todo is ",todo)
    const filteredTodo =
      this.state.todos.filter((t) => t.value !== todo.value)
    this.setState({ todos: filteredTodo,doneTodos:[...this.state.doneTodos,todo] })

  }
  onDoneCheckboxClick(todo:Todos) {
    console.log("todo is ",todo)
    const filteredTodo =
      this.state.todos.filter((t) => t.value !== todo.value)
    this.setState({ doneTodos: filteredTodo,todos:[...this.state.todos,todo] })

  }
  
  deleteTodo(index: number) {
    const newTodo = this.state.todos
    console.log("newTodo", newTodo)
    newTodo.splice(index, 1)
    console.log("newTodo", newTodo)
    this.setState({ todos: [...newTodo] });
  }
 deleteDoneTodo(index: number) {
    const newTodo = this.state.doneTodos
    console.log("newTodo", newTodo)
    newTodo.splice(index, 1)
    console.log("newTodo", newTodo)
    this.setState({ doneTodos: [...newTodo] });
  }
  
  render(): React.ReactNode {
    const { todos, inputValue, click,doneTodos } = this.state;


    return (
      <div >
        <div className="shadow-lg p-3 ">
          <h1 className="text-3xl font-serif font-bold text-gray-700">My ToDo</h1>
        </div>

        <div className="m-5">
          <h1 className="text-3xl font-mono font-bold text-gray-700 my-4">Things to get done</h1>
          {todos.length > 0 ? <h1 className="text-xl font-serif font-bold text-gray-700 my-3">Things to Do</h1> : <h1 className="text-xl font-serif font-bold text-gray-700">No todos here!</h1>}
          {todos.filter((t) => {
            return t.checked !== true;
          }).map((item, index) => {
            return (

              <Todo
                key={item.value}
                todo={item}
                onClick={this.onCheckboxClick}
                deleteTodo={() => this.deleteTodo(index)}

              />

            )
          })}

          {click && <form onSubmit={this.addToDo} className="shadow-xl  rounded-md w-full space-y-4 p-3 my-4 max-w-4xl">
            <h1 className="text-xl text-gray-600 ">Create a ToDo</h1>
            <div className="flex flex-col space-y-4">
              <Input
                type="text"
                value={inputValue}
                className="self-start px-5 rounded-lg"
                placeholder="Add an todo "
                onChange={this.handleInputChangeValue} />
              <div className="flex space-x-10">
                <Button
                  className="self-start my-4 bg-green-500" type="submit">Save</Button>

                <Button
                  type="button"
                  className="my-4 hover:bg-red-700 bg-red-500"
                  onClick={this.closeForm}>Cancel</Button>
              </div>
            </div>
          </form>}

          {!click && <Button className="hover:bg-green-400 bg-indigo-500 mt-5" onClick={this.openForm}>Add ToDo +</Button>}
          {doneTodos.length > 0 && <h1 className="text-xl font-serif font-bold text-gray-700 my-3">Things Done</h1>}

          {doneTodos.map((item,index) => {
            return (

              <DoneTodo
                key={item.value}
                todo={item}
                onClick={this.onDoneCheckboxClick}
              deleteTodo={() => this.deleteDoneTodo(index)}
              />
            )
          })}



          {doneTodos.length == 0 && <h1 className="text-xl font-serif font-bold text-gray-700 my-3">No todos here!</h1>}
        </div>
      </div>
    );

  }
}


export default TodoPage;