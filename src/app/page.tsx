import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <header className="flex flex-row items-center justify-center h-10">
        <Image src="/icon/infomax.svg" alt="infomax" width={30} height={30} />
        <span className="text-xl font-bold">연합인포맥스 전광판 관리</span>
      </header>

      <div className="flex flex-row items-center justify-center">
        <div className="flex flex-col items-center justify-center">
          <span className="text-xl font-bold">전광판 목록</span>
        </div>
      </div>
    </div>
  );
}
