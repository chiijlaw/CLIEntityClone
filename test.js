const expect = require("chai").expect;
const { createLinkMap, createLinksToInit } = require("./logic");

describe("Clone Entity", () => {
  let links = [
    { from: 3, to: 5 },
    { from: 3, to: 7 },
    { from: 5, to: 7 },
    { from: 7, to: 11 },
    { from: 11, to: 5 }
  ];
  let id = 5;
  describe("#linkMap", () => {
    it("should produce a link map from JSON data's links", () => {
      let linkMap = createLinkMap(links);
      expect(linkMap).to.deep.equal({
        "3": [5, 7],
        "5": [7],
        "7": [11],
        "11": [5]
      });
    });
  });
  describe("#links to init", () => {
    it("should produce an array of links that must point to the new clone", () => {
      let output = createLinksToInit(links, id);
      expect(output).to.deep.equal([3, 11]);
    });
  });
});
