// template element variable
let template_todo_list = document.querySelector('#template-todo-list');

// declaration of variable fot the todo list
let todo = document.querySelector('.todo');
let todo_header = todo.querySelector('.todo-header');
let todo_lists = todo.querySelector('.todo-lists');
let todo_wrapper = todo.querySelector('.todo-wrapper');
let todo_add_button = todo.querySelector('.todo-add-button');
let activeOperationTodo = '';
let activeOperationTodoCheckboxId = '';
let activeOperationTodoMenuId = '';
let lastAddTodoId = '';

// declaration of variable for the model
let models = document.querySelectorAll('.model');
let add_update_model = document.querySelector('.model.model-add-update');
let add_update_model_button = add_update_model.querySelector('button');
let delete_model = document.querySelector('.model.model-delete');
let delete_model_button_cancel = document.querySelector(
	'.model.model-delete .cancel'
);
let delete_model_button_delete = document.querySelector(
	'.model.model-delete .delete'
);

// header time setting variable
let current_date = todo_wrapper.querySelector('.date> p');
let current_month = todo_wrapper.querySelector('.date .month b');
let current_year = todo_wrapper.querySelector('.date .year');
let current_day = todo_wrapper.querySelector('.day small');

let months = new Array();
months[0] = 'JAN';
months[1] = 'FEB';
months[2] = 'MAR';
months[3] = 'APR';
months[4] = 'MAY';
months[5] = 'JUN';
months[6] = 'JUL';
months[7] = 'AUG';
months[8] = 'SEP';
months[9] = 'OCT';
months[10] = 'NOV';
months[11] = 'DEC';

let days = new Array();
days[0] = 'SUNDAY';
days[1] = 'MONDAY';
days[2] = 'TUESDAY';
days[3] = 'WEDNESDAY';
days[4] = 'THURSDAY';
days[5] = 'FRIDAY';
days[6] = 'SATURDAY';

var today = new Date();
var date = String(today.getDate()).padStart(2, '0');
var month = months[today.getMonth()];
var day = days[today.getDay()];
var year = today.getFullYear();

const set_current_date = () => {
	current_date.innerText = date;
	current_month.innerText = month;
	current_date.innerText = date;
	current_day.innerText = day;
};

set_current_date();

// todo_lists update function
const todo_lists_update = () => {
	todo_lists = document.querySelector('.todo_lists');
	todo_list = document.querySelectorAll('.todo_list');
};

// add event listener to the popup close button
models.forEach((model) => {
	let close_button = model.querySelector('.close');
	close_button.addEventListener('click', function (event) {
		model.classList.contains('active') ? model.classList.remove('active') : '';
	});
});

// adding the esc key to close the model when there is active
document.addEventListener('keyup', function (event) {
	if (event.key === 'Escape') {
		models.forEach((model) => {
			model.classList.contains('active')
				? model.classList.remove('active')
				: '';
		});
	}

	if (event.key === 'Enter') {
		if (event.ctrlKey) {
			models.forEach((model) => {
				if (model.classList.contains('active')) {
					if (model.querySelector('textarea') !== null) {
						let textarea = model.querySelector('textarea').value.length;
						let button = model.querySelector('button');
						textarea > 0 ? button.click() : '';
					}
				}
			});
		}
	}
});

const add_button_click = () => {
	let button = add_update_model.querySelector('button');
	button.innerText = 'Add';
	let textarea = add_update_model.querySelector('textarea');
	textarea.value = '';
	textarea.focus();
	add_update_model.classList.add('active');
};

const edit_button_click = (text = '') => {
	let button = add_update_model.querySelector('button');
	button.innerText = 'Edit';
	let textarea = add_update_model.querySelector('textarea');
	textarea.value = text;
	textarea.focus();
	add_update_model.classList.add('active');
};

const delete_button_click = () => {
	delete_model.classList.add('active');
};

const last_add_todo = (id = '') => {
	lastAddTodoId = id;
};

const activeTodo = (element = '', checkbox = '', menu = '') => {
	activeOperationTodo = element;
	activeOperationTodoCheckboxId = checkbox;
	activeOperationTodoMenuId = menu;
};

const addListenerTodo = (todo) => {
	let wrapper = todo.querySelector('.wrapper');
	let menuInput = todo.querySelector('.menu input');
	let del = todo.querySelector('.open-menu > ul > .delete');
	let edit = todo.querySelector('.open-menu > ul > .edit ');
	let text = todo.querySelector('.text');
	edit.addEventListener('click', function () {
		activeOperationTodo = todo;
		edit_button_click(text.innerText);
		menuInput.checked = false;
	});
	del.addEventListener('click', function () {
		activeOperationTodo = todo;
		delete_button_click();
		menuInput.checked = false;
	});
};

const create_dynamic_todo = (text) => {
	if (text === '') {
		return false;
	}

	/// Clone the new row and insert it into the table
	let clone = template_todo_list.content.cloneNode(true);

	let wrapper = clone.querySelector('.wrapper');
	let checkboxInput = clone.querySelector('.checkbox input');
	let todo_list = clone.querySelector('#todo-list');
	let checkbox = clone.querySelector('.checkbox');
	let textarea = clone.querySelector('.text');
	let menu = clone.querySelector('.menu');
	let menuInput = clone.querySelector('.menu input');

	let random_id_checkbox = (((1 + Math.random()) * 0x10000) | 0)
		.toString(16)
		.substring(1);

	let random_id_menu = (((1 + Math.random()) * 0x10000) | 0)
		.toString(16)
		.substring(1);

	let random_id_todo_list = (((1 + Math.random()) * 0x10000) | 0)
		.toString(16)
		.substring(1);

	//add new id to the todo_list
	todo_list.id = random_id_todo_list;

	// adding new id to the checkbox
	checkbox.querySelector('input').setAttribute('id', random_id_checkbox);
	checkbox.querySelector('label').htmlFor = random_id_checkbox;

	// adding new id to the checkbox
	menu.querySelector('input').setAttribute('id', random_id_menu);
	menu.querySelector('label').htmlFor = random_id_menu;

	// adding new text for new element
	textarea.innerText = text;

	// adding new element to the DOM
	if (todo_lists.querySelector('.todo-list') === null) {
		todo_lists.appendChild(clone);
		menuInput.checked = false;
	} else {
		let append_element = todo_lists.querySelector('.todo-list');
		todo_lists.insertBefore(clone, append_element);
		menuInput.checked = false;
	}

	/**
	 * ? 1. adding the checkbox event listener
	 * ? 2. adding the menu event listener
	 */

	// task complete vent listeners
	checkbox.addEventListener('change', function (event) {
		wrapper.classList.toggle('active');
	});
	textarea.addEventListener('click', function () {
		wrapper.classList.toggle('active');
		checkboxInput.checked = !checkboxInput.checked;
	});

	last_add_todo(random_id_todo_list);

	addListenerTodo(document.getElementById(lastAddTodoId));
};

// adding event listener to add todo button
todo_add_button.addEventListener('click', function addTodo(event) {
	add_button_click();
});

// adding element with submit event listener on the add update model
add_update_model_button.parentElement.addEventListener(
	'submit',
	function (event) {
		event.preventDefault();
		add_update_model.classList.contains('active')
			? add_update_model.classList.remove('active')
			: '';
		if (add_update_model_button.innerText === 'ADD') {
			let form = event.target;
			create_dynamic_todo(form.elements[0].value);
		} else {
			let form = event.target;
			let new_text = form.elements[0].value;
			let text = activeOperationTodo.querySelector('.text');
			text.innerText = new_text;
		}
	}
);

// confirming for removing todo or not
delete_model_button_cancel.addEventListener('click', function () {
	delete_model.classList.contains('active')
		? delete_model.classList.remove('active')
		: '';
});
delete_model_button_delete.addEventListener('click', function () {
	activeOperationTodo.classList.add('falling');
	activeOperationTodo.addEventListener('animationend', function () {
		activeOperationTodo.remove();
	});
	delete_model.classList.contains('active')
		? delete_model.classList.remove('active')
		: '';
});
