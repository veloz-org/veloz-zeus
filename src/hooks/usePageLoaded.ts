import React from "react";

function usePageLoaded(timeout?: number) {
  const [pageLoaded, setPageLoaded] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setPageLoaded(true);
    }, timeout ?? 1000);
  }, [timeout]);

  return pageLoaded;
}

export default usePageLoaded;
