import { useQuery } from "@apollo/client";
import { USERS_QUERY } from "../graphql/queries";

export const useUsers = () => {
  const { data, loading, error } = useQuery(USERS_QUERY);

  return {
    users: data?.users,
    loading,
    error: Boolean(error),
  };
};
