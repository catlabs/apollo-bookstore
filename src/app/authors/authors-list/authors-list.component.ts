import { Component, OnInit } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { NetworkStatus, networkStatus, updateNetworkStatus } from 'src/app/graphql.module';

@Component({
  selector: 'app-authors-list',
  templateUrl: './authors-list.component.html',
  styleUrls: ['./authors-list.component.scss']
})
export class AuthorsListComponent implements OnInit {

  isConnected = false;

  constructor(private apollo: Apollo) { }

  ngOnInit() {
    const getAuthors = gql`
      {
        authors {
          id
          name
          year
        }
      }
    `;

    this.apollo
      .watchQuery({
        query: getAuthors,
        fetchPolicy: 'network-only'
      })
      .valueChanges
      .pipe(
        map((result: ApolloQueryResult<{}>) => result.data)
      )
      .subscribe(authors => {
        console.log(authors);
      });

    this.apollo
      .watchQuery<NetworkStatus.Query>({
        query: networkStatus
      })
      .valueChanges
      .subscribe(
        (data) => {
          this.isConnected = data.data.networkStatus.isConnected;
          console.log(this.isConnected);
        }
      );
  }

  toggle() {
    this.apollo
      .mutate({
        mutation: updateNetworkStatus,
        variables: {
          isConnected: !this.isConnected
        }
      })
      .subscribe();
  }

}
