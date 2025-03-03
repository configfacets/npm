class Configfacets {
  constructor(apiUrl, apiKey = null, postBody = {}) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
    this.postBody = postBody;
    this.configData = null;
  }

  async fetch() {
    try {
      if (!this.apiUrl) {
        throw new Error("Missing required API URL");
      }

      // Set headers, add API key if present
      const headers = { "Content-Type": "application/json" };
      if (this.apiKey) {
        headers["X-APIKEY"] = this.apiKey; // Add API key header
      }

      const response = await fetch(this.apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(this.postBody),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const contentType = response.headers.get("Content-Type");
      if (contentType.includes("json")) {
        this.configData = await response.json();
      } else {
        this.configData = await response.text();
      }
    } catch (error) {
      console.error("Error fetching configuration:", error);
      throw error;
    }
  }

  getValue(path) {
    if (!this.configData) {
      console.warn("Configuration data is not loaded. Call fetch() first.");
      return null;
    }

    return path
      .split(".")
      .reduce(
        (obj, key) => (obj && obj[key] !== undefined ? obj[key] : null),
        this.configData
      );
  }
}

export default Configfacets;
