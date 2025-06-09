// 개별 전광판 조회 페이지
// 도메인의 전광판이 다수 전광판인 경우 (2개 이상)
import { DomainDisplay } from "@/components/DomainDisplay";
import { domainConfigs } from "@/config/domains";

// 정적 경로 생성
export async function generateStaticParams() {
  return Object.keys(domainConfigs).map((domain) => {
    // 해당 도메인 내 전광판이 다수 전광판인 경우 (2개 이상)
    if (domainConfigs[domain].number && domainConfigs[domain].number > 1) {
      return {
        item: domain,
        number: domainConfigs[domain].number.toString(),
      };
    }
    return { item: domain };
  });
}

interface PageProps {
  params: Promise<{
    item: string;
    number?: string;
  }>;
}

// 서버 컴포넌트로 명시
export const dynamic = "force-static";

export default async function DisplayItemPage({ params }: PageProps) {
  // params를 Promise로 처리
  const { item, number } = await params;
  const config = domainConfigs[item];

  if (!config) {
    return <div>전광판 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={`theme-${config.layout.theme}`}>
      <DomainDisplay domain={item} number={number} />
    </div>
  );
}
