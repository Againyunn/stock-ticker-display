import IMGradientBox from "@/components/box/IMGradientBox";
import IMMarquee from "@/components/marquee/IMMarquee";
import Image from "next/image";
import polygonIcon from "@/assets/icon/polygon.svg";

export default function MainDisplayComponent1() {
  return (
    <div className="w-[5760px] h-[1728px] overflow-hidden flex flex-col p-0 bg-[#051839]">
      {/* // 주요 콘텐츠 */}

      <div className="flex flex-row mx-[100px] mt-[70px]">
        {/* // 1/3 화면 */}
        <div className="w-[1348px] h-[1470px] flex flex-wrap">
          <IMGradientBox className="w-[1348px] h-[634px] flex items-center justify-center">
            <h1 className="text-white">1</h1>
          </IMGradientBox>

          <IMGradientBox className="w-[651px] h-[369px] flex items-center justify-center mr-[45px]">
            <h1 className="text-white">2</h1>
          </IMGradientBox>

          <IMGradientBox className="w-[651px] h-[369px] flex items-center justify-center">
            <h1 className="text-white">3</h1>
          </IMGradientBox>

          <IMGradientBox className="w-[651px] h-[369px] flex items-center justify-center mr-[45px]">
            <h1 className="text-white">4</h1>
          </IMGradientBox>

          <IMGradientBox className="w-[651px] h-[369px] flex items-center justify-center">
            <h1 className="text-white">5</h1>
          </IMGradientBox>
        </div>

        {/* // 2/3 화면 */}
        <div className="w-full h-full flex flex-wrap"></div>

        {/* // 3/3 화면 */}
        <div className="w-[1470px] h-[1348px] flex flex-wrap">
          <IMGradientBox className="w-[1377px] h-[247px] flex items-center justify-center col-span-2 mb-[50px]">
            <h1 className="text-white">1</h1>
          </IMGradientBox>

          <IMGradientBox className="w-[665px] h-[540px] flex items-center justify-center mr-[45px]">
            <h1 className="text-white">2</h1>
          </IMGradientBox>

          <IMGradientBox className="w-[665px] h-[540px] flex items-center justify-center">
            <h1 className="text-white">3</h1>
          </IMGradientBox>

          <IMGradientBox className="w-[1377px] h-[557px] flex items-center justify-center mt-[50px]">
            <h1 className="text-white">4</h1>
          </IMGradientBox>
        </div>
      </div>

      {/* // 실시간 뉴스 속보  */}
      <IMMarquee
        className="my-[55px] h-[90px] overflow-hidden"
        dataList={[
          "코스피 지수 외국인과 기관의 매수세에 힘입어 2,620대에서 상승세...",
          "알테오젠, HLB, 레인보우로보틱스 등 시가총액 상위 대다수 종목 강세...",
        ]}
        contentClassName="text-white text-[73px] font-[400] leading-[100%]"
        gradient={true}
        gradientWidth={200}
        gradientColor="#051839"
        startIcon={
          <Image src={polygonIcon} alt="polygon" width={32} height={38} />
        }
      />
    </div>
  );
}
