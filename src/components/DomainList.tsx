"use client";

import { DomainConfig } from "@/types/domain";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface DomainListProps {
  domainConfigs: Record<string, DomainConfig>;
}

export default function DomainList({ domainConfigs }: DomainListProps) {
  const router = useRouter();
  return Object.values(domainConfigs).map((domain: DomainConfig) => (
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
  ));
}
