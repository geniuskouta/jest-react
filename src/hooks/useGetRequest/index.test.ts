import { renderHook, waitFor, act } from '@testing-library/react';
import useGetRequest from '.';

const url = '';
global.fetch = jest.fn().mockResolvedValue({});

describe('useGetRequest', () => {
  it('should call fetch with a specified url', async () => {
    const { result } = renderHook(() => {
      useGetRequest(url);
    });

    await waitFor(() => {
      expect(global.fetch).toBeCalledWith(url);
      expect(global.fetch).toBeCalledTimes(1)
    });
  });
});
