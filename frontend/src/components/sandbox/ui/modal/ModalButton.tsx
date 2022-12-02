import { FaAngleDown } from "react-icons/fa";
interface ModalButtonProps {
  handleOpen: any;
  content: any;
  isDropdown?: boolean;
}
const ModalButton: React.FC<ModalButtonProps> = ({
  handleOpen,
  content,
  isDropdown,
}) => {
  return (
    <li id="dropdown-list" className="flex w-fit flex-col pt-1.5">
      <button
        id="dropdown-link"
        onClick={handleOpen}
        className="flex w-full items-center justify-center  text-left align-middle text-lg font-semibold text-zinc-300 "
      >
        {isDropdown && <FaAngleDown className={"hover:fill-gray-600"} />}
        {content}
      </button>
    </li>
  );
};

export default ModalButton;
