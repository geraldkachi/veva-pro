import { useMemo } from "react";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../store/slice/AuthSlice";

export const useGetUser = () => {
  const user = useSelector(selectCurrentUser);
  return useMemo(() => ({ user }), [user]);
};
