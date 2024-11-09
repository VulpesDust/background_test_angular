import {Component, EventEmitter, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgClass} from '@angular/common';
import {TestFormElementComponent} from '../test-element/test-form-element.component';

@Component({
  selector: 'app-test-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './test-input.component.html',
  styleUrl: './test-input.component.scss'
})
export class TestInputComponent extends TestFormElementComponent {

  @Output('ngOnInit') ngOnInitEventEmitter = new EventEmitter<typeof this>();

  protected readonly Array = Array;
  size = 1;

  ngOnInit() {
    if (!this.el['placeholder']) this.el['placeholder'] = '';

    if (this.el['multiplicity']) {
      this.ngOnInitEventEmitter.emit(this);
      this.updateFormControls()
    } else {
      const formControl = new FormControl();
      this.formGroup.addControl(this.el['form-id'], formControl);
    }
  }

  onLoadFromGroup(valueToSet: any) {
    const prefix = this.el['form-id']
    if (prefix) {
      this.size = 1;
      while (true) {
        const formControlName = prefix + this.size;
        if (!(formControlName in valueToSet)) {
          break;
        }
        this.size++;
      }
      this.updateFormControls()
    }
  }

  updateFormControls() {
    const prefix = this.el['form-id']
    if (prefix) {
      let i = 0
      for (; i < this.size; i++) {
        const formControlName = prefix + i;
        if (!this.formGroup.contains(formControlName)) {
          const formControl = new FormControl();
          this.formGroup.addControl(formControlName, formControl);
        }
      }
      let check_controls = this.size + 1;
      for (; i < check_controls; i++) {
        const formControlName = prefix + i;
        if (this.formGroup.contains(formControlName)) {
          this.formGroup.removeControl(formControlName);
          check_controls++;
        }
      }
    }
  }

  addField() {
    this.size++;
    this.updateFormControls()
  }

  removeLast() {
    this.size--;
    this.updateFormControls()
  }

}
