const program = require("commander");
const { cloneEntity } = require("./logic");

program.version("0.0.1").description("CLI to clone entities from JSON");

program
  .command("cloneEntity <inputfile> <entityid>")
  .alias("c")
  .description("Clone entities from JSON")
  .action((file, entityId) => {
    cloneEntity(file, entityId);
  });

program.parse(process.argv);
