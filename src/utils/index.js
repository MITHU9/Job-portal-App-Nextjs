import qs from "query-string";

export const recruiterOnboardFormControls = [
  {
    componentType: "input",
    label: "Name",
    name: "name",
    required: true,
    placeholder: "Enter Your Name",
  },
  {
    componentType: "input",
    label: "Company Name",
    name: "companyName",
    required: true,
    placeholder: "Enter Your Company Name",
  },
  {
    componentType: "input",
    label: "Company Role",
    name: "companyRole",
    required: true,
    placeholder: "Enter Your Company Role",
  },
];

export const initialRecruiterFormData = {
  name: "",
  companyName: "",
  companyRole: "",
};

export const candidateOnboardFormControls = [
  {
    label: "Resume",
    name: "resume",
    componentType: "file",
  },
  {
    componentType: "input",
    label: "Name",
    name: "name",
    required: true,
    placeholder: "Enter Your Name",
  },
  {
    componentType: "input",
    label: "Current Company",
    name: "currentCompany",
    required: true,
    placeholder: "Enter Your Company Name",
  },
  {
    componentType: "input",
    label: "Current Job Location",
    name: "currentJobLocation",
    required: true,
    placeholder: "Enter Your Current Job Location",
  },
  {
    componentType: "input",
    label: "Prefer Job Location",
    name: "preferJobLocation",
    required: true,
    placeholder: "Enter Your Prefer Job Location",
  },
  {
    componentType: "input",
    label: "Current Salary",
    name: "currentSalary",
    required: true,
    placeholder: "Enter Your Current Salary",
  },
  {
    componentType: "input",
    label: "Notice Period",
    name: "noticePeriod",
    required: true,
    placeholder: "Enter Your Notice Period",
  },
  {
    componentType: "input",
    label: "Skills",
    name: "skills",
    required: true,
    placeholder: "Enter Your Skills",
  },
  {
    componentType: "input",
    label: "Previous Companies",
    name: "previousCompanies",
    required: true,
    placeholder: "Enter Your Previous Companies",
  },
  {
    componentType: "input",
    label: "Total Experience",
    name: "totalExperience",
    required: true,
    placeholder: "Enter Your Total Experience",
  },
  {
    componentType: "input",
    label: "College",
    name: "college",
    required: true,
    placeholder: "Enter Your College",
  },
  {
    componentType: "input",
    label: "College Location",
    name: "collegeLocation",
    required: true,
    placeholder: "Enter Your College Location",
  },
  {
    componentType: "input",
    label: "graduation Year",
    name: "graduationYear",
    required: true,
    placeholder: "Enter Your Graduated Year",
  },
  {
    componentType: "input",
    label: "Linkedin Profile",
    name: "linkedinProfile",
    required: true,
    placeholder: "Enter Your Linkedin Profile",
  },
  {
    componentType: "input",
    label: "Github Profile",
    name: "githubProfile",
    required: true,
    placeholder: "Enter Your Github Profile",
  },
];

export const initialCandidateFormData = {
  resume: "",
  name: "",
  currentCompany: "",
  currentJobLocation: "",
  preferJobLocation: "",
  currentSalary: "",
  noticePeriod: "",
  skills: "",
  previousCompanies: "",
  totalExperience: "",
  college: "",
  collegeLocation: "",
  graduationYear: "",
  linkedinProfile: "",
  githubProfile: "",
};

export const initialCandidateAccountFormData = {
  name: "",
  currentCompany: "",
  currentJobLocation: "",
  preferJobLocation: "",
  currentSalary: "",
  noticePeriod: "",
  skills: "",
  previousCompanies: "",
  totalExperience: "",
  college: "",
  collegeLocation: "",
  graduationYear: "",
  linkedinProfile: "",
  githubProfile: "",
};

export const postNewJobFormControls = [
  {
    componentType: "input",
    label: "Company Name",
    name: "companyName",
    required: true,
    placeholder: "Company Name",
    disabled: true,
  },
  {
    componentType: "input",
    label: "Job Title",
    name: "title",
    required: true,
    placeholder: "Job Title",
  },
  {
    componentType: "input",
    label: "Location",
    name: "location",
    required: true,
    placeholder: "Location",
  },
  {
    componentType: "input",
    label: "Type",
    name: "type",
    required: true,
    placeholder: "Job Type",
  },
  {
    componentType: "input",
    label: "Experience",
    name: "experience",
    required: true,
    placeholder: "Experience",
  },
  {
    componentType: "input",
    label: "Description",
    name: "description",
    required: true,
    placeholder: "Job Description",
  },
  {
    componentType: "input",
    label: "Skills",
    name: "skills",
    required: true,
    placeholder: "Skills Required",
  },
  {
    componentType: "input",
    label: "Salary",
    name: "salary",
    required: true,
    placeholder: "Salary",
  },
];

export const initialPostNewJobFormData = {
  companyName: "",
  title: "",
  location: "",
  type: "",
  experience: "",
  description: "",
  skills: "",
  salary: "",
};

export const filterMenuItems = [
  {
    id: "companyName",
    label: "Company Name",
  },
  {
    id: "location",
    label: "Location",
  },
  {
    id: "type",
    label: "Type",
  },
  {
    id: "title",
    label: "Title",
  },
];

export function formUrlQuery({ params, dataToAdd }) {
  let currentURL = qs.parse(params);

  if (Object.keys(dataToAdd).length > 0) {
    Object.keys(dataToAdd).map((key) => {
      if (dataToAdd[key].length === 0) delete currentURL[key];
      else currentURL[key] = dataToAdd[key].join(",");
    });
  }
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentURL,
    },
    {
      skipNull: true,
    }
  );
}
