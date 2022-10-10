import { cleanup, fireEvent, render, screen, renderHook } from '@testing-library/react';
import useEnterSubmit from '.';

const submit = jest.fn();

describe('useEnterSubmit', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should add a keydown event', () => {
    renderHook(() => useEnterSubmit(submit, true, false));
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(submit).toBeCalled();
  });

  it('should not add a keydown event if the condition is not met', () => {
    renderHook(() => useEnterSubmit(submit, false, false));
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(submit).not.toBeCalled();
  });

  it('should not add a keydown event if the response is loading', () => {
    renderHook(() => useEnterSubmit(submit, true, true));
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(submit).not.toBeCalled();
  });
});
