import {FaAngleDown} from 'react-icons/fa';

const ModalButton = ({handleOpen, content, isDropdown}) => {
  return (
    <li id="dropdown-list" className="flex w-fit flex-col pt-1.5">
      <button
        id="dropdown-link"
        onClick={handleOpen}
        className="flex w-full items-center justify-center  text-center align-middle text-2xl font-semibold text-zinc-300 "
      >
        {isDropdown && <FaAngleDown className={'hover:fill-gray-600'} />}
        {content}
      </button>

    </li>
  );
};

export default ModalButton;
