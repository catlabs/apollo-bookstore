import { Component } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'apollo-bookstore';

  constructor(apollo: Apollo, httpLink: HttpLink) {
    const cache = new InMemoryCache();
    const stateLink = withClientState({
      cache,
      defaults: {
        networkStatus: {
          __typename: 'NetworkStatus',
          isConnected: false
        }
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_: any, { isConnected }: any, { cache }) => {
            const data = {
              networkStatus: {
                __typename: 'NetworkStatus',
                isConnected
              },
            };
            cache.writeData({ data });
            return null;
          },
        },
      }
    });

    const link = ApolloLink.from([stateLink, httpLink.create({ uri: 'http://localhost:4000/graphql' })]);

    apollo.create({
      link: link,
      cache: new InMemoryCache()
    });
  }

}
