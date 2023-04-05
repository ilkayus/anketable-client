/* eslint-disable no-confusing-arrow */
import { useState } from 'react';
import { MdCancel } from 'react-icons/md';
import type { Nominations } from '../../types/polls.types';
import BottomSheet from '../utils/BottomSheet';
import type { Props as BottomSheetProps } from '../utils/BottomSheet';

export interface Props {
  title?: string;
  nominations?: Nominations;
  userID?: string;
  isAdmin: boolean;
  onSubmitNomination: (nomination: string) => void;
  onRemoveNomination: (nominationID: string) => void;
}

const NominationForm = ({
  isOpen,
  onClose,
  title,
  nominations = {},
  onSubmitNomination,
  onRemoveNomination,
  userID,
  isAdmin,
}: Props & BottomSheetProps) => {
  const [nominationText, setNominationText] = useState('');

  const handleSubmitNomination = () => {
    onSubmitNomination(nominationText);
    setNominationText('');
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col px-4 items-center mb-2">
        <h3 className="font-semibold">{title}</h3>
        <div className="w-full my-4 mx-2">
          <textarea
            rows={1}
            maxLength={100}
            className="box info w-full"
            value={nominationText}
            onChange={(e) => {
              setNominationText(e.currentTarget.value);
            }}
          />
        </div>
        <button
          type="button"
          className="box btn-purple"
          disabled={nominationText.length === 0 || nominationText.length > 100}
          onClick={handleSubmitNomination}
        >
          Nominate
        </button>

        <h2 className="text-center text-xl my-4 font-medium">Nominations</h2>
        <div className="w-full mb-2">
          {Object.entries(nominations).map(([nominationID, nomination]) => (
            <div
              key={nominationID}
              className={`box flex justify-between items-center ${
                nomination.userID === userID ? 'nominated' : ''
              }`}
            >
              <div>{nomination.text}</div>
              {(isAdmin || nomination.userID === userID) && (
                <div className="ml-2">
                  <MdCancel
                    className="fill-current cursor-pointer hover:opacity-80"
                    onClick={() => {
                      onRemoveNomination(nominationID);
                    }}
                    size={24}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BottomSheet>
  );
};

export default NominationForm;
