import type { Pledge } from "@/shared/types";
import { get_pledges_active } from "./get_pledges_active";

export const get_pledge_detail = (pledgeId: string): Pledge | undefined => {
  const pledges = get_pledges_active();
  return pledges.find((p) => p.id === pledgeId);
};


