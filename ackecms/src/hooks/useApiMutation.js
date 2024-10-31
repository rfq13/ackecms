import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const useApiMutation = (mt, params) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const mutate = async (reqData = null) => {
    setLoading(true);
    const axParams = {
      ...mt(reqData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    axios(axParams)
      .then((response) => {
        setData(response?.data);
        params?.onSuccess?.(response?.data);
      })
      .catch((error) => {
        toast.error(error?.message || 'any error');
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (params?.autoLoad) {
      mutate();
    }
  }, []);

  return { loading, error, data, mutate };
};

export default useApiMutation;
