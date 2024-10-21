import React, { useState } from "react";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editing, setEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  // in this function i check if the input if is not empty so i add new todo, and i set input to '' for the next one :)
  function addTodo() {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { text: newTodo, completed: false }]);
      setNewTodo("");
    }
  }
  // in this function i check if the Enter key is pressed call addTodo function
  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addTodo();
    }
  }
//clicking on todos(or check box) flip betwen finish or not finished
  function toggleCompletion(index) {
    const updatedTodos = [...todos];
    updatedTodos[index].completed = !updatedTodos[index].completed;
    setTodos(updatedTodos);
  }
// editing the specefic todo by todos[index].text and put on editig mode with setEditingText
  function startEditing(index) {
    setEditing(index);
    setEditingText(todos[index].text);
  };
//we connect it to save button, it update the todo text by updatedTodos[index].text to editingText
  function saveEdit(index) {
    const updatedTodos = [...todos];
    updatedTodos[index].text = editingText;
    setTodos(updatedTodos); // we save the text by setTodos
    setEditing(null); //and restet editing mode by puttin it null
  };
// as always copy the array foravoid mutating, remove specifid index with help of splice 
  function deleteTodo(index) {
    const updatedTodos = [...todos]; 
    updatedTodos.splice(index, 1);   
    setTodos(updatedTodos);          
  }
  

  return (
    <div className="container">
      <h2>TodoList</h2>

      <div style={{ display: "flex" }}>
        <input
          type="text"
          value={newTodo} //two way bining in here, getting element down there put it back here :D
          onChange={(event) => setNewTodo(event.target.value)} //in here we use anonymos func if we dont it runs immidietly  instead of waiting user to typ
          onKeyPress={handleKeyPress} //for the Enter
          placeholder="Add a new todo..."
        />
        <button onClick={addTodo} style={{ marginLeft: "10px" }}>
          Add
        </button>
      </div>

{/* HEre we start showing oour Todolist */}
      <ul>
        {todos.map((todo, index) => (
          <li key={index} className={todo.completed ? "completed" : undefined}> 
            <input //in here we connect to toggleCompletion to check out or uncheck todos
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompletion(index)}
            />
            {editing === index ? (  //with this condtion here we if we are in editing mode it shows just save button
              <>
                <input
                  type="text"
                  value={editingText}
                  onChange={(event) => setEditingText(event.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
              </>
            ) : ( // but in here shows edit and delet button becuase we are not editing
              <>
                <span> 
                    {/* index +1 is for starting todos from 1 not zero */}
                  {index + 1}. {todo.text} 
                </span>
                <button onClick={() => startEditing(index)}>Edit</button>
                <button onClick={() => deleteTodo(index)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
