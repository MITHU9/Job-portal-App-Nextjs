import { fetchProfile } from "@/actions";
import Header from "../header";
import { currentUser } from "@clerk/nextjs/server";

async function CommonLayout({ children }) {
  const user = await currentUser();

  const profileInfo = await fetchProfile(user?.id);

  return (
    <div className="mx-auto max-w-7xl p-6 lg:px-8">
      {/* Header Component */}
      <Header
        profileInfo={profileInfo}
        user={JSON.parse(JSON.stringify(user))}
      />
      {/* Header Component */}
      {/* Main Component */}
      <main>{children}</main>
      {/* Main Component */}
    </div>
  );
}

export default CommonLayout;
