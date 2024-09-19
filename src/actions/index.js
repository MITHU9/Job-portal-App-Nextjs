"use server";

import connectToDB from "@/database";
import Application from "@/models/applicaton";
import Job from "@/models/job";
import Profile from "@/models/profile";
import { revalidatePath } from "next/cache";

const stripe = require("stripe")(
  "sk_test_51Q0ki9C2RXSWTJqgOQ2miF3bi1x1wXfGvhxWLajpqBUSHuOe2JM1bsF9906oHUDXWI3WJtek3e7gANHHTM2KD25a00VrBRyXPZ"
);

//Create Profile actions
export async function createProfile(formData, pathToRevalidate) {
  await connectToDB();
  await Profile.create(formData);
  revalidatePath(pathToRevalidate);
}

//Fetch Profile actions

export async function fetchProfile(id) {
  await connectToDB();
  const profile = await Profile.findOne({ userId: id });
  return JSON.parse(JSON.stringify(profile));
}

//create Job action

export async function createJob(formData, pathToRevalidate) {
  await connectToDB();
  await Job.create(formData);
  revalidatePath(pathToRevalidate);
  return JSON.parse(JSON.stringify(formData));
}

//fetched job action
//1. recruiter

export async function fetchJobsForRecruiter(userId) {
  await connectToDB();
  const jobs = await Job.find({ recruiterId: userId });
  return JSON.parse(JSON.stringify(jobs));
}

//2. Candidate

export async function fetchJobsForCandidate(filterParams = {}) {
  await connectToDB();
  let updatedParams = {};
  Object.keys(filterParams).forEach((filterKey) => {
    updatedParams[filterKey] = { $in: filterParams[filterKey].split(",") };
  });
  //console.log(updatedParams);

  const jobs = await Job.find(
    filterParams && Object.keys(filterParams).length > 0 ? updatedParams : {}
  );
  return JSON.parse(JSON.stringify(jobs));
}

//Create job Application

export async function createJobApplication(data, pathToRevalidate) {
  await connectToDB();
  await Application.create(data);
  revalidatePath(pathToRevalidate);
}

//fetch job applications for candidate
export async function fetchJobApplicationsForCandidate(candidateID) {
  await connectToDB();
  const result = await Application.find({ candidateUserID: candidateID });
  return JSON.parse(JSON.stringify(result));
}

//fetch job applications for recruiter
export async function fetchJobApplicationsForRecruiter(recruiterID) {
  await connectToDB();
  const applications = await Application.find({ recruiterUserID: recruiterID });
  return JSON.parse(JSON.stringify(applications));
}

//Update job Applications

export async function updateJobApplication(data, pathToRevalidate) {
  await connectToDB();
  const {
    recruiterUserID,
    name,
    email,
    candidateUserID,
    status,
    jobID,
    _id,
    jobAppliedDate,
  } = data;
  await Application.findByIdAndUpdate(
    {
      _id: _id,
    },
    {
      recruiterUserID,
      name,
      email,
      candidateUserID,
      status,
      jobID,
      jobAppliedDate,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

//get candidate details by candidate ID

export async function fetchCandidateDetails(candidateID) {
  await connectToDB();
  const candidate = await Profile.findOne({ userId: candidateID });
  return JSON.parse(JSON.stringify(candidate));
}

// create filter categories

export async function createFilterCategory() {
  await connectToDB();
  const category = await Job.find({});
  return JSON.parse(JSON.stringify(category));
}

//Update Profile Action

export async function updateProfile(data, pathToRevalidate) {
  await connectToDB();
  const {
    userId,
    role,
    email,
    isPremiumUser,
    membershipType,
    memberShipStartDate,
    memberShipEndDate,
    recruiterInfo,
    candidateInfo,
    _id,
  } = data;
  await Profile.findOneAndUpdate(
    {
      _id: _id,
    },
    {
      userId,
      role,
      email,
      isPremiumUser,
      membershipType,
      memberShipStartDate,
      memberShipEndDate,
      recruiterInfo,
      candidateInfo,
    },
    { new: true }
  );
  revalidatePath(pathToRevalidate);
}

// create stripe price id based on current selection

export async function createPriceId(data) {
  const session = await stripe.prices.create({
    currency: "inr",
    unit_amount: data?.amount * 100,
    recurring: {
      interval: "year",
    },
    product_data: {
      name: "Premium Plan",
    },
  });
  return {
    success: true,
    id: session?.id,
  };
}

//create payment logic

export async function createPayment(data) {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: data?.lineItems,
    mode: "subscription",
    success_url: "http://localhost:3000/membership" + "?status=success",
    cancel_url: "http://localhost:3000/membership" + "?status=cancel",
  });
  return {
    success: true,
    id: session?.id,
  };
}
