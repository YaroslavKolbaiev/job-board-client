import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { request } from "graphql-request"; // can be fully replaced by ApolloClient. i keep it for awareness porposes
import { getAccessToken } from "../auth";

const url = "https://job-board-server-i391.onrender.com/graphql";

export const client = new ApolloClient({
  uri: url,
  cache: new InMemoryCache(),
});

export const JOB_DETAIL_FRAGMENT = gql`
  fragment JobDetail on Job {
    id
    title
    companyId
    company {
      id
      name
      description
    }
    description
  }
`;

export const JOB_QUERY = gql`
  query JobQuery($jobId: ID!) {
    job(id: $jobId) {
      ...JobDetail
    }
  }
  ${JOB_DETAIL_FRAGMENT}
`;

export const COMPANY_QUERY = gql`
query ($companyId: ID!) {
  company(id: $companyId) {
    id
    name
    description
    jobs {
      id
      description
    }
  }
}
`;

export const JOBS_QUERY = gql`
  query {
    jobs {
      id
      title
      companyId
      company {
        id
        name
      }
      description
    }
  }
`;

export const USERS_QUERY = gql`
  query {
    users {
      id
      email
      companyId
      company {
        id
        name
      }
      jobs {
        id
        title
        companyId
      }
    }
  }
`;

export const CREATE_JOB_MUTATION = gql`
mutation ($input: CreateJobInput!) {
  job: createJob(input: $input) {
    ...JobDetail
  }
}
${JOB_DETAIL_FRAGMENT}
`;

export const CREATE_USER_MUTATION = gql`
mutation ($input: CreateUserInput!) {
  user: createUser(input: $input) {
    id
    email
    companyId
  }
}
`;

export const UPDATE_JOB_MUTATION = gql`
mutation ($input: UpdateJobInput!) {
  job: updateJob(input: $input) {
    title
  }
}
`;

export const DELETE_JOB_MUTATION =  gql`
mutation ($deleteJobId: ID!) {
  deleteJob(id: $deleteJobId) {
    id
    title
  }
}
`;

const fetchJobs = async () => { // not needed after installing useQuerry hook
  const query = gql`
    query {
      jobs {
        id
        title
        companyId
        company {
          id
          name
        }
        description
      }
    }
  `;
  // const { jobs } = await request(url, query); -- with gql request
  const { data } = await client.query({ query, fetchPolicy: "network-only" });
  return data.jobs;
};

const fetchJob = async (jobId) => {
  const variables = { jobId };
  // const { job } = await request(url, query, variables); -- with gql request
  const { data } = await client.query({ query: JOB_QUERY, variables });
  return data.job;
};

const fetchCompany = async (companyId) => {
  const query = gql`
    query ($companyId: ID!) {
      company(id: $companyId) {
        id
        name
        description
        jobs {
          id
          description
        }
      }
    }
  `;
  const variables = { companyId };
  // const { company } = await request(url, query, vars); -- with gql request
  const { data } = await client.query({ query, variables });
  return data.company;
};

const createJob = async (input) => {
  const mutation = gql`
    mutation ($input: CreateJobInput!) {
      job: createJob(input: $input) {
        ...JobDetail
      }
    }
    ${JOB_DETAIL_FRAGMENT}
  `;

  const variables = { input };

  const context = {
    headers: { Authorization: "Bearer " + getAccessToken() },
  };

  // const headers = { Authorization: "Bearer " + getAccessToken() }; -- with gql request
  // const { job } = await request(url, query, vars, headers); -- with gql request
  const {
    data: { job },
  } = await client.mutate({
    mutation,
    variables,
    context,
    update: (cache, { data: { job } }) => {
      // function to manually cache data
      cache.writeQuery({
        query: JOB_QUERY,
        data: { job },
        variables: { id: job.id },
      });
    },
  });
  return job;
};

const updateJob = async (input) => {
  const query = gql`
    mutation ($input: UpdateJobInput!) {
      job: updateJob(input: $input) {
        title
      }
    }
  `;

  const vars = { input };
  const headers = { Authorization: "Bearer " + getAccessToken() };
  const { job } = await request(url, query, vars, headers);
  return job.title;
};

const deleteJob = async (deleteJobId) => {
  const mutation = gql`
    mutation ($deleteJobId: ID!) {
      deleteJob(id: $deleteJobId) {
        id
        title
      }
    }
  `;

  const context = {
    headers: { Authorization: "Bearer " + getAccessToken() },
  };

  const variables = { deleteJobId };
  // const headers = { Authorization: "Bearer " + getAccessToken() };
  // const { deleteJob } = await request(url, query, variables, headers);
  const { data } = await client.mutate({ mutation, variables, context, fetchPolicy: "network-only" });
  return data.deleteJob;
};
