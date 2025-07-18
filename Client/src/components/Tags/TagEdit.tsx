import {useEffect, useState} from 'react';
import {TagDetailsDto} from "@api/models/Tag.ts";
import {DialogButton, DialogComp} from "@components/Shared/DialogComp.tsx";
import InputField from "@components/Shared/InputField.tsx";
import LabeledSwitch from "@components/Shared/LabeledSwitch.tsx";
import {ArrowPathIcon} from "@heroicons/react/24/outline";

export interface TagDetailsProps {
    tag: TagDetailsDto;
    onSubmit: (id: string, name: string, isActive: boolean) => void;
    open: boolean;
    setOpen: (arg0: boolean) => void;
}

const TagEdit = (props: TagDetailsProps) => {
    const [isChanged, setIsChanged] = useState(false);
    const [name, setName] = useState(props.tag?.name);
    const [isActive, setActive] = useState(props.tag?.isActive);

    useEffect(() => {
        setName(props.tag?.name || "");
        setActive(props.tag?.isActive || false);
        setIsChanged(false);
    }, [props.tag]);

    const handleReset = () => {
        setName(props.tag?.name);
        setActive(props.tag?.isActive || false);
        setIsChanged(false);
    };

    return (
      <DialogComp
        isOpen={props.open}
        setIsOpen={props.setOpen}
        title={"Edit tag"}
      >
          <InputField
            label="Name"
            id="name"
            type="email"
            value={name}
            onChange={(e) => {
                setName(e.target.value);
                setIsChanged(true);
            }}
          />
          <LabeledSwitch
            label="Status"
            id="status"
            checked={isActive}
            onChange={() => {
                setActive(!isActive);
                setIsChanged(true);
            }}
          />
          <div className="flex gap-1 mt-4">
              <DialogButton
                disabled={!isChanged}
                className="hover:border-blue-400 "
                onClick={() => props.onSubmit(props.tag.id, name, isActive)}
              >
                  Submit changes
              </DialogButton>
              <DialogButton
                disabled={!isChanged}
                className="!w-fit hover:border-blue-400"
                onClick={handleReset}
              >
                  <ArrowPathIcon className="h-4 w-4"/>
              </DialogButton>
          </div>
      </DialogComp>
    );
};

export default TagEdit;