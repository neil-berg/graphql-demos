import 'dotenv/config';
import 'cross-fetch/polyfill';
import ApolloClient, { gql } from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://api.yelp.com/v3/graphql',
  request: operation => {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${process.env.YELP_API_KEY}`,
      },
    });
  },
});

const GET_BUSINESS = gql`
  {
    business(id: "garaje-san-francisco") {
      name
      id
      alias
      rating
      url
    }
  }
`;

const GET_BREAKFAST = gql`
  {
    search(term: "lunch", location: "silver lake los angeles") {
      business {
        name
      }
    }
  }
`;

client
  .query({
    query: GET_BREAKFAST,
  })
  .then(result => console.log(result));
