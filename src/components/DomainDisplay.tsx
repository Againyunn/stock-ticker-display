"use client";
import dynamic from "next/dynamic";

interface DomainDisplayProps {
  domain: string;
}

export const DomainDisplay = ({ domain }: DomainDisplayProps) => {
  const Component = dynamic(() => import(`@/domains/${domain}/Display`), {
    loading: () => <div>Loading...</div>,
    ssr: false,
  });

  return <Component />;
};
