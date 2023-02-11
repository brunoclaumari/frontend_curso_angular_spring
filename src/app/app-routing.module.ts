import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//app-routing.module é o arquivo de roteamento global da aplicação
const routes: Routes = [
  {path:'', pathMatch:'full', redirectTo: 'courses'},
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
