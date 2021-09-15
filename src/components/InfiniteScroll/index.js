import React, { useEffect, useRef } from "react";


const InfiniteScroll = ({ listMore }) => {

  const observerRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect();
        listMore();
      }
    }, options)

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    }
  }, []);

  return (<div ref={observerRef} style={{ height: "5px" }} />);
}

export default InfiniteScroll;