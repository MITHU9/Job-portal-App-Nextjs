"use client";

import { Fragment } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter } from "../ui/dialog";
import { fetchCandidateDetails, updateJobApplication } from "@/actions";
import { createClient } from "@supabase/supabase-js";

const supabaseClient = createClient(
  "https://vtblsisiqxcuglcxnbxw.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0YmxzaXNpcXhjdWdsY3huYnh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjY1MTAzMTMsImV4cCI6MjA0MjA4NjMxM30.Wmqb4XU_pbgdvny_CbmU35MXx22KqToPMGzxbM5BmLI"
);

function CandidateList({
  currentCandidateDetails,
  setCurrentCandidateDetails,
  applicationList,
  showCurrentCandidateDetailsModal,
  setShowCurrentCandidateDetailsModal,
}) {
  const handleFetchCandidateDetails = async (getCandidateUserID) => {
    const data = await fetchCandidateDetails(getCandidateUserID);
    //console.log(data);
    if (data) {
      setCurrentCandidateDetails(data);
      setShowCurrentCandidateDetailsModal(true);
    }
  };

  function handlePreviewResume() {
    const { data } = supabaseClient.storage
      .from("job-board-public")
      .getPublicUrl(currentCandidateDetails?.candidateInfo?.resume);
    //console.log(data, "resume");
    const a = document.createElement("a");
    a.href = data.publicUrl;
    a.setAttribute("download", "Resume.pdf");
    a.setAttribute("target", "_blank");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function handleUpdateJobStatus(getCurrentStatus) {
    let cpyApplicantsList = [...applicationList];
    const indexOfCandidates = cpyApplicantsList.findIndex(
      (candidate) =>
        candidate.candidateUserID === currentCandidateDetails?.userId
    );
    //console.log(indexOfCandidates);
    const currentCandidateToUpdate = {
      ...cpyApplicantsList[indexOfCandidates],
      status:
        cpyApplicantsList[indexOfCandidates].status.concat(getCurrentStatus),
    };
    //console.log(currentCandidateToUpdate);
    await updateJobApplication(currentCandidateToUpdate, "/jobs");
  }

  //console.log(currentCandidateDetails);

  return (
    <Fragment>
      <div className="grid grid-cols-1 gap-3 p-10 md:grid-cols-2 lg:grid-cols-3">
        {applicationList && applicationList.length > 0
          ? applicationList.map((applicantItem) => (
              <div className="bg-white shadow-lg w-full max-w-sm rounded-lg overflow-hidden mx-auto mt-4">
                <div className="px-4 my-6 flex justify-between items-center">
                  <h3 className="text-2xl font-semibold">
                    {applicantItem?.name}
                  </h3>
                  <Button
                    onClick={() =>
                      handleFetchCandidateDetails(
                        applicantItem?.candidateUserID
                      )
                    }
                    className=" flex h-11 items-center justify-center px-5"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
            ))
          : null}
      </div>
      <Dialog
        open={showCurrentCandidateDetailsModal}
        onOpenChange={() => {
          setShowCurrentCandidateDetailsModal(false);
          setCurrentCandidateDetails(null);
        }}
      >
        <DialogContent className="bg-slate-100">
          <div className="p-4">
            {currentCandidateDetails ? (
              <div>
                <h2 className="text-2xl font-bold">
                  Name: {currentCandidateDetails?.candidateInfo?.name}
                </h2>
                <p className="text-2xl font-bold">
                  Email: {currentCandidateDetails.email}
                </p>
                <p className="text-md font-semibold">
                  Present:{" "}
                  {currentCandidateDetails?.candidateInfo?.currentCompany}
                </p>
                <p className="text-md font-semibold">
                  JobLocation:{" "}
                  {currentCandidateDetails?.candidateInfo?.currentJobLocation}
                </p>
                <p className="text-md font-semibold">
                  Experience:{" "}
                  {currentCandidateDetails?.candidateInfo?.totalExperience}{" "}
                  Years
                </p>
                <p className="text-md font-semibold">
                  PresentSalary:{" "}
                  {currentCandidateDetails?.candidateInfo?.currentSalary} LPA
                </p>
                <p className="text-md font-semibold">
                  NoticedPeriod:{" "}
                  {currentCandidateDetails?.candidateInfo?.noticePeriod} Days
                </p>
                <h2 className="text-xl font-bold">Previous Companies: </h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentCandidateDetails?.candidateInfo?.previousCompanies
                    .split(",")
                    .map((skill) => (
                      <div className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                        <h2 className="text-[13px] font-medium text-white">
                          {skill}
                        </h2>
                      </div>
                    ))}
                </div>
                <h2 className="text-xl font-bold">Skills:</h2>
                <div className="flex flex-wrap gap-2 mt-2">
                  {currentCandidateDetails?.candidateInfo?.skills
                    .split(",")
                    .map((skill) => (
                      <div className="w-[100px] flex justify-center items-center h-[35px] bg-black rounded-[4px]">
                        <h2 className="text-[13px] font-medium text-white">
                          {skill}
                        </h2>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <p>No candidate details available.</p>
            )}
          </div>

          <div className="flex justify-between">
            <Button onClick={handlePreviewResume}>Resume</Button>
            <Button
              onClick={() => handleUpdateJobStatus("selected")}
              className="disabled:opacity-60"
              disabled={
                applicationList
                  .find(
                    (job) =>
                      job.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("selected") ||
                applicationList
                  .find(
                    (job) =>
                      job.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("rejected")
                  ? true
                  : false
              }
            >
              {applicationList
                .find(
                  (job) =>
                    job.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("selected")
                ? "Selected"
                : "Select"}
            </Button>
            <Button
              onClick={() => handleUpdateJobStatus("rejected")}
              className="disabled:opacity-60"
              disabled={
                applicationList
                  .find(
                    (job) =>
                      job.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("selected") ||
                applicationList
                  .find(
                    (job) =>
                      job.candidateUserID === currentCandidateDetails?.userId
                  )
                  ?.status.includes("rejected")
                  ? true
                  : false
              }
            >
              {applicationList
                .find(
                  (job) =>
                    job.candidateUserID === currentCandidateDetails?.userId
                )
                ?.status.includes("rejected")
                ? "Rejected"
                : "Reject"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
}

export default CandidateList;
