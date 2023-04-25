import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';

import { CoursesService } from '../../services/courses.service';
import { Course } from './../../model/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent implements OnInit {
  //form: UntypedFormGroup;
  form = this.formBuilder.group({
    _id: [''],
    name: [
      '',
      [Validators.required, Validators.minLength(5), Validators.maxLength(100)],
    ],
    category: ['', [Validators.required]],
  });

  selected: String;

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private coursesService: CoursesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private location: Location
  ) {
    this.selected = 'option1';
  }

  ngOnInit(): void {
    const course: Course = this.activeRoute.snapshot.data['course'];
    console.log(course);
    this.updateForm(course);
  }

  updateForm(curso: Course) {
    this.form.patchValue({
      _id: curso._id,
      name: curso.name,
      category: curso.category,
    });
  }

  onSubmit() {
    //alert('aoooba')
    console.log(`Form: ${JSON.stringify(this.form.value)}`);
    this.coursesService
      .save(this.form.value)
      .pipe(
        catchError((erro) => {
          this.openSnackBar('Algo deu errado!!', '');
          return of([]);
        })
      )
      .subscribe((result) => {
        console.log(`Result: ${JSON.stringify(result)}`);
        this.router.navigate(['']); //{relativeTo:this.activeRoute}
        this.onSuccess(this.form.value);
      });
  }

  onSuccess(result: Partial<Course>) {
    //msgSuccess = 'Curso salvo com sucesso';
    this.openSnackBar(`Curso "${result.name}" salvo com sucesso! `, '');
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      //panelClass: ['green-snackbar','green'],
    });
  }

  onCancel() {
    this.location.back();
  }

  getErrorMessage(fieldName: string) {
    const field = this.form.get(fieldName);
    if (field?.hasError('required')) {
      return `Campo "${fieldName}" é obrigatório!`;
    }

    if (field?.hasError('minlength')) {
      const requiredLength:number = field.errors? field.errors['minlength']['requiredLength']:5;
      return `Tamanho mínimo tem que ser ${requiredLength} caracteres!`;
    }

    if (field?.hasError('maxlength')) {
      const requiredLength:number = field.errors? field.errors['maxlength']['requiredLength']:100;
      return `Tamanho máximo tem que ser ${requiredLength} caracteres!`;
    }

    return 'Campo inválido';
  }
}
