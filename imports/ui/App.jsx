import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.jsx';

//App component - represents the whole app
class App extends Component {

	//Initial state mainly
	constructor(props){
		super(props);


		this.state = {
			hideCompleted: false,
		};
	}

	handleSubmit(event){
		event.preventDefault();

		//Find the text field via the React ref
		const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

		//Added it to the database if it's not empty
		if (text != ''){
			//Create and submit the new data transffered from the text field
			Tasks.insert({
				text,createdAt:  new Date(), //current time
			});	
		}

		//Clear up after yourself 
		ReactDOM.findDOMNode(this.refs.textInput).value = '';
	}

	//Change the state of the hideCompleted to false/true, so render method can re-render from renderTasks()
	toggleHideCompleted() {
		this.setState({
			hideCompleted: !this.state.hideCompleted,
		});
	}
	//Use MongoDB to get the date instead
	// getTasks(){
	// 	return [
	// 		{ _id: 1, text: 'Task 1'},
	// 		{ _id: 2, text: 'Task 2'},
	// 		{ _id: 3, text: 'Task 3'}
	// 	];
	// }

	renderTasks(){
		//Check whether tasks had been completed or not
		let filteredTasks = this.props.tasks;

		//If the client clicked on the Hide Completed Tasks checked box, then perform filtering
		if(this.state.hideCompleted){
			filteredTasks = filteredTasks.filter(task => !task.checked);
		}
		return filteredTasks.map((task) => (
			<Task key={task._id} task={task} />
		));
		// Well, I wished it's that simple to return all the tasks
		// return this.props.tasks.map((task) => (			
		// 	<Task key={task._id} task={task} />
		// ));
	}

	render(){
		//Added a tickbox button to hide all the completed tasks
		//When it clicked, it performed toggleHideCompleted function
		return (
			<div className="container">
				<header>
					<h1> Todo List</h1>

					
					<label className="hide-completed">
						<input
							type="checkbox"
							readOnly
							checked={this.state.hideCompleted}
							onClick={this.toggleHideCompleted.bind(this)}
						/>
					Hide Completed Tasks
					</label>


					<form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
						<input
					    	type="text"
					    	ref="textInput"
							placeholder="Type to add new tasks"
						/>
					</form>
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

/*
* Create a "data container" to feed Meteor's reactive data 
* into React's component hierarchy from Mongo database
* Data from a Meteor collection inside a React component
*/ 
export default createContainer(() => {
	// Change "createdAt" attribute to negative to the task in descending order (The latest first)
	return {
		tasks: Tasks.find({}, {sort:{ createdAt: -1 }}).fetch(),
	};
}, App);


