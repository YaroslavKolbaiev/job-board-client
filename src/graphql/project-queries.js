import {
  ApolloClient,
  ApolloLink,
  concat,
  createHttpLink,
  gql,
  InMemoryCache,
} from '@apollo/client';
// import { GraphQLClient, gql } from 'graphql-request';
import { getAccessToken } from '../auth';

/**  graphql request implementation
const client = new GraphQLClient('http://localhost:9000/graphql', {
  headers: () => {
    // get access token from local storage
    const accessToken = getAccessToken();
    // if access token is defined, return auth header
    if (accessToken) {
      return { Authorization: `Bearer ${accessToken}` };
    }
    return {};
  },
});
*/

// apollo client implementation

// httpLink represents url to a server
const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql' });

// authlink is a custom link to chain httplink and headers in authlink
const authLink = new ApolloLink((operation, forward) => {
  // get access token from local storage
  const accessToken = getAccessToken();
  // if access token is defined, return auth header
  if (accessToken) {
    // setContext in operation object is fn where we can put properties
    // to be used in request. not to be confused with resolvercontext
    operation.setContext({
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  }

  // syntax to chain links
  return forward(operation);
});

export const apolloClient = new ApolloClient({
  // uri: 'http://localhost:9000/graphql',
  // <=>
  // to chain custom link and http link use concat
  // order is important, authlink to be called first
  link: concat(authLink, httpLink),
  // caches data returned by the server in memory
  cache: new InMemoryCache(),
});

export async function updateJob({ id, title, description }) {
  const mutation = gql`
    mutation UpdateJob($input: UpdateJobInput!) {
      updateJob(input: $input) {
        id
        title
        description
        company {
          id
          description
          name
        }
      }
    }
  `;

  /** with graphql query
  const data = await client.request(mutation, {
    input: { id, title, description },
  });
  */

  const result = await apolloClient.mutate({
    mutation,
    variables: { input: { id, title, description } },
  });

  return result.data.updateJob;
}

export async function deleteJob(deleteJobId) {
  const mutation = gql`
    mutation DeleteJob($deleteJobId: ID!) {
      deleteJob(id: $deleteJobId) {
        id
        title
      }
    }
  `;

  /** with graphql query 
  const data = await client.request(mutation, { deleteJobId });
  */

  const result = await apolloClient.mutate({
    mutation,
    variables: { deleteJobId },
  });

  return result.data.deleteJob;
}

export async function createJob({ title, description }) {
  const mutation = gql`
    mutation CreateJob($input: CreateJobInput!) {
      # job is alias
      job: createNewJob(input: $input) {
        id
        title
        date
        company {
          name
          id
        }
        description
      }
    }
  `;

  // /** with graphql query */
  //   const data = await client.request(mutation, {
  //     input: { title, description },
  //   });

  const result = await apolloClient.mutate({
    mutation,
    variables: { input: { title, description } },
    // function to manualy update cache
    update: (cache, result) => {
      // result is an object returned from mutation
      cache.writeQuery({
        // query to find job by id can be mooved to separete variable
        // in order to avoid dublication of code
        /**  logic of writeQuery is to manualy write query DATA
          returned by mutation directly into the cach
          same as if it returned by findJobById query
          by doing so, we avoid multiple network requests
         */
        query: gql`
          query Job($jobId: ID!) {
            job(id: $jobId) {
              title
              description
              id
              date
              company {
                id
                name
              }
            }
          }
        `,
        // id can be accessed from result object, result in this case is job
        variables: { jobId: result.data.job.id },
        // actual data to be inserted into the cash
        data: result.data,
      });
    },
  });

  return result.data.job;
}

/** getJobs function is repalced with useJobs hook */
export async function getJobs(limit, offset) {
  /** set query */
  const query = gql`
    query Jobs($limit: Int, $offset: Int) {
      jobs(limit: $limit, offset: $offset) {
        jobs {
          id
          title
          date
          company {
            name
            id
          }
        }
        totalItems
      }
    }
  `;

  /** with graphql query */
  // const data = await client.request(query);

  // with apollo query
  const result = await apolloClient.query({
    query,
    variables: { limit, offset },
    // always run new request without caching
    fetchPolicy: 'network-only',
  });

  return {
    jobs: result.data.jobs.jobs,
    totalItems: result.data.jobs.totalItems,
  };
}

// example of fragment implementation
// fragment is schema related not GraphQL or Apollo
const jobByIdFragment = gql`
  fragment jobById on Job {
    id
    title
    date
    description
    company {
      id
      name
    }
  }
`;

/** getJob function is repalced with useJob hook */
export async function getJob(jobId) {
  const query = gql`
    query Job($jobId: ID!) {
      job(id: $jobId) {
        ...jobById
      }
    }
    # defining fragment syntax
    ${jobByIdFragment}
  `;

  /** with graphql query */
  // const data = await client.request(query, { jobId });

  // with apollo query
  const result = await apolloClient.query({ query, variables: { jobId } });

  return result.data.job;
}

/** getCompany function is repalced with useCompany hook */
export async function getCompany(companyId) {
  const query = gql`
    query CompanyById($companyId: ID!) {
      company(id: $companyId) {
        id
        name
        description
        jobs {
          id
          description
          title
          companyId
        }
      }
    }
  `;

  /** with graphql query */
  // const data = await client.request(query, { companyId });

  // with apollo query
  const result = await apolloClient.query({ query, variables: { companyId } });

  return result.data.company;
}
