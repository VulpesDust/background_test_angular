import {Component, Input} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  standalone: true,
  template: ``
})
export class TestFormElementComponent {

  @Input() formGroup!: FormGroup;
  @Input() el!: any;

}
