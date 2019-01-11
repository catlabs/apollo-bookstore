import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorsRoutingModule } from './authors-routing.module';
import { AuthorsComponent } from './authors.component';
import { AuthorDetailsComponent } from './author-details/author-details.component';
import { AuthorsListComponent } from './authors-list/authors-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [AuthorsComponent, AuthorDetailsComponent, AuthorsListComponent],
  imports: [
    CommonModule,
    AuthorsRoutingModule,
    SharedModule
  ]
})
export class AuthorsModule { }
