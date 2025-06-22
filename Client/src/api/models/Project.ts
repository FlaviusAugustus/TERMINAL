export type CreateProjectRequest = {
  name: string;
};

export type Project = {
  id: string;
  isActive: boolean;
  name: string;
};

export type ProjectDetails = Project & {
  samplesIds: string[];
};
