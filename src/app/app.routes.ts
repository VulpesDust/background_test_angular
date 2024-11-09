import {Routes} from '@angular/router';
import {MainComponent} from './components/main/main.component';
import {TestFormComponent} from './components/test-form/test-form.component';
import {TestingElementsComponent} from './components/testing-elements/testing-elements.component';

export const routes: Routes = [
  {path: '', component: MainComponent, title: 'main page'},
  {path: 'test-form/:form', component: TestFormComponent, title: 'testForm'},
  {path: 'test-base-elements', component: TestingElementsComponent, title: 'test base elements'},
];
