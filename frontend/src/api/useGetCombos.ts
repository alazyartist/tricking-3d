import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useApiCreds from "../hooks/useApiCreds";

const useGetCombos = () => {
  const apiPrivate = useApiCreds();

  return useQuery(
    ["Combos"],
    async () => {
      const { data } = await apiPrivate.get("/combo");
      return data;
    },
    { onSuccess: (data) => console.log("I Got all them Combos.") }
  );
};
export const useGetComboById = (combo_id) => {
  const apiPrivate = useApiCreds();

  return useQuery(
    ["Combo", combo_id],
    async () => {
      const { data } = await apiPrivate.get(`/combo/${combo_id}`);
      return data;
    },
    { onSuccess: (data) => console.log("I Got all them Combos by ID.") }
  );
};

interface ShorthandProps {
  combo_id: string;
  shorthand: string;
}

export const useUpdateComboShorthand = () => {
  const apiPrivate = useApiCreds();
  const queryClient = useQueryClient();
  return useMutation(
    ["updateComboShorthand"],
    async ({ combo_id, shorthand }: ShorthandProps) => {
      const { data } = await apiPrivate.put(
        `/combo/${combo_id}/shorthand`,
        { shorthand },
        {}
      );
      return data;
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["userInfo"]);
        queryClient.invalidateQueries(["Combos"]);
      },
    }
  );
};

export default useGetCombos;
