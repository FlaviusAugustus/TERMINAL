import {
  QueryKey,
  useQuery,
  useQueryClient,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import useIsOnline from "./useIsOnline";

async function getData(online: boolean, queryKey: QueryKey, queryFn, client) {
  return online
    ? queryFn
    : client.getQueryData(queryKey) === undefined
      ? null
      : client.getQueryData(queryKey);
}

function useOfflineFirstQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>({
  queryKey,
  queryFn,
  ...rest
}: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>): UseQueryResult<
  TData,
  TError
> {
  const online = useIsOnline();
  const client = useQueryClient();
  return useQuery({
    queryKey: queryKey,
    queryFn: () => getData(online, queryKey, queryFn, client),
    ...rest,
  });
}

export default useOfflineFirstQuery;
