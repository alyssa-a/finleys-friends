import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { login } from "../common/api";

describe("login function", () => {
  const baseUrl = "https://frontend-take-home-service.fetch.com";
  const requestBody = JSON.stringify({ 
    name: "Bob", 
    email: "bob@email.com" 
});

  // Mock the fetch API
  beforeEach(() => {
    // eslint-disable-next-line no-undef
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return status code 200 after successful login", async () => {
    // Mock successful fetch response
    fetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ token: "dummyToken" })
    });

    const status = await login(requestBody);

    // Check if fetch was called with the correct args
    expect(fetch).toHaveBeenCalledWith(`${baseUrl}/auth/login`, expect.objectContaining({
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: requestBody
    }));

    // Check if login returns success status code
    expect(status).toBe(200);
  });

  it("should throw an error on failed login", async () => {
    // Mock failed authentication
    fetch.mockResolvedValue({
      ok: false,
      status: 401
    });

    await expect(login(requestBody)).rejects.toThrow("An error has occured: 401");

    // Ensure fetch was called once
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
