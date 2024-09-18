"use client";

import { filterMenuItems, formUrlQuery } from "@/utils";
import CandidateJobCard from "../candidate-job-card";
import PostNewJob from "../post-new-job";
import RecruiterPostCard from "../recruiter-post-card";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "../ui/menubar";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function JobListing({
  user,
  profileInfo,
  jobList,
  applicationList,
  filterCategories,
}) {
  const [filterParams, setFilterParams] = useState({});
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = (filterId, option) => {
    let cpyFilterParams = { ...filterParams };
    const indexOfCurrentSection =
      Object.keys(cpyFilterParams).indexOf(filterId);

    if (indexOfCurrentSection === -1) {
      cpyFilterParams = {
        ...cpyFilterParams,
        [filterId]: [option],
      };
    } else {
      const indexOfCurrentOption = cpyFilterParams[filterId].indexOf(option);
      if (indexOfCurrentOption === -1) cpyFilterParams[filterId].push(option);
      else cpyFilterParams[filterId].splice(indexOfCurrentOption, 1);
    }
    setFilterParams(cpyFilterParams);
    sessionStorage.setItem("filterParams", JSON.stringify(cpyFilterParams));

    //console.log(cpyFilterParams);
  };

  const filterMenu = filterMenuItems.map((item) => ({
    id: item.id,
    name: item.label,
    options: [
      ...new Set(filterCategories.map((listItem) => listItem[item.id])),
    ],
  }));
  //console.log(filterParams, "filterParams");

  useEffect(() => {
    setFilterParams(JSON.parse(sessionStorage.getItem("filterParams")));
  }, []);

  useEffect(() => {
    if (filterParams && Object.keys(filterParams).length > 0) {
      let url = "";
      url = formUrlQuery({
        params: searchParams.toString(),
        dataToAdd: filterParams,
      });
      router.push(url, { scroll: false });
    }
  }, [filterParams, searchParams]);

  // console.log("searchParams", searchParams.toString());
  // console.log(filterParams, "filterParams");

  return (
    <div>
      <div className="mx-auto max-w-7xl">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {profileInfo?.role === "candidate"
              ? "Explore All Jobs"
              : "Jobs Dashboard"}
          </h1>
          <div className="flex items-center">
            {profileInfo?.role === "candidate" ? (
              <Menubar>
                {filterMenu.map((item) => (
                  <MenubarMenu>
                    <MenubarTrigger>{item.name}</MenubarTrigger>
                    <MenubarContent>
                      {item.options.map((option, index) => (
                        <MenubarItem
                          key={index}
                          onClick={() => handleFilter(item.id, option)}
                          className="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-900 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 "
                        >
                          <div
                            className={`w-4 h-4 border mr-2 ${
                              filterParams &&
                              Object.keys(filterParams).length > 0 &&
                              filterParams[item.id] &&
                              filterParams[item.id].indexOf(option) > -1
                                ? "bg-slate-700"
                                : ""
                            }`}
                          />
                          {option}
                        </MenubarItem>
                      ))}
                    </MenubarContent>
                  </MenubarMenu>
                ))}
              </Menubar>
            ) : (
              <PostNewJob user={user} profileInfo={profileInfo} />
            )}
          </div>
        </div>
        <div className="pt-6 pb-24">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div className="lg:col-span-4">
              <div className="container mx-auto p-0 space-y-8">
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                  {jobList && jobList.length > 0
                    ? jobList.map((jobItem) =>
                        profileInfo?.role === "candidate" ? (
                          <CandidateJobCard
                            profileInfo={profileInfo}
                            jobItem={jobItem}
                            applicationList={applicationList}
                          />
                        ) : (
                          <RecruiterPostCard
                            profileInfo={profileInfo}
                            jobItem={jobItem}
                            applicationList={applicationList}
                          />
                        )
                      )
                    : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobListing;
