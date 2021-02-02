module.exports = {
  client: {
    includes: ["./src/**/*.tsx", "./src/**/*.ts"],
    tagName: "gql",
    service: {
      name: "",
      url: "https://podcast-hyo.herokuapp.com/graphql"
    },
  }
};