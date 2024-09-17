import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { getDogs } from "../common/api";

describe("getDogs function", () => {
  const baseUrl = "https://frontend-take-home-service.fetch.com";
  const dogIds = ["ABCD12345", "EFGH67890", "IJKL12345"];

  // Mock the fetch API
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return dogs data when dog ids are passed in", async () => {
    // Mock successful fetch response
    const mockResponseData = [
        { id: "ABCD12345", name: "Sparky" },
        { id: "EFGH67890", name: "Buddy" },
        { id: "IJKL12345", name: "Fido" },
    ];

    fetch.mockResolvedValue({
        ok: true,
        json: async () => mockResponseData
    });

    const result = await getDogs(dogIds);

    // Check if fetch was called with the correct args
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/dogs`, expect.objectContaining({
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dogIds)
    }));

    expect(result).toEqual(mockResponseData);
  });

  it("should throw an error if dog ids are not provided", async () => {
    fetch.mockResolvedValue({
        ok: false,
        status: 400
      });

      await expect(getDogs()).rejects.toThrow('An error has occured: 400');

      expect(fetch).toHaveBeenCalledWith(`${baseUrl}/dogs`, expect.objectContaining({
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(undefined) // simulate no dog ids passed
      }));
  });
  
  it('should throw an error when the response is not ok', async () => {
    fetch.mockResolvedValue({
      ok: false,
      status: 500
    });

    await expect(getDogs(dogIds)).rejects.toThrow('An error has occured: 500');

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/dogs`, expect.objectContaining({
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dogIds)
    }));
  });
});
