import { useMutation } from "@apollo/client";
import { getAccessToken } from "../auth";
import { DELETE_JOB_MUTATION } from "../graphql/queries";

export const useDeleteJob = () => {
  const [mutate, { loading }] = useMutation(DELETE_JOB_MUTATION);
  const userdata = JSON.parse(getAccessToken());
  const onDeleteJob = async (deleteJobId) => {
    const { data } = await mutate({
      variables: { deleteJobId },
      context: {
        headers: { Authorization: "Bearer " + userdata.token },
      },
    });
    return data;
  };

  return {
    onDeleteJob,
    loading,
  };
};
