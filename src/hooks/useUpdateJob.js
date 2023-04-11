import { useMutation } from "@apollo/client";
import { getAccessToken } from "../auth";
import { UPDATE_JOB_MUTATION } from "../graphql/queries";

export const useUpdateJob = () => {
  const [mutate, { loading }] = useMutation(UPDATE_JOB_MUTATION);
  const userdata = JSON.parse(getAccessToken());
  const updateJob = async (id, title, description) => {
    const { data } = await mutate({
      variables: { input: { id, title, description } },
      context: {
        headers: { Authorization: "Bearer " + userdata.token },
      },
    });
    return data.job;
  };

  return {
    updateJob,
    loading,
  };
};
