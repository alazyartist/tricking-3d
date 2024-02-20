import React, { useEffect, useRef } from "react";

export const Watcher = React.forwardRef<HTMLDivElement, { props?: any }>(
  (props, ref) => <div ref={ref} {...props} />
);

export const usePagination = (
  fetchNextPage: () => void,
  isFetchingNextPage: boolean,
  hasNextPage: boolean
) => {
  const observer = useRef<IntersectionObserver>(null);
  const watcherRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFetchingNextPage) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasNextPage) {
        fetchNextPage();
      }
    });

    if (watcherRef.current) {
      observer.current.observe(watcherRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { watcherRef };
};
