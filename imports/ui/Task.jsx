import React, { Component, PropTypes } from 'react';

import { Tasks } from '../api/tasks.js';

//Task component, represent a task
export default class Task extends Component{	

	//Activate the selected data in $set in MongoDB when the task is chosen 
	toggleChecked(){				
		Tasks.update(this.props.task._id,{
			$set: { checked: !this.props.task.checked },
		});
	}

	//Remove the selected data from MongoDB by its id
	deleteThisTask(){
		Tasks.remove(this.props.task._id);
	}

	render() {		
		//Change the given task's className when chosen on/off, to be able to style it
		const taskClassName = this.props.task.checked ? 'checked' : '';
		
		return (
			//Include a new delete button and selected block to perform option for the given task/data
			<li className={taskClassName}>
				<button className="delete" onClick={this.deleteThisTask.bind(this)}>
					&times;
				</button>

				<input
					type="checkedBox"
					readOnly
					checked={this.props.task.checked}
					onClick={this.toggleChecked.bind(this)}
				/>

				<span className="text">{this.props.task.text}</span>
			</li>
			

		// 	//Well, it seems it's not that simple anymore...
			// <li>{this.props.task.text}</li>	
		);
	}
}


Task.propTypes = {
	// This component gets the task to display through a React prop.
	// We can use propTypes to indicate it is required
	task: PropTypes.object.isRequired,
}