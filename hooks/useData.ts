import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useData = <T>({
  url,
  method,
  deps = [],
  params = {},
}: {
  url: string;
  method: string;
  deps?: any[];
  params?: Record<string, any>;
}) => {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.request<{ results: T[] }>({
          method,
          url,
          params,
        });
        setData(res.data.results);
        setLoading(false);
      } catch (err) {
        if (err instanceof AxiosError) setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [...deps, ...Object.values(params)]);

  return [data, loading, error] as [T[], boolean, string | null];
};

export default useData;
