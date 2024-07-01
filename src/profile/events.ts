import { Event } from "../classes";
import { Constants } from "../constants";
import { EventType } from "../types";

export const events: Event[] = [
  new Event(
    "Salary increase",
    EventType.income,
    2000,
    true,
    7,
    2025,
    7,
    Constants.BIRTH_YEAR + Constants.RETIREMENT_AGE,
  ),
  new Event("Montessori Kid #1", EventType.payment, 950, true, 8, 2026, 8, 2030),
  new Event("Montessori Kid #2", EventType.payment, 950, true, 8, 2028, 8, 2032),
  new Event("Montessori Kid #3", EventType.payment, 950, true, 8, 2030, 8, 2034),
];
