# Configfacets - JS Client Library

## Overview

As applications scale and integrate with multiple systems, managing configurations becomes increasingly complex. Configfacets simplifies this with a Low-Code/No-Code configuration management system using plain JSON—no custom verbs, no complicated syntax. This JS client library facilitates seamless interaction with the Configfacets API, enabling efficient retrieval and management of configuration data.

Our key features are...

**Repositories & Versioning:**
Design configurations as modular, reusable components, store them in a centralized repository, and maintain full version control for better organization and tracking.

**Reusability:**
Add provider and community-contributed repositories as dependencies, reuse configuration templates, pass in customizable values to effortlessly set up and manage your application configurations.

**Collaboration:**
Invite users and teams to repository with precise role-based permissions—Admin, Collaborator, or Viewer—to control access and streamline contributions.

**REST APIs:**
Expose configurations through REST API endpoints. Generate static and dynamic configurations by leveraging facet filters and runtime configuration values in the request context.

**Organization Management:**
Our hierarchical design simplifies managing multi-level organizational structures, team hierarchies, roles, and responsibilities.

## Usage

### Installation

```bash
npm install configfacets
```

```js
import Configfacets from "configfacets";

(async () => {
  const config = new Configfacets(
    "https://configfacets.com/apis/repos/configfacets/core-concepts/appconfigs/resources/collections/feature-flags/exec?format=json",
    "url",
    "<your_api_key>",
    { facets: ["env:prod", "country:CA"] }
  );

  await config.fetch();
  console.log(
    "Dark Mode Enabled:",
    config.getValue("theme.is_dark_mode_enabled")
  );
})();
```

## API Reference

**Configuration**

- `constructor(source, sourceType, apiKey = null, postBody = {}):` Initializes the configuration object with a source (URL or file) and source type.
- `async fetch():` Fetches the configuration data from the source.
- `getValue(keyPath):` Retrieves the value for the specified key path.

## Contributing

We welcome contributions! Feel free to connect with us in our [Discord community](https://discord.gg/zWj3Rzud5s).
