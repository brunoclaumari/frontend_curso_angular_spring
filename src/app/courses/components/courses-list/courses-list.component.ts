import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Course } from '../../model/course';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit{

  @Input() courses: Course[] = [];
  @Output() _id: Number = 0;
  @Output() add = new EventEmitter(false);
  @Output() update = new EventEmitter(false);

  readonly displayedColumns = ['name', 'category', 'actions'];

  constructor( ){}

  ngOnInit(): void {
  }

  onAdd(){
    //console.log('onAdd');
    this.add.emit(true);
    //this.router.navigate(['new'], {relativeTo:this.activeRoute})
  }

  onUpdate(_id:number){
    this.update.emit(true);
    //this.router.navigate(['update',_id], {queryParams: {name: curso.name, category: curso.category}, relativeTo:this.activeRoute})
  }

/*   onUpdate(_id:number){
    this.update.emit(true);
    //this.router.navigate(['update',_id], {queryParams: {name: curso.name, category: curso.category}, relativeTo:this.activeRoute})
  } */


}
