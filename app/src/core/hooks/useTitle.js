import { useEffect } from 'react';

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} | Cantus Gids`;
  }, [title]);
};

export default useTitle;
