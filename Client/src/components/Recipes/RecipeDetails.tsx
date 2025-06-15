import {RecipeDetailsDto} from "@api/terminalSchemas.ts";
import {Button, Tab, TabGroup, TabList, TabPanel, TabPanels} from "@headlessui/react";
import Step from "@components/Recipes/Step.tsx";
import {IdentificationIcon,} from "@heroicons/react/16/solid";
import {toastPromise} from "../../utils/toast.utils.tsx";
import {AxiosResponse} from "axios";
import {useIsInRole} from "@hooks/useIsInRole.ts";

export interface RecipeDetailsProps {
    dataQuery: RecipeDetailsDto | undefined;
    mutateAsync: (id: string) => Promise<AxiosResponse>;
    isPending: boolean;
}

/**
 * RecipeDetails Component
 *
 * Displays details of a recipe including its name and steps.
 * Provides functionality to delete the recipe.
 *
 * @component
 * @param {RecipeDetailsProps} props - The properties for the component.
 */
const RecipeDetails = (props: RecipeDetailsProps) => {
    const isAdmin = useIsInRole("Administrator");

    const handleDeletion = async () => {
        if (props.dataQuery?.id === undefined) return null;
        await toastPromise(
            props.mutateAsync(props.dataQuery.id),
            {
                loading: "Deleting recipe...",
                success: 'Recipe deleted successfully',
                error: 'Failed to delete recipe'
            }
        );
    }

    return (
        <div className="border border-gray-200 rounded-lg bg-white overflow-scroll h-full">
            <div className="text-lg font-medium border-b border-gray-200 h-[40.5px] p-2 flex">
                Details
            </div>
            <div className="p-4 space-y-3 font-light text-sm text-gray-600">
                <div className="flex items-center font-light text-sm text-gray-600">
                    <IdentificationIcon className="w-6 h-6 pr-2"/>
                    <div className="font-medium pr-1">Name:</div>
                    <div>{props.dataQuery?.name}</div>
                </div>
                <TabGroup className="">
                    <TabList className="flex tabs tabs-bordered">
                        {props.dataQuery?.steps.map((_step, index) =>
                            <Tab key={index} className="tab flex-1 focus:outline-none">Step {index + 1}</Tab>
                        )}
                    </TabList>
                    <TabPanels>
                        {props.dataQuery?.steps.map((step, index) =>
                            <TabPanel key={index}>
                                <Step step={step}/>
                            </TabPanel>
                        )}
                    </TabPanels>
                </TabGroup>
                {isAdmin &&
                    <div className="flex p-4 pb-16 mb">
                        {props.dataQuery && (
                            <Button className="btn btn-sm btn-error text-white rounded" onClick={handleDeletion}
                                    disabled={props.isPending}>
                                Delete
                            </Button>
                        )}
                    </div>
                }
            </div>
        </div>

    )
};

export default RecipeDetails;