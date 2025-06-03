import { useAuthCheck } from "@/hooks/useAuthCheck";
import { useAppSelector } from "@/store/hook";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { checking } = useAuthCheck();
  const { user } = useAppSelector((state) => state.auth);

  if (checking) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-10 w-10 rounded-full border-4 border-b-0 border-blue-600" />
      </div>
    );
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
