import {ChangeEvent, Component, ReactNode} from "react";
import Input from "./Input"
//import Button from "./Button"
import { TiDeleteOutline } from "react-icons/ti"

type TodoProps={
  todo:{checked:boolean,value:string},
  onClick:(newTodo:{checked:boolean,value:string})=>void,
  deleteTodo?:()=>void
}


class Todo extends Component<TodoProps>{

constructor(props:TodoProps){
  super(props)
    this.handleCheckboxClick=this.handleCheckboxClick.bind(this)
}

     handleCheckboxClick(event:ChangeEvent<HTMLInputElement>) {
    const newTodo:{checked:boolean,value:string} ={checked:event.target.checked,value:this.props.todo.value}
   this.props.onClick(newTodo)
    }
 render(): ReactNode {
   const {todo}=this.props;
   
 return (
    <div className="flex items-center justify-between  p-2 border border-indigo-400 max-w-4xl">
   
<div className="flex items-center space-x-2 justify-center">
      <Input 
        type="checkbox"
        checked={todo.checked}
        onChange={this.handleCheckboxClick}
        className="hover:border-green-500 "/>
        
      {!todo.checked && <h1 className="text-lg text-red-500 mb-2" >{todo.value}</h1>  }
        
  {todo.checked==true && <h1 className="text-lg text-green-500 mb-2">{todo.value}</h1>  }
</div>
      <div>
  <TiDeleteOutline onClick={this.props.deleteTodo} className="text-4xl text-red-400"/>
        </div>
    
  </div>
    )
}
}

export default Todo;