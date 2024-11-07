import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TestFormService {

  private url: string = '/forms/';

  constructor(private http: HttpClient) {
  }

  public getForm(name: string) {
    return this.http.get(this.url + name + '.json')
  }

}
