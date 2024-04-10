import { GeneralStatus, Role } from "@/lib/enum";

export const generaltatusOptions = [
  {
    label: "Active",
    value: GeneralStatus.Active,
  },
  {
    label: "Inactive",
    value: GeneralStatus.Inactive,
  },
];

export const roleOptions = [
  {
    label: "User app",
    value: Role.User,
  },
  {
    label: "General app",
    value: Role.General,
  },
];

export const driverOrScheduler = [
  {
    label: "Driver",
    value: "driver",
  },
  {
    label: "Scheduler",
    value: "scheduler",
  },
  {
    label: "Both",
    value: "both",
  },
];

export const fatigueAccreditedOptions = [
  {
    label: "Yes",
    value: "yes",
  },
  {
    label: "No",
    value: "no",
  },
];
