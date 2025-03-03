import Configfacets from "./src/index.js"; // Import your module

(async () => {
  const config = new Configfacets(
    "https://configfacets.com/apis/repos/configfacets/core-concepts/appconfigs/resources/collections/feature-flags/exec?format=json",
    "<your_api_key>",
    { facets: ["env:prod", "country:CA"] }
  );

  await config.fetch();
  console.log(
    "Is facebook auth enabled:",
    config.getValue("auth.social.facebook")
  );
})();
