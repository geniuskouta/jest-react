// https://betterprogramming.pub/react-custom-hooks-with-real-life-examples-c259139c3d71
import { useEffect } from 'react';

export default function useEnterSubmit(submit: Function, submitCondition: boolean, loading: boolean): void {
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      submit();
    }
  }

  useEffect(() => {
    if (submitCondition && !loading) {
      window.addEventListener("keydown", onKeydown, false);
    }

    return () => {
      window.removeEventListener('keydown', onKeydown, false);
    };
  
    // if submit function references values inside,
    // customhook needs to trigger re-render to reference new values
  }, [submit, submitCondition, loading]);

  return;
}
