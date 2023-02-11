import { Course } from './../model/course';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { delay, first, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  //private readonly API = '../../../assets/courses.json';
  private readonly API = '../../../assets/acourses.json';//endpoint errado

  constructor(private httpClient: HttpClient ) { }

  list(){
    return this.httpClient.get<Course[]>(this.API)
    .pipe(
      first(),//se os dados forem estáticos usa-se esse método 'first'
      delay(10000),
      tap(courses => console.log(courses))
    );
  }
}
