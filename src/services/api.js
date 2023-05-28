import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { API_ENDPOINT } from '../constants'
import { logOut } from "../store/slice/AuthSlice";
import { toaster } from "../utils/utils";

const API_ENDPOINT = process.env.REACT_APP_BASE_URL;
const baseQuery = fetchBaseQuery({
  baseUrl: API_ENDPOINT,
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});
const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // logout
    toaster(
      "error",
      "Looks like your session has expired, please login again."
    );
    setTimeout(() => {
      api.dispatch(logOut());
    }, 1000);
  }
  return result;
};

export const authApi = createApi({
  baseQuery: baseQueryWithReauth,
  reducerPath: "authApi",
  tagTypes: [
    "user",
    "meals",
    "restaurant",
    "cart",
    "profile",
    "order",
    "verify",
    "category",
  ],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "user/login",
        method: "POST",
        body: credentials,
      }),
    }),
    recoverMail: builder.mutation({
      query: (credentials) => ({
        url: "/user/forgot-password/email",
        method: "POST",
        body: credentials,
      }),
    }),
    recoverPassword: builder.mutation({
      query: (credentials) => ({
        url: "/user/forgot-password/reset",
        method: "POST",
        body: credentials,
      }),
    }),
    signup: builder.mutation({
      query: (credentials) => ({
        url: "user/register",
        method: "POST",
        body: credentials,
      }),
    }),
    sendOtp: builder.mutation({
      query: (credentials) => ({
        url: `auth/verify/${credentials.otp}`,
        method: "POST",
      }),
    }),
    getMeals: builder.query({
      query: ({ limit, page, category }) =>
        `meals?sort=-price&limit=${limit}&page=${page}${
          category ? `&category=${category}` : ""
        }`,
      providesTags: ["meal"],
    }),
    getRestaurants: builder.query({
      query: ({ limit, page }) =>
        `merchant/stores/search?limit=${limit}&page=${page}`,
      providesTags: ["restaurant"],
    }),
    getOneRestaurant: builder.query({
      query: (id) => `merchant/stores/${id}`,
      providesTags: ["restaurant"],
    }),
    getMealsInRestaurant: builder.query({
      query: (id) => `user/stores/${id}/meals`,
      providesTags: ["restaurant,'meals',cart"],
    }),
    getUserDetails: builder.query({
      query: () => `user/details`,
      providesTags: ["user", "profile"],
    }),
    getOrder: builder.query({
      query: ({ page }) => `user/orders?page=${page}&limit=10`,
      providesTags: ["cart", "order"],
    }),
    getSingleOrder: builder.query({
      query: (id) => `orders/${id}`,
      providesTags: ["cart", "order"],
    }),
    getUserCartOnline: builder.query({
      query: () => `user/cart/items`,
      providesTags: ["cart"],
    }),

    getCategory: builder.query({
      query: () => `meal/categories`,
      providesTags: ["category"],
    }),

    addToUserCartOnline: builder.mutation({
      query: (credentials) => ({
        url: "user/cart/items",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["cart"],
    }),

    addToUserCartOnline: builder.mutation({
      query: (credentials) => ({
        url: "user/cart/items",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["cart"],
    }),

    deleteUserCartOnline: builder.mutation({
      query: (credentials) => ({
        url: `user/cart/items/${credentials}`,
        method: "DELETE",
        // body: credentials,
      }),
      invalidatesTags: ["cart"],
    }),

    clearUserCartOnline: builder.mutation({
      query: () => ({
        url: "user/cart/items/clear",
        method: "DELETE",
      }),
      invalidatesTags: ["cart"],
    }),
    initPayment: builder.mutation({
      query: (credentials) => ({
        url: "util/payment/init",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["order"],
    }),
    makeOrder: builder.mutation({
      query: (credentials) => ({
        url: "user/orders",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["order"],
    }),
    makeOrderQr: builder.mutation({
      query: ({ credentials, id }) => ({
        url: `user/orders/store/${id}`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["order"],
    }),

    verifyOrder: builder.query({
      query: ({ ref }) => `user/orders/verify/${ref}`,
      providesTags: ["verify"],
    }),
    profileUpdate: builder.mutation({
      query: ({ credentials, id }) => ({
        url: `user`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["user", "profile"],
    }),
    pictureUpdate: builder.mutation({
      query: ({ credentials, id }) => ({
        url: `users/${id}/upload-image`,
        method: "PUT",
        body: credentials,
      }),
      invalidatesTags: ["user"],
    }),
    passwordUpdateEmail: builder.query({
      query: ({ email }) => `/auth/reset-password?email=${email}`,
      providesTags: ["user"],
    }),
    passwordUpdate: builder.mutation({
      query: (credentials) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["user"],
    }),
    imageUpload: builder.mutation({
      query: (credentials) => ({
        url: `/util/upload/image`,
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});
export const {
  useLoginMutation,
  useRecoverMailMutation,
  useRecoverPasswordMutation,
  useSignupMutation,
  useSendOtpMutation,
  useProfileUpdateMutation,
  usePasswordUpdateEmailQuery,
  usePasswordUpdateMutation,
  usePictureUpdateMutation,
  useGetMealsQuery,
  useGetMealsInRestaurantQuery,
  useGetOneRestaurantQuery,
  useGetRestaurantsQuery,
  useGetUserDetailsQuery,
  useAddToUserCartOnlineMutation,
  useClearUserCartOnlineMutation,
  useDeleteUserCartOnlineMutation,
  useGetUserCartOnlineQuery,
  useMakeOrderMutation,
  useMakeOrderQrMutation,
  useVerifyOrderQuery,
  useGetCategoryQuery,
  useGetOrderQuery,
  useInitPaymentMutation,
  useGetSingleOrderQuery,
  useImageUploadMutation,
} = authApi;
