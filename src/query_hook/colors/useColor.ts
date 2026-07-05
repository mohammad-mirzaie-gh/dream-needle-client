import { instance_by_auth } from "@/configs/axios_config";
import { useAppDispatch } from "@/redux/store";
import { set_colors } from "@/redux/templateSlice/templatesSlice";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const get_all_color = async () => {
  const { data } = await instance_by_auth.get("colors");
  return data;
};

export function Color_get_all() {
  const dispatch = useAppDispatch();
  return useMutation({
    mutationFn: get_all_color,
    onSuccess(data) {
      dispatch(set_colors(data));
      return data;
    },
    onError(error) {
      toast.error(error);
    },
  });
}

export default Color_get_all;
