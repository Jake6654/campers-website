import { users } from "../../mocks/mockUser";
import { User } from "../../types/user";
import ProfileIcon from "./ProfileIcon";

export default function ExecutiveBoard() {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-white to-[#00AAEF]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Executive Board
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the executive team of the Korean International Student Organization, committed to fostering community, cultural exchange, and mentorship for members.
          </p>
        </div>

        {/* President and Vice President - Top Row */}
        <div className="flex justify-center gap-8 mb-6">
          {users
            .filter((user) => user.role.toLowerCase().includes("president"))
            .map((user: User, i) => (
              <ProfileIcon user={user} key={i} isLeadership={true} />
            ))}
        </div>

        {/* Other Executive Members - Bottom Row */}
        <div className="flex flex-wrap justify-center gap-8">
          {users
            .filter((user) => !user.role.toLowerCase().includes("president"))
            .map((user: User, i) => (
              <ProfileIcon user={user} key={i} isLeadership={false} />
            ))}
        </div>
      </div>
    </section>
  );
}
