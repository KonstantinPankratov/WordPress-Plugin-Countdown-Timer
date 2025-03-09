import { z } from "zod";

const ValidUnitsSchema = z.enum([
  "years",
  "months",
  "weeks",
  "days",
  "hours",
  "minutes",
  "seconds"
]);

const EnabledUnitsSchema = z.array(
  ValidUnitsSchema
).default(["days", "hours", "minutes", "seconds"]);

const DefaultUnitsSchema = z.record(ValidUnitsSchema, z.string().optional()).default({
  years: "Years",
  months: "Months",
  weeks: "Weeks",
  days: "Days",
  hours: "Hours",
  minutes: "Minutes",
  seconds: "Seconds",
});

export type ValidUnits = z.infer<typeof ValidUnitsSchema>;

export { ValidUnitsSchema, EnabledUnitsSchema, DefaultUnitsSchema };