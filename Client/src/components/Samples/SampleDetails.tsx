import {SampleDetailsDto} from "@api/terminalSchemas.ts";
import {Button} from "@headlessui/react";
import {UseMutationResult} from '@tanstack/react-query';
import {AxiosResponse} from "axios";
import {toastPromise} from "../../utils/toast.utils.tsx";

export interface SampleDetailsProps {
    dataQuery: SampleDetailsDto | undefined;
    mutation: UseMutationResult<AxiosResponse<any>, Error, string, unknown>;
}

const SampleDetails = (props: SampleDetailsProps) => {

    const date = new Date(props.dataQuery?.createdAtUtc ?? "");
    const handleDeletion = async () => {
        if (props.dataQuery?.id !== undefined) {
            props.mutation.mutateAsync(props.dataQuery.id).then(() => {
            });
            try {
                await toastPromise(
                    props.mutation.mutateAsync(props.dataQuery.id),
                    {
                        loading: "Deleting sample...",
                        success: "Deletion successful",
                        error: "Deletion failed",
                    }
                );
            } catch {
                // Error is handled by toastPromise
            }
        }
    }

    return (
        <div className="card-body">
            <div className="card-title text-4xl">Details</div>
            <div className="divider"></div>
            <div className="text-3xl mb-3">Sample Code: {props.dataQuery?.code}</div>
            <div className="grid grid-cols-[25%_75%] gap-y-3">
                <div className="font-bold">Created:</div>
                <div>
                    {`
            ${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}
            ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}
        `}
                </div>
                <div className="font-bold flex items-center">Tags:</div>
                <div>
                    {props.dataQuery?.tags?.map((tag) =>
                        (<div key={tag.id}
                              className="badge badge-lg hover:cursor-default p-3 rounded-2xl mr-1 my-1">{tag.name}</div>)
                    )}
                </div>
                <div className="font-bold">Comment:</div>
                <div>{props.dataQuery?.comment}</div>
                <div className="font-bold">Number of steps:</div>
                <div>{props.dataQuery?.steps?.length}</div>
                {props.dataQuery && (
                    <Button className="btn btn-outline btn-error" onClick={handleDeletion}
                            disabled={props.mutation.isPending}>
                        Delete
                    </Button>
                )}
            </div>
        </div>
    );
};

export default SampleDetails;
