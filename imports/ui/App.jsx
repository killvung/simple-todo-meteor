import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

//App component - represents the whole app
class App extends Component {

	//Use MongoDB to get the date instead
	// getTasks(){
	// 	return [
	// 		{ _id: 1, text: 'Task 1'},
	// 		{ _id: 2, text: 'Task 2'},
	// 		{ _id: 3, text: 'Task 3'}
	// 	];
	// }

	renderTasks(){
		return this.props.tasks.map((task) => (			
			<Task key={task._id} task={task} />
		));
	}

	render(){
		return (
			<div className="container">
				<header>
					<h1> Todo List</h1>
				</header>

				<ul>
					{this.renderTasks()}
				</ul>
			</div>
		);
	}
}

App.propTypes = {
	tasks: PropTypes.array.isRequired,
};

export default createContainer(() => {
	return {
		tasks: Tasks.find({}).fetch(),
	};
}, App);

