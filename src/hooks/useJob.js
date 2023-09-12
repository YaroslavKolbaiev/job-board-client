import { useQuery, gql } from '@apollo/client';

export function useJob(id) {
  const { data, loading, error } = useQuery(
    gql`
      query Job($jobId: ID!) {
        job(id: $jobId) {
          id
          title
          date
          description
          company {
            id
            name
          }
        }
      }
    `,
    { variables: { jobId: id } }
  );

  return { jobDelail: data?.job, loading, error };
}
