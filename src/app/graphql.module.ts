import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import gql from 'graphql-tag';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class GraphqlModule {
}

export const networkStatus = gql`
    query networkStatus {
        networkStatus @client {
            isConnected
        }
    }
`;

export const updateNetworkStatus = gql`
    mutation updateNetworkStatus($isConnected: Boolean) {
        updateNetworkStatus(isConnected: $isConnected) @client
    }
`;

export namespace NetworkStatus {
  export interface Query {
    networkStatus: {
      isConnected: boolean;
    };
  }
}
