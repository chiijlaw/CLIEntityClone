const fs = require("fs");

const cloneEntity = (file, entityId) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      throw err;
    } else {
      let parseData = JSON.parse(data);
      let entities = parseData.entities;
      let links = parseData.links;
      for (let entity of entities) {
        if (entity.entity_id === JSON.parse(entityId)) {
          console.log(entity.name);
        }
      }
    }
  });
};

module.exports.cloneEntity = cloneEntity;
