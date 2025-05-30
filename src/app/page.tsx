import { domainConfigs } from "@/config/domains";
import DomainList from "@/components/DomainList";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="flex flex-row items-center justify-center h-10">
        <Image src="/icon/infomax.svg" alt="infomax" width={30} height={30} />
        <span className="text-xl font-bold">연합인포맥스 전광판 관리</span>
      </header>

      <div className="flex flex-row items-center justify-center w-full h-full">
        <div className="flex flex-col items-center justify-center w-full h-full mt-5">
          <span className="text-md font-bold">전광판 목록</span>
          <DomainList domainConfigs={domainConfigs} />
        </div>
      </div>
    </div>
  );
}
