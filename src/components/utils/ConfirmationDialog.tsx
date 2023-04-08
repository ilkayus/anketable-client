/* eslint-disable no-confusing-arrow */
export interface Props {
  message: string;
  cancelButtonTitle?: string;
  confirmButtonTitle?: string;
  showDialog: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}
const ConfirmationDialog = ({
  message,
  showDialog,
  cancelButtonTitle = 'Cancel',
  confirmButtonTitle = 'Confirm',
  onCancel,
  onConfirm,
}: Props) =>
  showDialog ? (
    <div className="z-50 fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full backdrop-blur-[2px]">
      <div className="absolute bg-white p-4 rounded-2xl drop-shadow-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px]">
        <div className="text-center font-semibold text-xl mb-8 text-darkprimary-900">
          {message}
        </div>
        <div className="flex flex-col justify-around my-2">
          <button type="button" className="box btn-red" onClick={onCancel}>
            {cancelButtonTitle}
          </button>
          <button type="button" className="box btn-green" onClick={onConfirm}>
            {confirmButtonTitle}
          </button>
        </div>
      </div>
    </div>
  ) : null;

export default ConfirmationDialog;
