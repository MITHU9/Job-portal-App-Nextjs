import { fetchProfile } from "@/actions";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

async function Home() {
  const user = await currentUser();
  //console.log(user);

  const profileInfo = await fetchProfile(user?.id);

  if (user && !profileInfo?._id) redirect("/onboard");

  return (
    <section className="">
      <h2>Main Content</h2>
    </section>
  );
}

export default Home;
