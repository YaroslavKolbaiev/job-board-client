import { useQuery } from "@apollo/client";
import { COMPANY_QUERY } from "../graphql/queries";

export const useCompany = (companyId) => {
  const { data, loading, error } = useQuery(COMPANY_QUERY, {
    variables: { companyId },
  });
  return {
    company: data?.company,
    loading,
    error: Boolean(error),
  };
};
