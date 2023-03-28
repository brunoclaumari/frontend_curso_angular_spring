import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Component, OnInit } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]>;
  _id: Number = 0;


  constructor(
    private coursesService:CoursesService,
    public dialog: MatDialog,
    private router:Router,
    private activeRoute:ActivatedRoute

    ) {
    this.courses$ = this.coursesService.list()
    .pipe(
      catchError( erro => {
        this.onError('Erro ao carregar cursos.');

        return of([]);
      })
    );
   }

   onError(errorMsg : string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg,
    });
  }


  ngOnInit():void{

  }

  onAdd(){
    this.router.navigate(['new'], {relativeTo: this.activeRoute})
  }

  onEdit(course:Course){
    //this._id = _id;
    this.router.navigate(['edit',course._id], { relativeTo:this.activeRoute})
  }

  /*
    onUpdate(_id:number, curso:Partial<Course>){
    this.router.navigate(['update',_id], {queryParams: {name: curso.name, category: curso.category}, relativeTo:this.activeRoute})
  }
  */

}
