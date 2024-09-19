"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { initialPostNewJobFormData, postNewJobFormControls } from "@/utils";
import CommonForm from "../common-form";
import { createJob } from "@/actions";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

function PostNewJob({ user, profileInfo, jobList }) {
  const [showJobDialog, setShowJobDialog] = useState(false);
  const [jobFormData, setJobFormData] = useState({
    ...initialPostNewJobFormData,
    companyName: profileInfo?.recruiterInfo?.companyName,
  });
  const toast = useToast();

  function handlePostNewBtnValid() {
    return Object.keys(jobFormData).every(
      (control) => jobFormData[control].trim() !== ""
    );
  }
  async function createNewJobPost() {
    await createJob(
      {
        ...jobFormData,
        recruiterId: user?.id,
        applicants: [],
      },
      "/jobs"
    );
    setShowJobDialog(false),
      setJobFormData({
        ...initialPostNewJobFormData,
        companyName: profileInfo?.recruiterInfo?.companyName,
      });
  }

  function handleAddNewJob() {
    if (!profileInfo?.isPremium && jobList.length === 2) {
      toast({
        variant: "destructive",
        title: "you can post max 2 jobs ",
        description: "Please get subscription for post more jobs",
        action: <Link href={"./membership"}>Choose Plan</Link>,
      });
      return;
    }
    setShowJobDialog(true);
  }

  return (
    <div>
      <Button
        onClick={handleAddNewJob}
        className="disabled:opacity-60 flex h-11 items-center justify-center px-5"
      >
        Post a Job
      </Button>
      <Dialog
        open={showJobDialog}
        onOpenChange={() => {
          setShowJobDialog(false),
            setJobFormData({
              ...initialPostNewJobFormData,
              companyName: profileInfo?.recruiterInfo?.companyName,
            });
        }}
      >
        <DialogContent className="bg-white sm:max-w-screen-md h-[600px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Post New Job</DialogTitle>
            <div className="grid gap-4 py-4">
              <CommonForm
                buttonText={"Add Job Post"}
                formData={jobFormData}
                setFormData={setJobFormData}
                formControls={postNewJobFormControls}
                isBtnDisabled={!handlePostNewBtnValid()}
                action={createNewJobPost}
              />
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default PostNewJob;
