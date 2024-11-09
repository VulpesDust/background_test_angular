import {Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {TestFormElementComponent} from '../test-element/test-form-element.component';
import {NgClass} from '@angular/common';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-test-select',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './test-select.component.html',
  styleUrl: './test-select.component.scss'
})
export class TestSelectComponent extends TestFormElementComponent {

  @ViewChild('button', {read: ElementRef}) button?: ElementRef;
  @ViewChild('dropdown', {read: ElementRef}) dropdown?: ElementRef;

  hidden = true;

  ngOnInit() {
    const formControlName = this.el['form-id']

    const formControl = new FormControl();
    if (this.el['required']) {
      formControl.setValidators(Validators.required)
    }
    this.formGroup.addControl(formControlName, formControl);

    if (this.el['not-nullable-and-select-one']) {
      this.formGroup.controls[formControlName].setValue(this.el['choices'][0]);
    }
  }

  choose(choice: string) {
    const formControlName = this.el['form-id']
    const control = this.formGroup.controls[formControlName]
    if (this.el['multiselect'] && !this.el['not-nullable-and-select-one']) {
      if (control.value == null) {
        control.setValue([choice])
      } else if (control.value.includes(choice)) {
        const index = control.value.indexOf(choice, 0);
        if (index > -1) {
          control.value.splice(index, 1);
        }
        if (control.value.length == 0) {
          control.setValue(null)
        }
      } else {
        control.value.push(choice)
      }
    } else {
      if (this.formGroup.controls[formControlName].value == choice && !this.el['not-nullable-and-select-one']) {
        this.formGroup.controls[this.el['form-id']].setValue(null)
      } else {
        this.formGroup.controls[this.el['form-id']].setValue(choice)
        this.hidden = true;
      }
    }
  }

  isSelected(choice: string) {
    const formControlName = this.el['form-id'];
    const value = this.formGroup.controls[formControlName].value;
    return (this.el['multiselect']) ? value?.includes(choice) : value == choice
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: any) {
    if (this.button && this.dropdown
      && !this.dropdown.nativeElement.contains(event.target)
      && !this.button.nativeElement.contains(event.target)) {
      this.hidden = true;
    }
  }
}
