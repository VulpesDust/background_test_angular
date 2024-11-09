import { Component } from '@angular/core';
import {TestCheckboxComponent} from '../test-checkbox/test-checkbox.component';
import {TestInputComponent} from '../test-input/test-input.component';
import {TestSelectComponent} from '../test-select/test-select.component';
import {TestNumberComponent} from '../test-number/test-number.component';

@Component({
  selector: 'app-testing-elements',
  standalone: true,
  imports: [
    TestCheckboxComponent,
    TestInputComponent,
    TestSelectComponent,
    TestNumberComponent
  ],
  templateUrl: './testing-elements.component.html',
  styleUrl: './testing-elements.component.scss'
})
export class TestingElementsComponent {

}
