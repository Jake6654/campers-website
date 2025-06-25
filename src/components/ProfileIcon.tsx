import { User } from "../../types/user";
import Image from "next/image";

interface ProfileIconProps {
  user: User;
  isLeadership?: boolean;
}

export default function ProfileIcon({
  user,
  isLeadership = false,
}: ProfileIconProps) {
  return (
    <div className="group cursor-pointer">
      <div
        className={`bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 hover:border-[#00AAEF]/20 ${
          isLeadership ? "ring-2 ring-[#00AAEF]/10" : ""
        }`}
      >
        <div className="text-center">
          <div className="relative mb-4 inline-block">
            <div
              className={`mx-auto rounded-full overflow-hidden ring-4 ring-gray-100 group-hover:ring-[#00AAEF]/30 transition-all duration-300 ${
                isLeadership ? "w-40 h-40" : "w-30 h-30"
              }`}
            >
              <Image
                src={user.img}
                alt={`${user.name} profile image`}
                width={isLeadership ? 96 : 80}
                height={isLeadership ? 96 : 80}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#00AAEF] rounded-full border-3 border-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-full h-full rounded-full bg-[#00AAEF] animate-pulse"></div>
            </div>
          </div>

          <h3
            className={`font-semibold text-gray-900 mb-1 group-hover:text-[#00AAEF] transition-colors duration-300 ${
              isLeadership ? "text-xl" : "text-lg"
            }`}
          >
            {user.name}
          </h3>

          <p
            className={`text-gray-500 mb-3 group-hover:text-gray-700 transition-colors duration-300 ${
              isLeadership ? "text-base font-medium" : "text-sm"
            }`}
          >
            {user.role}
          </p>

        </div>
      </div>
    </div>
  );
}
