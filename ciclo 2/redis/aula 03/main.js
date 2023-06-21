const onTypedLine = require("./onTypedLine");
const Redis = require("ioredis");


const sub = new Redis();
const pub = new Redis();

const channel = "public-chat"

sub.subscribe("public-chat", (err) => {
    if (err) {
      console.error(`Erro na conexão. ${err.message}`);
    }
});

sub.on("message", (channel, message) => {
    console.log(`mensagem: ${message}`);
});

onTypedLine((line) => {
  const message = line

  pub.publish(channel, message)

  console.log();
});
