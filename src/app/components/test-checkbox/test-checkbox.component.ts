import {Component} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import {NgClass} from '@angular/common';
import {TestFormElementComponent} from '../test-element/test-form-element.component';

@Component({
  selector: 'app-test-checkbox',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './test-checkbox.component.html',
  styleUrl: './test-checkbox.component.scss'
})
export class TestCheckboxComponent extends TestFormElementComponent {

  selectAllSuffix = 'select-all'

  ngOnInit() {
    this.generateFormGroupCheckboxes();
  }

  generateFormGroupCheckboxes() {
    const el = this.el;
    const checkboxes = el['choices']
    const prefix = el['form-id']

    if (checkboxes && prefix) {
      for (const checkbox of checkboxes) {

        const formControl = new FormControl();
        const formControlName = prefix + checkbox['form-id'];
        this.formGroup.addControl(formControlName, formControl);
      }
      if (el['select-all-button']) {
        const formControl = new FormControl();
        this.formGroup.addControl(prefix + 'select-all', formControl)
      }

      if (el['required']) {
        this.formGroup.addValidators(this.requireAtLeastOneCheckbox(prefix, checkboxes))
      }
    }
  }

  requireAtLeastOneCheckbox(prefix: string, checkboxes: any): ValidatorFn {
    return () => {
      let result = false;
      for (const checkbox of checkboxes) {
        const formControlName = prefix + checkbox['form-id'];
        if (this.formGroup.controls[formControlName].value == true) {
          result = true
          break;
        }
      }
      return !result ? {'requireAtLeastOneCheckbox': true} : null;
    }
  }


  onChange() {
    if (this.el['select-all-button']) {
      const checkboxes = this.el['choices']
      const prefix = this.el['form-id']

      if (checkboxes && prefix) {
        let result = true;
        for (const checkbox of checkboxes) {
          const formControlName = prefix + checkbox['form-id']
          if (this.formGroup.controls[formControlName].value != true) {
            result = false;
            break;
          }
        }
        this.formGroup.controls[prefix + this.selectAllSuffix].setValue(result)
      }
    }
  }

  onChangeSelectAll() {
    const checkboxes = this.el['choices']
    const prefix = this.el['form-id']

    if (checkboxes && prefix) {
      const value = this.formGroup.controls[prefix + this.selectAllSuffix].value;
      for (const checkbox of checkboxes) {
        const formControlName = prefix + checkbox['form-id']
        this.formGroup.controls[formControlName].setValue(value);
      }
    }
  }

}
