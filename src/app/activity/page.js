import {
  fetchJobApplicationsForCandidate,
  fetchJobsForCandidate,
} from "@/actions";
import CandidateActivity from "@/components/candidate-activity";
import { currentUser } from "@clerk/nextjs/server";

export default async function Activity() {
  const user = await currentUser();
  const jobList = await fetchJobsForCandidate();
  const jobApplicants = await fetchJobApplicationsForCandidate(user?.id);

  return <CandidateActivity jobList={jobList} jobApplicants={jobApplicants} />;
}
