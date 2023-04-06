/* eslint-disable no-confusing-arrow */
import React from 'react';
import { MdCancel } from 'react-icons/md';

export interface Props {
  isOpen: boolean;
  onClose?: (e: React.MouseEvent<SVGElement, MouseEvent>) => void;
}

const BottomSheet = ({
  isOpen = false,
  onClose,
  children,
}: Props & { children: JSX.Element }) =>
  isOpen ? (
    <div className="absolute max-w-screen-sm w-full  bottom-0 z-10 overflow-y-hidden top-14 flex flex-col backdrop-blur-[5px] bg-gray-400/60 dark:bg-gray-400/20">
      <div className="sticky top-0 flex justify-end flex-grow-0">
        <MdCancel
          className="mr-2 mt-2 fill-current text-orange-700 cursor-pointer hover:opacity-80"
          onClick={onClose}
          size={36}
        />
      </div>
      <div className="relative overflow-y-hidden flex-grow">
        <div className="absolute top-0 bottom-0 left-0 right-0 overflow-y-auto">
          {children}
        </div>
      </div>
    </div>
  ) : null;

export default BottomSheet;
