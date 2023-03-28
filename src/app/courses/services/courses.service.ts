import { Course } from './../model/course';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { delay, first, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {


  //private readonly API = '../../../assets/courses.json';
  //private readonly API = '../../../assets/acourses.json';//endpoint errado
  //private readonly BASE_API = 'http://localhost:8080/api';//API Spring Boot
  private readonly BASE_API = 'api/courses';//url API reduzida. O resto está no arquivo de proxy
  //http://localhost:8080/api/courses

  constructor(private httpClient: HttpClient ) { }

  //private getCoursesEndpoint: string = '/courses';
  list(){
    return this.httpClient.get<Course[]>((this.BASE_API))
    .pipe(
      //first(),//se os dados forem estáticos usa-se esse método 'first'
      //delay(5000),
      tap(courses => console.log(courses))
    );
  }

  loadById(_id:string){
    return this.httpClient.get<Course>((`${this.BASE_API}/${_id}`)).pipe(take(1));
  }

  save(retornoForm: Partial<Course>){
    return this.httpClient.post<Course>(this.BASE_API, retornoForm)
    .pipe(
      first()
    );
    //console.log(retornoForm);
  }

  update(retornoForm: Partial<Course>, _id:number){

    return this.httpClient.put<Course>(`${this.BASE_API}/${_id}`, retornoForm)
    .pipe(
      first()
    );

  }
}
