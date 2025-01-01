import { sendRequest } from '../../src/trade-site/tradeApi'; // Adjust the import path as needed
import axios from 'axios';

// Mocking axios to avoid actual HTTP requests during testing
jest.mock('axios');

// Define the mock data you expect to receive from the API
const mockResponse = {
  data: {
    id: 'GWXgqQBIb',
    complexity: 7,
    result: ['item1', 'item2', 'item3'], // Example items returned from the API
  },
};

// A test suite for the sendRequest function
describe('sendRequest function', () => {
  it('should make a POST request and return data successfully', async () => {
    // Mock axios.post to resolve with mock data
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    // Call the sendRequest function with the required parameters
    const result = await sendRequest('weapon.warstaff', 'standard');

    // Expect the response to match the mock data
    expect(result).toEqual(mockResponse.data);
  });

  it('should handle errors correctly', async () => {
    // Mock axios.post to throw an error
    (axios.post as jest.Mock).mockRejectedValue(new Error('Request failed'));

    // Call the sendRequest function with the required parameters
    const result = await sendRequest('weapon.warstaff', 'standard');

    // Expect the error to be handled and return a custom error message
    expect(result.error).toBe('Request failed');
  });
  
  it('should return an empty result if no items are found', async () => {
    // Mock axios.post to resolve with an empty result
    const emptyResponse = { data: { id: 'GWXgqQBIb', complexity: 7, result: [] } };
    (axios.post as jest.Mock).mockResolvedValue(emptyResponse);

    // Call the sendRequest function with the required parameters
    const result = await sendRequest('weapon.warstaff', 'standard');

    // Expect the response to match the empty result
    expect(result).toEqual(emptyResponse.data);
  });

  it('should return the correct data structure', async () => {
    // Mock axios.post to resolve with mock data
    (axios.post as jest.Mock).mockResolvedValue(mockResponse);

    // Call the sendRequest function with the required parameters
    const result = await sendRequest('weapon.warstaff', 'standard');

    // Expect the response to have the correct structure
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('complexity');
    expect(result).toHaveProperty('result');
    expect(Array.isArray(result.result)).toBe(true);
  });

  it('should handle network errors correctly', async () => {
    // Mock axios.post to throw a network error
    (axios.post as jest.Mock).mockRejectedValue({ message: 'Network Error' });

    // Call the sendRequest function with the required parameters
    const result = await sendRequest('weapon.warstaff', 'standard');

    // Expect the error to be handled and return a custom error message
    expect(result.error).toBe('Request failed');
  });
});
