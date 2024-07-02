import { useState, useEffect } from 'react';
import { useScrollToTop } from '@react-navigation/native';

const useScrollDirection = (ref) => {
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const onScroll = (event) => {
    const currentScrollY = event.nativeEvent.contentOffset.y;
    if (currentScrollY > lastScrollY) {
      setIsScrollingDown(true);
    } else {
      setIsScrollingDown(false);
    }
    setLastScrollY(currentScrollY);
  };

  useScrollToTop(ref);

  return { isScrollingDown, onScroll };
};

export default useScrollDirection;
