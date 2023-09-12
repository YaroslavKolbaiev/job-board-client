import { useQuery, gql } from '@apollo/client';

export function useCompany(id) {
  const { data, loading, error } = useQuery(
    // query companyById can be mooved to separate variable
    // in oreder to reuse it. for educational porposes i keep it here
    gql`
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
    `,
    { variables: { companyId: id } }
  );

  return {
    company: data?.company,
    loading,
    error,
  };
}
