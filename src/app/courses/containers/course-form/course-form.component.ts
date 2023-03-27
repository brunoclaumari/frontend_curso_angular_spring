import { catchError, of } from 'rxjs';
import { Course } from '../../model/course';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NonNullableFormBuilder } from '@angular/forms';
import { CoursesService } from '../../services/courses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  //form: UntypedFormGroup;
  form = this.formBuilder.group({
    name: [''],
    category: ['']
  });

  _id = 0;

  //const curso = new Course();


  selected: String

  constructor(private formBuilder:NonNullableFormBuilder,
    private coursesService:CoursesService,
    private snackBar: MatSnackBar,
    private router:Router,
    private activeRoute:ActivatedRoute,
    private location:Location
    ) {
    /* this.form = this.formBuilder.group({
      name: [null],
      category: [null]
    }); */
    this.selected = 'option1';
  }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(
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
    );
  }

  updateForm(curso:Course){
    this.form.patchValue({
      name: curso.name,
      category: curso.category
    });
  }

  onSubmit(){
    //alert('aoooba')
    this.coursesService.save(this.form.value)
    .pipe(
      catchError(erro =>{
        this.openSnackBar('Algo deu errado!!', '')
        return of([]);
      })
    )
    .subscribe(result => this.onSuccess(this.form.value) )//console.log(result)
    this.router.navigate([''], {relativeTo:this.activeRoute});//{relativeTo:this.activeRoute}
  }

  onSuccess(result:Partial<Course>){
    //msgSuccess = 'Curso salvo com sucesso';
    this.openSnackBar(`Curso "${result.name}" salvo com sucesso `,'');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action,{duration: 5000});
  }

  onCancel(){
    this.location.back();
  }

}
