import { FC } from "react";
import { FaUsers, FaBell, FaPagelines } from "react-icons/fa";

const MemberBenefits: FC = () => {
  const benefits = [
    {
      icon: <FaUsers size={40} className="text-blue-900" />,
      title: "Networking",
      description:
        "Join the ever-growing Korean student body and alumni community for friends, connections, and employment opportunities exclusive to KSA members.",
    },
    {
      icon: <FaBell size={40} className="text-blue-900" />,
      title: "Events and Groups",
      description:
        "Join us for entertaining events and find sub-groups of matching interests such as sports teams, music bands, and more.",
    },
    {
      icon: <FaPagelines size={40} className="text-blue-900" />,
      title: "Culture",
      description:
        "Participate in cultural events to help spread the awareness and appreciation of Korean culture.",
    },
  ];

  return (
    <section className="bg-[#00abef] text-white py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold">Members Benefits</h2>
        <p className="mt-4 text-lg">
          You can expect the following and more as a member of KSA:
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="bg-white text-black rounded-lg p-6 text-center shadow-md"
          >
            <div className="mb-4 flex justify-center">{benefit.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
            <p className="text-sm text-gray-700">{benefit.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MemberBenefits;
