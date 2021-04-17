import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Cantus Guide`;
  }, [title]);
};

export default useTitle;
