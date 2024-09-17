import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { searchDogs } from "../common/api";

describe("searchDogs function", () => {
  const baseUrl = "https://frontend-take-home-service.fetch.com";
  const params = "breeds=husky&sort=age:asc";

  // Mock the fetch API
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return search results with params", async () => {
    // Mock successful fetch response
    const mockResponseData = [{ 
        next: "/dogs/search?breeds=husky&sort=age:asc&size=25&from=25", 
        resultIds: ["ABCD12345", "EFGH67890", "IJKL12345"],
        total: 3
    }];

    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponseData
    });

    const result = await searchDogs(params);

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/dogs/search?${params}`, expect.objectContaining({
      credentials: "include"
    }));

    expect(result).toEqual(mockResponseData);
  });

  it("should return search results with params", async () => {
    const mockResponseData = [{ 
        next: "/dogs/search?sort=breed:asc&size=25&from=25", 
        resultIds: ["ABCD12345", "EFGH67890", "IJKL12345"],
        total: 3
    }];

    fetch.mockResolvedValue({
      ok: true,
      json: async () => mockResponseData
    });

    // Call the searchDogs function without params
    const result = await searchDogs();

    // Check if fetch was called with the base URL
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/dogs/search`, expect.objectContaining({
      credentials: "include"
    }));

    // Check if the returned result is the mock data
    expect(result).toEqual(mockResponseData);
  });

  it("should throw an error when response is not ok", async () => {
    // Mock failed fetch response
    fetch.mockResolvedValue({
      ok: false,
      status: 404
    });

    await expect(searchDogs(params)).rejects.toThrow("An error has occured: 404");

    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/dogs/search?${params}`, expect.objectContaining({
      credentials: "include"
    }));
  });
});
