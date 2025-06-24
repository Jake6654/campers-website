// src/components/MonthlyEvents.tsx
import { useMemo } from "react";
import type { EventItem } from "../../types/event";
import { mockEvents } from "../../mocks/mockEvents";
import { format, isSameMonth } from "date-fns";

const MonthlyEvents: React.FC = () => {
  // As of today
  const now = new Date();

  const thisMonthEvents = useMemo<EventItem[]>(() => {
    return mockEvents.filter((e) => isSameMonth(new Date(e.date), now));
  }, [now]);

  if (thisMonthEvents.length === 0) {
    return <p className="text-gray-500">이번 달 예정된 이벤트가 없습니다.</p>;
  }

  return (
    <section className="bg-white p-6 rounded-lg shadow-md space-y-4">
      <h2 className="text-2xl font-semibold">📅 This Month's Events</h2>
      <ul className="space-y-3">
        {thisMonthEvents.map((event) => (
          <li key={event.id} className="border-l-4 border-blue-500 pl-4">
            <p className="font-medium">{event.title}</p>
            <p className="text-sm text-gray-600">
              {format(new Date(event.date), "yyyy-MM-dd")}
            </p>
            {event.description && (
              <p className="text-gray-700">{event.description}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MonthlyEvents;
