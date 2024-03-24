import { Component, OnInit } from '@angular/core';
import Task from '../../model/task.model';
import { TaskServiceService } from '../../services/task-service.service';
import { UserServiceService } from '../../services/user.service.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  tasks: Task[] = [];
  task = new Task();

  constructor(
    private taskService: TaskServiceService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.loadTasks(); // Load tasks initially
  }

  deleteTask(taskId: string): void {
    const token = this.userService.getToken();
    if (token) {
      this.taskService.deletetask(Number(taskId), token).subscribe(() => {
        this.loadTasks(); // Reload tasks after deletion
      });
    }
  }

  private loadTasks(): void {
    const token = this.userService.getToken();
    if (token) {
      this.taskService.getalltask(token).subscribe((data) => {
        this.tasks = data as Task[];
      });
    }
  }

  addTask(): void {
    const token = this.userService.getToken();
    if (token) {
      this.taskService.addTask(this.task, token).subscribe(() => {
        this.task = new Task(); // Clear the task object after adding
        this.loadTasks(); // Reload tasks to reflect changes
        alert("add new task")
      });
    }
  }
}
