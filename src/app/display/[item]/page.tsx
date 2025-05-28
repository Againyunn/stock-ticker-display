// 개별 전광판 조회 페이지
export const dynamic = "force-dynamic";
import { DomainDisplay } from "@/components/DomainDisplay";
import { domainConfigs } from "@/config/domains";

export default async function DisplayItemPage({
  params,
}: {
  params: { item: string };
}) {
  const domain = params.item;
  const config = domainConfigs[domain];

  if (!config) {
    return <div>전광판 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className={`theme-${config.layout.theme}`}>
      <DomainDisplay domain={domain} />
    </div>
  );
}
