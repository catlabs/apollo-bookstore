import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorsComponent } from './authors.component';
import { AuthorsListComponent } from './authors-list/authors-list.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';

const routes: Routes = [
  {
    path: 'authors',
    component: AuthorsComponent,
    children: [
      {
        path: '',
        component: AuthorsListComponent
      },
      {
        path: ':id',
        component: AuthorDetailsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorsRoutingModule { }
