import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/reducers';
import { Task } from 'src/app/store/model/task.model';
import { v4 as uuid } from 'uuid';
import { createTask } from 'src/app/store/actions/tasks.action';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  file = null;
  public taskForm = this.formBuilder.group({
    title: [''],
    description: ['']
  });

  constructor(private store: Store<AppState>, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  public onSubmit(submittedForm) {
    console.log(submittedForm.value);

    const task: Task = { id: uuid(), title: submittedForm.value.title, description: submittedForm.value.description, file: this.file };
    this.store.dispatch(createTask({ task }));

  }
  public attachFiles(event): void {
    this.file = event[0];
  }

}
