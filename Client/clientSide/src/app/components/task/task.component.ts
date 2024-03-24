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
    console.log('Adding Task', this.task);

    if (!this.task.title || !this.task.description || !this.task.priority) {
      alert('please fill in all fields');
      return;
    }
    if (this.task.priority < 1 || this.task.priority > 5) {
      alert('priority must be 1 - 5 ');
      return;
    }
    const token = this.userService.getToken();
    if (token) {
      this.taskService.addTask(this.task, token).subscribe(() => {
        this.task = new Task();
        this.loadTasks();
      });
    }
  }
}
