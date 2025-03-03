# Configfacets JS Client

A simple JavaScript client for fetching and managing configuration data from Configfacets.

## Installation

```sh
npm install configfacets
```

## Usage

```js
import Configfacets from "configfacets";

(async () => {
  const config = new Configfacets(
    "https://configfacets.com/apis/repos/configfacets/core-concepts/appconfigs/resources/collections/feature-flags/exec?format=json",
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
