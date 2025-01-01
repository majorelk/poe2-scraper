import { sendRequest } from '../src/trade-site/tradeApi'; // Import the function to test
import axios from 'axios'; // Import axios to mock it

// Mock the axios.post method to simulate a web request
jest.mock('axios');

describe('sendRequest', () => {
  it('should make a POST request and return data successfully', async () => {
    // Mock the response of axios.post
    (axios.post as jest.Mock).mockResolvedValue({
      data: {
        id: 'GWXgqQBIb',
        complexity: 7,
        result: ['item1', 'item2', 'item3'], // Example items returned from the API
      },
    });

    const itemType = 'weapon.warstaff';
    const league = 'standard';
    const result = await sendRequest(itemType, league);

    // Assertions
    expect(result).toHaveProperty('id', 'GWXgqQBIb');
    expect(result).toHaveProperty('complexity', 7);
    expect(result).toHaveProperty('result');
    expect(result.result).toContain('item1');
    expect(result.result).toContain('item2');
    expect(result.result).toContain('item3');
  });

  it('should handle errors correctly', async () => {
    // Mock axios.post to throw an error
    (axios.post as jest.Mock).mockRejectedValue(new Error('Request failed'));

    const itemType = 'weapon.warstaff';
    const league = 'standard';
    const result = await sendRequest(itemType, league);

    // Expect the error to be handled and return a custom error message
    expect(result).toHaveProperty('error', 'Request failed');
  });
});