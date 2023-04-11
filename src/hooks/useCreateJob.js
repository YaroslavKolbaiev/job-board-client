import { useMutation } from "@apollo/client";
import { getAccessToken } from "../auth";
import { CREATE_JOB_MUTATION } from "../graphql/queries";

export const useCreateJob = () => {
  const [mutate, { loading }] = useMutation(CREATE_JOB_MUTATION);
  const userdata = JSON.parse(getAccessToken());
  const createJob = async (title, description) => {
    const { data } = await mutate({
      variables: { input: { title, description } },
      context: {
        headers: { Authorization: "Bearer " + userdata.token },
      },
      update: (cache, { data: { job } }) => {
        // function to manually cache data
        cache.writeQuery({
          query: CREATE_JOB_MUTATION,
          data: { job },
          variables: { id: job.id },
        });
      },
    });
    return data.job;
  };

  return {
    createJob,
    loading,
  };
};
