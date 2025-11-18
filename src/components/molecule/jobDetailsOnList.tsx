import type { Job } from "@/models/job";

export type JobDetailsProps = {
  route: {
    params: { job: Job };
  };
};
