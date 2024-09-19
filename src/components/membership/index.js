"use client";

import { membershipPlan } from "@/utils";
import React, { useEffect } from "react";
import CommonCard from "../common-card";
import JobIcon from "../job-icon";
import { Button } from "../ui/button";
import { createPayment, createPriceId, updateProfile } from "@/actions";
import { loadStripe } from "@stripe/stripe-js";
import Stripe from "stripe";
import { useSearchParams } from "next/navigation";

const stripePromise = loadStripe(
  "pk_test_51Q0ki9C2RXSWTJqgU5OZLqbwxVUnuWQZDAAqQxSns8LwyBgtGkz5TKG8QPyAlEkD8sMIJL8PUUT6i6WUdqdbifUs00PEKLHaLM "
);

function MemberShip({ profileInfo }) {
  const pathname = useSearchParams();

  async function handlePayment(getCurrentPlan) {
    const stripe = await stripePromise;
    const getPriceId = await createPriceId({
      amount: Number(getCurrentPlan?.price),
    });

    if (getPriceId) {
      // console.log(getPriceId);
      sessionStorage.setItem("currentPlan", JSON.stringify(getCurrentPlan));

      const result = await createPayment({
        lineItems: [
          {
            price: getPriceId?.id,
            quantity: 1,
          },
        ],
      });
      //console.log(result);
      await stripe.redirectToCheckout({
        sessionId: result?.id,
      });
    }
    //console.log(getPriceId);
  }

  async function updateUserProfile() {
    const fetchCurrentPlanFromSessionStorage = JSON.parse(
      sessionStorage.getItem("currentPlan")
    );

    await updateProfile(
      {
        ...profileInfo,
        isPremiumUser: true,
        membershipType: fetchCurrentPlanFromSessionStorage?.type,
        memberShipStartDate: new Date().toString(),
        memberShipEndDate: new Date(
          new Date().getFullYear() +
            fetchCurrentPlanFromSessionStorage?.type ===
          "basic"
            ? 1
            : fetchCurrentPlanFromSessionStorage?.type === "standard"
            ? 2
            : 5,
          new Date().getMonth(),
          new Date().getDay()
        ),
      },
      "/membership"
    );
    //console.log(fetchCurrentPlanFromSessionStorage);
  }
  console.log(profileInfo);

  useEffect(() => {
    if (pathname.get("status") === "success") updateUserProfile();
  }, [pathname]);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex items-baseline justify-between border-b pb-6 pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-gray-950">
          {profileInfo.isPremiumUser
            ? "Currently You Are a Premium User"
            : "Choose Your Best Plan"}
        </h1>

        <div>
          {profileInfo?.isPremiumUser ? (
            <Button>
              {
                membershipPlan.find(
                  (planItem) => planItem.type === profileInfo?.membershipType
                ).heading
              }
            </Button>
          ) : null}
        </div>
      </div>
      <div className="py-20 pb24 pt-6">
        <div className="container mx-auto p-0 space-y-8">
          <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
            {membershipPlan.map((plan, index) => (
              <CommonCard
                icon={
                  <div className="flex justify-between">
                    <div>
                      <JobIcon />
                    </div>
                    <h1 className="font-bold text-2xl">{plan.heading}</h1>
                  </div>
                }
                title={`$${plan.price} /yr`}
                description={plan.description}
                footerContent={
                  profileInfo?.membershipType === "premium" ||
                  (profileInfo?.membershipType === "basic" && index === 0) ||
                  (profileInfo?.membershipType === "standard" &&
                  index >= 0 &&
                  index < 2 ? null : (
                    <Button onClick={() => handlePayment(plan)}>
                      {profileInfo?.membershipType === "basic" ||
                      profileInfo?.membershipType === "standard"
                        ? "Upgrade Plan"
                        : "Get Subscription"}
                    </Button>
                  ))
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberShip;
