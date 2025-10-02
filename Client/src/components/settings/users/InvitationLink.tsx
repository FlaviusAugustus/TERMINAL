import { Button, Transition } from "@headlessui/react";
import { useState } from "react";
import { ClipboardIcon, CheckCircleIcon } from "@heroicons/react/16/solid";

interface InvitationLinkProps {
  link: string;
}

/**
 * InvitationLink Component
 *
 * A component that displays an invitation link with options to show/hide the link and copy it to the clipboard.
 *
 * @component
 * @param {InvitationLinkProps} props - The properties for the component.
 */
const InvitationLink = (props: InvitationLinkProps) => {
  const [linkIsOpen, setLinkIsOpen] = useState(false);
  const [isCopied, setCopied] = useState(false);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText(props.link).then(() => {});
  };

  return (
    <>
      <div className="w-full flex justify-center">
        <Button
          className="btn m-1"
          onClick={() => setLinkIsOpen((open) => !open)}
        >
          {!linkIsOpen ? <>Show Link</> : <>Hide Link</>}
        </Button>
        <Button className="btn m-1" onClick={handleCopy}>
          {!isCopied ? (
            <>
              <ClipboardIcon className="h-4 w-4 mt-0.5" />
              Copy
            </>
          ) : (
            <>
              <CheckCircleIcon className="h-4 w-4 mt-0.5" /> Copied{" "}
            </>
          )}
        </Button>
      </div>
      <Transition show={linkIsOpen}>
        <div className="transition duration-300 ease-in data-[closed]:opacity-0 link text-center">
          {props.link}
        </div>
      </Transition>
    </>
  );
};

export default InvitationLink;
