import Projects from "@components/Projects/Projects.tsx";
import { useState } from "react";
import { PaginationState, SortingState } from "@tanstack/react-table";
import { useProjects } from "@hooks/projects/useGetProjects.ts";
import ProjectDetails from "@components/Projects/ProjectDetails.tsx";
import {useProjectDetails} from "@hooks/projects/useGetProjectDetails.ts";
import {useDeleteProject} from "@hooks/projects/useDeleteProject.ts";

const ProjectsPage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const dataQueryProjects = useProjects({
    pageNumber: pagination.pageIndex,
    pageSize: pagination.pageSize,
    desc: sorting[0]?.desc ?? true,
  });

    const mutation = useDeleteProject(
        {
            pageNumber: pagination.pageIndex,
            pageSize: pagination.pageSize,
            desc: sorting[0]?.desc ?? true
        }
    );

  const [projectDetailsId, setProjectDetailsId] = useState<string | null>(null);

  const dataQueryProjectDetails = useProjectDetails(projectDetailsId);

    return (
        <div>
            <div className="min-h-screen bg-gray-100">
                <div className="flex flex-wrap sm:flex-nowrap  justify-center p-1 gap-1">
                    <div className="flex-1 basis-3/5 bg-white rounded-md">
                        {dataQueryProjects.isLoading ? (
                            <div className="flex justify-center">
                                <span className="loading loading-spinner loading-md"></span>
                            </div>
                        ) : (
                            <Projects
                                dataQuery={dataQueryProjects.data}
                                sorting={sorting}
                                setSorting={setSorting}
                                pagination={pagination}
                                setPagination={setPagination}
                                onChangeProjectDetails={setProjectDetailsId}
                            />
                        )}
                    </div>
                    <div className="basis-2/5 rounded-md self-start">
                        {dataQueryProjects.isLoading ? (
                            <div className="flex justify-center">
                                <span className="loading loading-spinner loading-md"></span>
                            </div>
                        ) : projectDetailsId ? (
                            <ProjectDetails dataQuery={dataQueryProjectDetails.data}
                                            mutateAsync={mutation.mutateAsync}
                                            isPending={mutation.isPending}
                            />
                        ) : (
                            <div className="bg-white text-center text-gray-500 p-3 rounded">Select a project to view details</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProjectsPage;
