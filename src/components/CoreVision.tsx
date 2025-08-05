// components/CoreVision.tsx
import VisionCard from "./VisionCard";

const cards = [
  {
    number: "01",
    title: "test1",
    description:
      "KNOCK Church의 유일한 메시지는 바로 “예수님”입니다. 우리는 단순한 종교인이 아니라, 예수님을 따르는 사람들입니다. …",
  },
  {
    number: "02",
    title: "test2",
    description:
      "우리의 심장은 모든 사람을 향해 뛰고 있습니다. 예수님은 모든 사람을 사랑하시며, 우리는 그 사랑을 믿고 따릅니다. …",
  },
  {
    number: "03",
    title: "test3",
    description:
      "드림과 나눔은 단지 해야 할 일이 아니라, 그 이상을 기꺼이 드리는 태도입니다. …",
  },
  {
    number: "04",
    title: "test4",
    description:
      "드림과 나눔은 단지 해야 할 일이 아니라, 그 이상을 기꺼이 드리는 태도입니다. …",
  },
  {
    number: "05",
    title: "test5",
    description:
      "드림과 나눔은 단지 해야 할 일이 아니라, 그 이상을 기꺼이 드리는 태도입니다. …",
  },
  {
    number: "06",
    title: "test6",
    description:
      "드림과 나눔은 단지 해야 할 일이 아니라, 그 이상을 기꺼이 드리는 태도입니다. …",
  },
  // 필요하면 카드 추가
];

export default function CoreVision() {
  return (
    <section className="bg-[#1c274a] py-24 overflow-visible">
      {/* 이 div가 좌우 여백과 최대 너비를 고정합니다 */}
      <div className="container mx-auto px-6 md:px-20 text-left overflow-visible">
        {/* 상단 제목/본문 */}
        <h2 className="text-4xl text-white md:text-5xl font-bold mb-4">
          Our Core Vision
        </h2>
        <p className="text-lg md:text-xl text-[#7890e0] mb-2">
          그를 이끌고 밖으로 나가 이르시되 하늘을 우러러 뭇별을 셀 수 있나 보라
        </p>
        <p className="text-lg md:text-xl text-[#7890e0] mb-6">
          또 그에게 이르시되 네 자손이 이와 같으리라{" "}
          <span className="text-sm text-[#7890e0]">[창세기 15:5]</span>
        </p>
        {/* 카드 리스트 */}
        <div className="flex overflow-x-auto overflow-y-visible space-x-6 snap-x snap-mandatory p-10">
          {cards.map((c) => (
            <VisionCard
              key={c.number}
              number={c.number}
              title={c.title}
              description={c.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
