import { useEffect } from 'react';

/**
 * Custom hook to set the page title when component mounts
 * @param {string} title - The title to display in the browser tab
 */
export const usePageTitle = (title) => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = title;

    // Cleanup: restore previous title on unmount
    return () => {
      document.title = previousTitle;
    };
  }, [title]);
};

export default usePageTitle;
