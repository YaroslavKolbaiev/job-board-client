import { useMutation } from "@apollo/client";
import { CREATE_USER_MUTATION } from "../graphql/queries";

export const useCreateUser = () => {
  const [mutate, { loading }] = useMutation(CREATE_USER_MUTATION);
  const createUser = async (email, password) => {
    const { data } = await mutate({
      variables: {
        input: { email, password, companyId: "wvdB54Gqbdp_NZTXK9Tue" },
      },

      // update: (cache, { data: { user } }) => {
      //   // function to manually cache data
      //   cache.writeQuery({
      //     query: CREATE_USER_MUTATION,
      //     data: { user },
      //     variables: { id: user.id },
      //   });
      // },
    });
    return data;
  };

  return {
    createUser,
    loading,
  };
};
