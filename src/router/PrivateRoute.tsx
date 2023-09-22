import { ReactNode, Suspense } from "react";
import { Navigate } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ErrorState from "../components/common/error-state";
import Loader from "../components/common/loader";
import useSession from "../hooks/use-session";
import { validateUserPermissions } from "../lib/utils/validate-user-permissions";

type Props = {
  permissions?: string[];
  roles?: string[];
  redirectTo?: string;
  children: ReactNode;
};

function PrivateRoute(props: Props) {
  const { permissions, roles, redirectTo = "/login", children } = props;

  const { isAuthenticated, user, loadingUserData } = useSession();
  const { hasAllPermissions } = validateUserPermissions({
    user,
    permissions,
    roles,
  });

  if (loadingUserData) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  if (!hasAllPermissions) {
    return <Navigate to="/" />;
  }

  return (
    <ErrorBoundary
      fallback={<ErrorState text="An error occurred in the application." />}
    >
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </ErrorBoundary>
  );
}

export default PrivateRoute;
