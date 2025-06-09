"use client";

import { DomainConfig } from "@/types/domain";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface DomainListProps {
  domainConfigs: Record<string, DomainConfig>;
}

export default function DomainList({ domainConfigs }: DomainListProps) {
  const router = useRouter();
  return Object.values(domainConfigs).map((domain: DomainConfig) => {
    // 해당 도메인 내 전광판이 다수 전광판인 경우 (2개 이상)
    if (domain.number && domain.number > 1) {
      return (
        <div
          key={domain.id}
          className="flex flex-col items-center justify-center w-full h-full"
        >
          <div className="flex flex-row items-center justify-center text-xl font-bold">
            <Image
              src={domain.iconUrl}
              alt={domain.name}
              width={30}
              height={30}
            />
            <div>{domain.name}</div>
          </div>

          {Array.from({ length: domain.number }).map((_, index) => (
            <div
              key={`${domain.id}-${index}`}
              className="flex flex-row items-center justify-center w-1/3 h-full cursor-pointer text-sm border-2 border-gray-300 rounded-md p-2 hover:bg-gray-100"
              onClick={() => {
                router.push(`/display/${domain.id}/${index + 1}`);
              }}
            >
              <Image
                src={domain.iconUrl}
                alt={domain.name}
                width={30}
                height={30}
              />
              <div>{domain.name}</div>
              <div>
                {domain.component} : 유형 {index + 1}
              </div>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        key={domain.id}
        className="flex flex-row items-center justify-center w-1/3 h-full cursor-pointer text-sm border-2 border-gray-300 rounded-md p-2 hover:bg-gray-100"
        onClick={() => {
          router.push(`/display/${domain.id}`);
        }}
      >
        <Image src={domain.iconUrl} alt={domain.name} width={30} height={30} />
        <div>{domain.name}</div>
        <div>{domain.component}</div>
      </div>
    );
  });
}
