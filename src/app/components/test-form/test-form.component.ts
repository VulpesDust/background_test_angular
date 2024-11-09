import {Component} from '@angular/core';
import {TestFormService} from '../../services/test-form.service';
import {ActivatedRoute} from '@angular/router';
import {TestInputComponent} from '../test-input/test-input.component';
import {TestSelectComponent} from '../test-select/test-select.component';
import {TestNumberComponent} from '../test-number/test-number.component';
import {TestCheckboxComponent} from '../test-checkbox/test-checkbox.component';
import {
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-test-form',
  standalone: true,
  imports: [
    TestInputComponent,
    TestSelectComponent,
    TestNumberComponent,
    TestCheckboxComponent,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './test-form.component.html',
  styleUrl: './test-form.component.scss'
})
export class TestFormComponent {

  testInputs: TestInputComponent[] = [];

  formGroup: FormGroup = new FormGroup({});
  form: any;
  formName!: string;

  constructor(private testFormService: TestFormService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe({
      next: params => {
        this.formName = params['form']
        this.testFormService.getForm(this.formName).subscribe({
          next: value => {
            this.form = value;
          }
        });
      }
    });
  }

  addTestInput(testInput: TestInputComponent) {
    this.testInputs.push(testInput);
  }

  onSubmit() {
    if (this.formGroup.valid) {
      this.testFormService.submitForm(this.formGroup).subscribe({
        next: (response) => {
          alert('backend is working, data sent')
        }, error: err => {
          alert('¡backend is not working!')
        }
      });
    }
  }


  onLoad(resultName: string) {
    this.testFormService.getSubmittedFormData(this.formName, resultName).subscribe({
      next: data => {
        for (const component of this.testInputs) {
          component.onLoadFromGroup(data)
        }
        this.formGroup.setValue(data);
      }
    });
  }
}
