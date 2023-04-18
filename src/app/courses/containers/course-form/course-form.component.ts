import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';

import { CoursesService } from '../../services/courses.service';
import { Course } from './../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  //form: UntypedFormGroup;
  form = this.formBuilder.group({
    _id:[''],
    name: [''],
    category: ['']
  });

  selected: String

  constructor(private formBuilder:NonNullableFormBuilder,
    private coursesService:CoursesService,
    private snackBar: MatSnackBar,
    private router:Router,
    private activeRoute:ActivatedRoute,
    private location:Location
    ) {

    this.selected = 'option1';
  }

  ngOnInit(): void {
    const course:Course = this.activeRoute.snapshot.data['course'];
    console.log(course);
    this.updateForm(course);
/*     this.activeRoute.params.subscribe(
      (params: any)=>{
        if(Number.parseInt(params['_id']) > 0){
          console.log(`id: ${params['_id']}`);
          this._id = params['_id'];
          console.log(this._id);
          const curso$ = this.coursesService.loadById(this._id);
          curso$.subscribe(curso =>{
            this.updateForm(curso);
            console.log(curso);
          });
        }
      }
    ); */
  }

  updateForm(curso:Course){
    this.form.patchValue({
      _id: curso._id,
      name: curso.name,
      category: curso.category
    });
  }

  onSubmit(){
    //alert('aoooba')
    console.log(`Form: ${JSON.stringify(this.form.value)}`);
    this.coursesService.save(this.form.value)
    .pipe(
      catchError(erro =>{
        this.openSnackBar('Algo deu errado!!', '')
        return of([]);
      })
    )
    .subscribe(result => {
      console.log(`Result: ${JSON.stringify(result)}`);
      this.router.navigate(['']);//{relativeTo:this.activeRoute}
      this.onSuccess(this.form.value);
    });
  }

  onSuccess(result:Partial<Course>){
    //msgSuccess = 'Curso salvo com sucesso';
    this.openSnackBar(`Curso "${result.name}" salvo com sucesso! `,'');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{
      duration: 5000,
      //panelClass: ['green-snackbar','green'],
    });
  }

  onCancel(){
    this.location.back();
  }

}
