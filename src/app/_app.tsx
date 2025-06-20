import { useEffect } from "react";
import "@/styles/globals.css";
import { getClassNameFromDomain } from "@/utils/getClassName";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.ComponentType;
  pageProps: Record<string, unknown>;
}) {
  useEffect(() => {
    const className = getClassNameFromDomain();
    if (className) {
      document.body.classList.add(className);
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
