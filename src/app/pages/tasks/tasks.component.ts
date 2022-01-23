import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITask } from 'src/app/interfaces/Tasks';
import { TaskService } from 'src/app/services/task/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  tasks: Array<ITask> = [];

  constructor(private readonly taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService
      .getTasks()
      .subscribe((tasks: Array<ITask>) => (this.tasks = tasks));
  }

  deleteTask(task: ITask) {
    this.taskService
      .deleteTask(task)
      .subscribe(
        () =>
          (this.tasks = this.tasks.filter(
            (taskItem: ITask) => taskItem.id !== task.id
          ))
      );
  }
  toggleTaskReminder(task: ITask) {
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }

  addTask(task: ITask) {
    this.taskService
      .addTask(task)
      .subscribe((task: ITask) => this.tasks.push(task));
  }
}
