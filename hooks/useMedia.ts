import React from 'react';

const useMediaQuery = (value: number, type: 'min' | 'max') => {
  const [isMatch, setIsMatch] = React.useState<boolean>(false);

  React.useEffect(() => {
    const media = window.matchMedia(`(${type}-width: ${value}px)`);

    const handler = () => setIsMatch(media.matches);

    handler();

    media.addEventListener('change', handler);
    window.addEventListener('resize', handler);

    // Função de limpeza
    return () => {
      media.removeEventListener('change', handler);
      window.removeEventListener('resize', handler);
    };
  }, [value, type]);

  return { isMatch };
};

export default useMediaQuery;
