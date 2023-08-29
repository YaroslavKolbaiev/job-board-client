import { GraphQLClient, gql } from 'graphql-request';

const client = new GraphQLClient('http://localhost:9000/graphql');

/** create function to fetch jobs */
export async function getJobs() {
  /** set query */
  const query = gql`
    query {
      jobs {
        id
        title
        date
        company {
          name
          id
        }
      }
    }
  `;

  /** send request to server with query parameter */
  const data = await client.request(query);

  return data.jobs;
}
