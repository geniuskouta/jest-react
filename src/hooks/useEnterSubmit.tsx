import { useState, useEffect } from 'react';

interface Props {
  onSubmit: Function,
  submitCondition: boolean
}

export function useEnterSubmit({ onSubmit, submitCondition }: Props): void {
  const onKeydown = ( event : KeyboardEvent ) => {
    if(event.key === "Enter") {
      onSubmit();
    }
  }

  useEffect(() => {
    if(submitCondition) {
      window.addEventListener("keydown", onKeydown, false);
    }

    return () => {
      window.removeEventListener('keydown', onKeydown, false);
    };
  }, [submitCondition]);

  return ;
}
