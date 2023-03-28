import { Course } from './../model/course';
import { CoursesService } from './../services/courses.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseResolver implements Resolve<Course> {

  constructor(private service:CoursesService){

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Course> {
    if(route.params && route.params['_id']){
      //let id = Number

      return this.service.loadById(route.params['_id']);
    }

    return of({_id: '', name: '', category: ''});
  }
}
