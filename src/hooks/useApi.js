import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';

/**
 * Custom hook for API calls with loading, error handling, and caching
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @param {boolean} immediate - Whether to fetch immediately on mount
 * @returns {Object} - { data, loading, error, refetch, mutate }
 */
export const useApi = (url, options = {}, immediate = true) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);
  const { actions } = useApp();

  const fetchData = useCallback(async (fetchOptions = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(url, {
        ...options,
        ...fetchOptions,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
          ...fetchOptions.headers
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
      return result;
    } catch (err) {
      const errorMessage = err.message || 'An error occurred while fetching data';
      setError(errorMessage);
      actions.showError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, options, actions]);

  const refetch = useCallback(() => {
    return fetchData();
  }, [fetchData]);

  const mutate = useCallback((newData) => {
    setData(newData);
  }, []);

  useEffect(() => {
    if (immediate) {
      fetchData();
    }
  }, [fetchData, immediate]);

  return {
    data,
    loading,
    error,
    refetch,
    mutate,
    fetch: fetchData
  };
};

/**
 * Custom hook for form submissions with API integration
 * @param {string} url - API endpoint URL
 * @param {Object} options - Fetch options
 * @returns {Object} - { submit, loading, error, success }
 */
export const useApiSubmit = (url, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { actions } = useApp();

  const submit = useCallback(async (data) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      
      const response = await fetch(url, {
        method: 'POST',
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setSuccess(true);
      actions.showSuccess('Operación completada exitosamente');
      return result;
    } catch (err) {
      const errorMessage = err.message || 'Error al enviar los datos';
      setError(errorMessage);
      actions.showError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, options, actions]);

  const reset = useCallback(() => {
    setError(null);
    setSuccess(false);
  }, []);

  return {
    submit,
    loading,
    error,
    success,
    reset
  };
};

/**
 * Custom hook for paginated API calls
 * @param {string} url - Base API endpoint URL
 * @param {Object} options - Fetch options
 * @param {number} initialPage - Initial page number
 * @param {number} pageSize - Items per page
 * @returns {Object} - Pagination state and controls
 */
export const usePaginatedApi = (url, options = {}, initialPage = 1, pageSize = 10) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [allData, setAllData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const paginatedUrl = `${url}?page=${currentPage}&limit=${pageSize}`;
  
  const { data, loading, error, refetch } = useApi(paginatedUrl, options);

  useEffect(() => {
    if (data) {
      setAllData(data.items || data.data || []);
      setTotalPages(data.totalPages || Math.ceil((data.total || 0) / pageSize));
      setTotalItems(data.total || data.count || 0);
    }
  }, [data, pageSize]);

  const goToPage = useCallback((page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);

  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  const firstPage = useCallback(() => {
    goToPage(1);
  }, [goToPage]);

  const lastPage = useCallback(() => {
    goToPage(totalPages);
  }, [totalPages, goToPage]);

  return {
    data: allData,
    loading,
    error,
    refetch,
    currentPage,
    totalPages,
    totalItems,
    pageSize,
    hasNextPage: currentPage < totalPages,
    hasPrevPage: currentPage > 1,
    goToPage,
    nextPage,
    prevPage,
    firstPage,
    lastPage
  };
};

export default useApi;