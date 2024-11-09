import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {TestFormElementComponent} from '../test-element/test-form-element.component';

@Component({
  selector: 'app-test-number',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './test-number.component.html',
  styleUrl: './test-number.component.scss'
})
export class TestNumberComponent extends TestFormElementComponent {

  ngOnInit() {
    if (!this.el['placeholder']) this.el['placeholder'] = '';

    const formControl = new FormControl();
    if (this.el['required']) {
      formControl.setValidators(Validators.required)
    }
    this.formGroup.addControl(this.el['form-id'], formControl);
  }

  add(x: number) {
    const name = this.el['form-id']
    let value = this.formGroup.value[name]
    if (value != null) {
      value += x;
    } else {
      value = x;
    }
    this.formGroup.controls[name].setValue(value);
  }
}
