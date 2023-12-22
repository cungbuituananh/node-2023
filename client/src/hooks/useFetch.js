import { useEffect, useRef } from "react";
import { useIsFetching, useQuery, useQueryClient } from "react-query";
import { usePrevious } from "./usePrevious";

export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

export async function reactQueryCompatibleFetcher(fetcher, requestData) {
  const res = await fetcher(requestData);

  if (res?.isSuccess) {
    return res;
  }
  return Promise.reject(res);
}

export function useFetch(fetcher, requestData, queryKey, queryOptions) {
  const options = {
    refetchInterval: 0,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
    refetchOnMount: true,
    retry: false,
    initialData: queryOptions?.initialData,
    keepPreviousData: queryOptions?.keepPreviousData === false ? false : true,
    enabled: queryOptions?.enabled === false ? false : true,
    staleTime: queryOptions?.longCached ? 3600 * 1000 : 0,
    notifyOnChangeProps: queryOptions?.notifyOnChangeProps,
    onSuccess: queryOptions?.onSuccess,
    preventResetQuery: queryOptions?.preventResetQuery || false,
  };

  // const preEnabled = usePrevious(options?.enabled);

  const key = queryOptions?.payloadNotAsKey
    ? queryKey
    : [queryKey, requestData];

  const preRequestData = usePrevious(requestData);
  const preKey = queryOptions?.payloadNotAsKey
    ? queryKey
    : [queryKey, preRequestData];

  const isFetchingPreKey = useIsFetching({ queryKey: preKey }); //fix khi change filter màn search không thay đổi mặc định về ALL, code cũ useIsFetching({ queryKey: preKey })

  const queryClient = useQueryClient();

  const context = useQuery(
    key,
    () => reactQueryCompatibleFetcher(fetcher, requestData),
    options
  );

  if (!options.enabled && !!options.initialData) {
    //preEnabled &&
    if (options.preventResetQuery) {
      queryClient.removeQueries({ queryKey: preKey });
    }
    queryClient.resetQueries({ queryKey: preKey, exact: true });
    queryClient.resetQueries({ queryKey: key, exact: true });
  }

  useEffect(() => {
    return () => {
      if (options.staleTime === 0) {
        context.remove();
      }
    };
  }, []);

  return {
    data: context.data?.data?.data || context.data?.data,
    error: context.error,
    status: context.status,
    refetch: context.refetch,
    remove: context.remove,
    isIdle: context.isIdle,
    isFetching: Boolean(isFetchingPreKey),
    isLoading: context.isLoading,
    isFetched: context.isFetched,
  };
}
