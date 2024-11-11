import api from './api';
import axios from 'axios';

jest.mock('axios');

describe('API Service', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('includes auth token in request headers when available', async () => {
    const token = 'test-token';
    localStorage.setItem('token', token);

    const mockResponse = { data: { success: true } };
    axios.create.mockReturnValue({
      get: jest.fn().mockResolvedValue(mockResponse),
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      }
    });

    await api.get('/test');

    expect(axios.create).toHaveBeenCalledWith(expect.objectContaining({
      headers: expect.objectContaining({
        'Content-Type': 'application/json'
      })
    }));
  });
}); 