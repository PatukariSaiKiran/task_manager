import { Component, OnInit } from '@angular/core';
import { Task } from '../../../models/task.model';
// Ensure the correct path to TaskService is used
import { TaskService } from '../../../services/task.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  tasks: Task[]=[]; // Initialize tasks as an empty array to hold all the tasks coming from the backend

  newTask : Task = {
  title: '',
  description :'',    // here i created a new task object which will hold values from  your form input
  // [(ngModel)] = in html will blind user input to the object
  // so that when user clicks on add task button, the values will be added to the newTask object
  // and then we can send this object to the backend
  completed: false
};
  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
 this.taskService.getTasks().subscribe(data =>{  // getTasks() is a method from the service that returns an observable of tasks.
  //subscribe() waits for the response from the backend and then executes the callback function with the data received.
  this.tasks = data;
  console.log('Tasks loaded:', this.tasks);
 })
  }

  addTask() {
    if (!this.newTask.title) return; // Prevent adding empty tasks
  this.taskService.addTask(this.newTask).subscribe(() => {
    this.newTask = { title: '', description: '', completed: false };
    this.loadTasks(); // Reload tasks after adding a new one
  });
  }
  deleteTask(id: string){
    this.taskService.deleteTask(id).subscribe(() => { // when delete button is clicked, this method is called with the taks's ID.
      // sends a request to the backend to delete the task with the given ID.
      //after the task is deleted, we reload the tasks to update the list.
      this.loadTasks();
    });
  }

  markCompleted(task :Task){
    this.taskService.updateTask(task._id!, { completed: true}).subscribe(() => { //marks a task as completed. Sends an updateTask() call with just {completed: true}
      // Reloads list after backend confirms success
      this.loadTasks(); // Reload tasks after marking one as completed
    })
  }

}
