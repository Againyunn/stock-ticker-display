"use client";
import dynamic from "next/dynamic";

interface DomainDisplayProps {
  domain: string;
  number?: string;
}

export const DomainDisplay = ({ domain, number }: DomainDisplayProps) => {
  const Component = dynamic(
    () =>
      // 개별 도메인 당 전광판 추가 시, 해당 디렉토리 형태대로 구조화 필수
      import(`@/domains/${domain}/display/Display${number ? `${number}` : ""}`),
    {
      loading: () => <div>Loading...</div>,
      ssr: false,
    }
  );

  return <Component />;
};
