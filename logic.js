const fs = require("fs");

const cloneEntity = (file, entityId) => {
  // Read input file
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      if (!data) {
        console.log("data does not exist");
        return;
      }
      let parseData = JSON.parse(data);
      let entities = parseData.entities;
      let links = parseData.links;
      let id = JSON.parse(entityId);

      let linkMap = {};
      // links to original must also point to clone
      let linksToInitial = [];
      // Loop through links to create a hashmap of link relationships
      for (let link of links) {
        if (link.to === id) {
          linksToInitial.push(link.from);
        }
        if (!linkMap[link.from]) {
          linkMap[link.from] = [link.to];
        } else {
          linkMap[link.from].push(link.to);
        }
      }

      let linksToAdd = [];
      // seen prevents loops
      let seen = {};
      // Follow links and create list of entities that need their links translated
      while (!seen[id] && linkMap[id]) {
        linksToAdd = [...linksToAdd, ...linkMap[id]];
        seen[id] = true;
        id = linksToAdd.pop();
      }

      let entitiesToAdd = [];
      let nextId = 1;
      // Loop through entities and create copies
      // also find highest id
      for (let entity of entities) {
        let originalId = entity.entity_id;
        nextId = originalId >= nextId ? originalId + 1 : nextId;
        if (seen[originalId]) {
          let copy = { ...entity };
          entitiesToAdd.push(copy);
        }
      }

      let translate = {};
      // Assign new ids and push to entities
      for (let entity of entitiesToAdd) {
        // Make translation
        translate[entity.entity_id] = nextId;
        entity.entity_id = nextId;
        entities.push(entity);
        nextId += 1;
      }

      // Create links for new entities
      for (let originalFrom in seen) {
        let from = translate[originalFrom];
        for (let originalLink of linkMap[originalFrom]) {
          links.push({
            from,
            to: translate[originalLink]
          });
        }
      }
      // Point originals to clone of input entity
      for (let origFrom of linksToInitial) {
        links.push({
          from: origFrom,
          to: translate[JSON.parse(entityId)]
        });
      }
      let newData = JSON.stringify(parseData, null, 2);
      console.log(
        "----------------------New Data----------------------",
        newData
      );
      // Create new file with updated data
      fs.writeFile("DataClone.json", newData, err => {
        if (err) {
          throw err;
        } else {
          console.log(`Entity ${entityId} cloned.`);
        }
      });
    }
  });
};

module.exports.cloneEntity = cloneEntity;
