import { useQuery } from "@apollo/client";
import { JOB_QUERY } from "../graphql/queries";

export const useJob = (jobId) => {
  const { data, loading, error } = useQuery(JOB_QUERY, {
    variables: { jobId },
  });
  return {
    job: data?.job,
    loading,
    error: Boolean(error),
  };
};
