import { gql, useMutation } from '@apollo/client';

export function useCreateJob() {
  // result object contains data, loading and error
  const [mutate, result] = useMutation(
    gql`
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
    `
  );

  const createJob = async (title, description) => {
    const response = await mutate({
      variables: { input: { title, description } },
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

    return response;
  };

  return { result, createJob };
}
