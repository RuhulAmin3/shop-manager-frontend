import { useGetProfileQuery } from "@/store/authApi";
import { setUser } from "@/store/authSlice";
import { useAppDispatch } from "@/store/hook";
import { useEffect, useState } from "react";

export const useAuthCheck = () => {
  const dispatch = useAppDispatch();
  const { data, isLoading, isError, isSuccess } = useGetProfileQuery();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setAuthorized(!isError && !!data);
    }

    if (isSuccess) {
      const { username, id, shopNames } = data?.data || {};
      dispatch(setUser({ user: { id, username, shopNames } }));
    }
    
  }, [isLoading, isError, data, isSuccess]);

  return { checking: isLoading, authorized };
};
