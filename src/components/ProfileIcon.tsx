import Image from "next/image";

type UserProp = {
  img: string;
  name: string;
  role: string;
};

type ProfileIconProps = {
  user: UserProp;
};

export default function ProfileIcon({ user }: ProfileIconProps) {
  return (
    <div>
      <Image
        src={user.img}
        alt="profile image"
        width={80}
        height={80}
        className="rounded-full"
      />
      <h1 className="text-lg font-semibold">{user.name}</h1>
      <p className="text-sm text-gray-500">{user.role}</p>
    </div>
  );
}
