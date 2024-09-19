import { fetchProfile } from "@/actions";
import MemberShip from "@/components/membership";

import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function MemberShipPage() {
  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);

  if (!profileInfo) redirect("/onboard");

  return <MemberShip profileInfo={profileInfo} />;
}

export default MemberShipPage;
