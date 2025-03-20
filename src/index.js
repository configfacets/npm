class Configfacets {
  constructor(source, sourceType, apiKey = null, postBody = {}) {
    this.source = source;
    this.sourceType = sourceType;
    this.apiKey = apiKey;
    this.postBody = postBody;
    this.configData = null;
  }

  async fetch() {
    try {
      if (!this.source) {
        throw new Error("Missing required source");
      }

      if (this.sourceType === "file") {
        // Read from a local file
        const fs = await import("fs/promises");
        const data = await fs.readFile(this.source, "utf-8");
        this.configData = JSON.parse(data);
      } else if (this.sourceType === "url") {
        // Fetch from a URL
        const headers = { "Content-Type": "application/json" };
        if (this.apiKey) {
          headers["X-APIKEY"] = this.apiKey;
        }

        const response = await fetch(this.source, {
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
      } else {
        throw new Error("Invalid sourceType. Use 'file' or 'url'.");
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
