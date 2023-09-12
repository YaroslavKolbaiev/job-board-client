import { useQuery, gql } from '@apollo/client';

export function useJobs() {
  const { data, loading, error } = useQuery(
    gql`
      query Jobs {
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
    `,
    { fetchPolicy: 'network-only' }
  );

  return { jobs: data?.jobs, loading, error };
}
