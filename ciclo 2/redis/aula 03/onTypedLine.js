const readline = require("readline");

function onTypedLine(callback) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.prompt();

  rl.on("line", (line) => {
    callback(line);
    rl.prompt();
  }).on("close", () => {
    console.log("Saindo...");
    process.exit(0);
  });
}

module.exports = onTypedLine;
