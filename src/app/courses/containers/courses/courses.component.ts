import { CoursesService } from '../../services/courses.service';
import { Course } from '../../model/course';
import { Component, OnInit, Pipe } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationDialogComponent } from 'src/app/shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  courses$: Observable<Course[]> | null = null;
  _id: Number = 0;


  constructor(
    private coursesService:CoursesService,
    public dialog: MatDialog,
    private router:Router,
    private activeRoute:ActivatedRoute,
    private snackBar: MatSnackBar,
    ) {
    this.refresh()
   }

   refresh(){
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

  onDelete(course:Course){
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: `Tem certeza que deseja remover o curso "${course.name}"?`,
    });

    dialogRef.afterClosed().subscribe((result:boolean) => {
      if(result){
        this.coursesService.delete(course._id)
        .pipe(
          catchError(erro =>{
            this.onError("Erro ao tentar remover curso")
            return of([]);
          })
        )
        .subscribe(
          ()=>{
          this.refresh();
          this.snackBar.open(`Curso ${course.name} removido com sucesso!`, 'X',{
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition:'center'
          });
        });
      }
    });

  }

}
