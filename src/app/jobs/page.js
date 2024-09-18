import {
  createFilterCategory,
  fetchJobApplicationsForCandidate,
  fetchJobApplicationsForRecruiter,
  fetchJobsForCandidate,
  fetchJobsForRecruiter,
  fetchProfile,
} from "@/actions";
import JobListing from "@/components/job-lists";
import { currentUser } from "@clerk/nextjs/server";

async function JobsPage({ searchParams }) {
  //console.log(searchParams, "searchParams");

  const user = await currentUser();
  const profileInfo = await fetchProfile(user?.id);

  const jobList =
    profileInfo?.role === "candidate"
      ? await fetchJobsForCandidate(searchParams)
      : await fetchJobsForRecruiter(user?.id);

  const getApplicationList =
    profileInfo?.role === "candidate"
      ? await fetchJobApplicationsForCandidate(user?.id)
      : await fetchJobApplicationsForRecruiter(user?.id);

  const fetchFilterCategories = await createFilterCategory();

  return (
    <JobListing
      user={JSON.parse(JSON.stringify(user))}
      profileInfo={profileInfo}
      jobList={jobList}
      applicationList={getApplicationList}
      filterCategories={fetchFilterCategories}
    />
  );
}

export default JobsPage;
