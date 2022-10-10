import { useState } from "react";
import { ConfirmAction } from '@enums';

type ConfirmParams = {
  confirmMessage?: string,
  cbSuccess?: () => void,
  cbFail?: () => void
}

export type CustomConfirm = {
  proceed: (value: unknown) => void,
  cancel: () => void
};

export type useConfirm = {
  confirm: ({
    confirmMessage,
    cbSuccess,
    cbFail
  }: ConfirmParams) => Promise<boolean>,
  customConfirm: CustomConfirm
};

export default function useConfirm (confirmType: ConfirmAction) {

  const [customConfirm, setCustomConfirm] = useState<CustomConfirm>({
    proceed: () => {},
    cancel: () => {}
  });
  
  const confirmWindow = async ({ confirmMessage }: ConfirmParams) => {
    const confirmed = window.confirm(confirmMessage);
    return new Promise((resolve, reject) => {
      return confirmed ? resolve(true) : reject(false);
    }) as Promise<boolean>;
  };

  const confirmCustom = async({ cbSuccess, cbFail }: ConfirmParams) => {
    const confirmAction = new Promise((resolve, reject) => {
      setCustomConfirm({
        proceed: resolve,
        cancel: reject
      });
    });

    return confirmAction.then(() => {
      cbSuccess?.();
      return true;
    }, () => {
      cbFail?.();
      return false;
    });
  }

  return {
    confirm: confirmType === ConfirmAction.CUSTOM ? confirmCustom : confirmWindow,
    customConfirm: customConfirm
  };
}
