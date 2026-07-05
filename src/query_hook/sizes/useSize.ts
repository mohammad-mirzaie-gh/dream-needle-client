import { instance_by_auth } from "@/configs/axios_config";
import { useAppDispatch } from "@/redux/store";
import { set_sizes } from "@/redux/templateSlice/templatesSlice";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const get_all_size = async () => {
  const { data } = await instance_by_auth.get("sizes");
  return data;
};

export function Size_get_all() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: get_all_size,
    onSuccess(data) {
      dispatch(set_sizes(data));
      return data;
    },
    onError(error) {
      toast.error(error);
    },
  });
}

export default Size_get_all;
