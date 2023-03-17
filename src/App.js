import React, { useState } from "react";
import { nanoid } from "nanoid";

function App() {
	const [list, setList] = useState([]);
	const [input, setInput] = useState("");

	function addTodo(todo) {
		const newTodo = { id: nanoid(), todo: todo };

		setList([...list, newTodo]);
		setInput("");
	}

	function handleInputChange(event) {
		setInput(event.target.value);
	}

	function deleteTodo(id) {
		const newList = list.filter((todo) => todo.id !== id);
		setList(newList);
	}

	return (
		<div>
			<header>
				<h1>TodoPad</h1>
			</header>
			<input value={input} onChange={handleInputChange} />
			<button onClick={() => addTodo(input)}>Add</button>
			<ul>
				{list.map((todo) => (
					<li key={todo.id}>
						{todo.todo}
						<button onClick={() => deleteTodo(todo.id)}>&times;</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default App;
