import React, { ReactElement } from 'react';

type Props = {
  onConfirm: () => void,
  onCancel: () => void,
  onClose?: () => void,
};

export default function ConfirmModal ({ onConfirm, onCancel, onClose}: Props): ReactElement {
  return (
    <>
      'Are you sure you want to xxxx?'
      <button onClick={onConfirm}>YES</button><button onClick={onCancel}>NO</button>
    </>
);
}
