import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ITask } from 'src/app/interfaces/Tasks';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
})
export class AddTaskComponent implements OnInit {
  text: string = '';
  day: string = '';
  reminder!: boolean;
  showAddTask!: boolean;

  @Output() onAddTask: EventEmitter<ITask> = new EventEmitter();

  constructor(private uiService: UiService) {
    this.uiService.onToggle().subscribe((value) => (this.showAddTask = value));
  }

  ngOnInit(): void {}

  onSubmit() {
    if (!this.text) return alert('Please add a task name');
    if (!this.day) return alert('Please add a  Date & Time');

    const newTask: ITask = {
      text: this.text,
      day: this.day,
      reminder: this.reminder,
    };
    this.onAddTask.emit(newTask);
    this.clearForm();
  }

  clearForm() {
    this.text = '';
    this.day = '';
    this.reminder = false;
  }
}
