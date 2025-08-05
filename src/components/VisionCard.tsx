// components/VisionCard.tsx
type VisionCardProps = {
  number: string;
  title: string;
  description: string;
};

export default function VisionCard({
  number,
  title,
  description,
}: VisionCardProps) {
  return (
    <div className="snap-start flex-shrink-0 min-w-[200px] sm:min-w-[240px] md:min-w-[280px] max-w-xs bg-white rounded-3xl shadow-lg p-6 text-left hover:scale-105 transition-all duration-300 h-100">
      {/* 카드 번호 */}
      <span className="block text-sm font-medium text-gray-500 mb-2">
        {number}
      </span>
      {/* 카드 제목 */}
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      {/* 카드 본문 */}
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
