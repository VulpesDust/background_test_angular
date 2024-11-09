import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class TestFormService {

  private url: string = '/forms/';
  private isBackendExists = false;

  constructor(private http: HttpClient) {
  }

  /**
   * без настроенного бека тянет файл из public/forms/{formName}.json
   */
  public getForm(formName: string) {
    const path = formName + (this.isBackendExists ? '' : '.json')
    return this.http.get(this.url + path)
  }

  /**
   * без бекенда не работает
   */
  public submitForm(formGroup: FormGroup) {
    console.log(JSON.stringify(formGroup.value)) // TODO DELETE ON BACKEND COMPLETE, сейчас нужно для заполнения результатов из консоли в файл для теста без бека
    return this.http.post(this.url + 'submit', JSON.stringify(formGroup.value));
  }

  /**
   * без настроенного бека тянет файл из public/forms/{formName}/{resultName}.json
   */
  public getSubmittedFormData(formName: string, resultName: string) {
    const path = formName + '/' + resultName + (this.isBackendExists ? '' : '.json')
    return this.http.get(this.url + path)
  }
}
