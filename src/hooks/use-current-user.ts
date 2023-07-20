import { useGetCurrentUserQuery } from '../api/current-user-api';
import { selectAuthState, useAppSelector } from '../store';

const useCurrentUser = () => {
  const { userAuthData } = useAppSelector(selectAuthState);
  const uid = userAuthData?.uid;
  const { data } = useGetCurrentUserQuery(String(uid));

  return data || null;
};

export { useCurrentUser };
