import { instance_by_auth } from "@/configs/axios_config";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { data_type as form_data } from "@/app/admin_panel/products/create/page";
import { data_type as form_data_update } from "@/app/admin_panel/products/edit/[id]/page";
import { AxiosError } from "axios";

interface ApiResponse {
  message: string;
}

const create_product = async (form_data: form_data) => {
  const { data } = await instance_by_auth.post("products", form_data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return data;
};
const update_product = async (form_data: form_data_update) => {
  const { data } = await instance_by_auth.put(
    `products/edit/${form_data.id}`,
    form_data
  );
  return data;
};
const update_product_property = async (form_data: {
  id: string;
  data: {
    properties: string[];
    full_description: string;
  };
}) => {
  const { data } = await instance_by_auth.put(
    `products/property/${form_data.id}`,
    form_data.data
  );
  return data;
};
const update_product_count = async (form_data: {
  id: string;
  data: { _id: string; count: number }[];
}) => {
  const { data } = await instance_by_auth.put(
    `products/count/${form_data.id}`,
    form_data.data
  );
  return data;
};
const update_product_gallery = async (form_data: {
  id: string;
  data: {
    image: File | {};
    thumbnail: File | {};
    gallery: { color: string; file: File | {} }[];
  };
}) => {
  const formData = new FormData();

  if (form_data.data.image instanceof File) {
    formData.append("image", form_data.data.image);
  }

  if (form_data.data.thumbnail instanceof File) {
    formData.append("thumbnail", form_data.data.thumbnail);
  }

  form_data.data.gallery.forEach((item) => {
    if (item.file instanceof File) {
      formData.append("gallery", item.file);
      formData.append("gallery_colors", item.color);
    }
  });

  const { data } = await instance_by_auth.put(
    `products/gallery/${form_data.id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
};

export function Product_create() {
  return useMutation({
    mutationFn: create_product,
    onSuccess(data) {
      return data;
    },
    onError(error) {
      const err = error as AxiosError;
      const responseData = err.response?.data as ApiResponse;
      toast.error(responseData.message);
    },
  });
}
export function Product_update() {
  return useMutation({
    mutationFn: update_product,
    onSuccess(data) {
      return data;
    },
    onError(error) {
      const err = error as AxiosError;
      const responseData = err.response?.data as ApiResponse;
      toast.error(responseData.message);
    },
  });
}
export function Product_update_property() {
  return useMutation({
    mutationFn: update_product_property,
    onSuccess(data) {
      return data;
    },
    onError(error) {
      const err = error as AxiosError;
      const responseData = err.response?.data as ApiResponse;
      toast.error(responseData.message);
    },
  });
}
export function Product_update_count() {
  return useMutation({
    mutationFn: update_product_count,
    onSuccess(data) {
      return data;
    },
    onError(error) {
      const err = error as AxiosError;
      const responseData = err.response?.data as ApiResponse;
      toast.error(responseData.message);
    },
  });
}
export function Product_update_gallery() {
  return useMutation({
    mutationFn: update_product_gallery,
    onSuccess(data) {
      return data;
    },
    onError(error) {
      const err = error as AxiosError;
      const responseData = err.response?.data as ApiResponse;
      toast.error(responseData.message);
    },
  });
}
