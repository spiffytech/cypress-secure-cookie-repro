// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

fastify.register(require("fastify-cookie"), {});

// Declare a route
fastify.get("/", async (request, reply) => {
  const cookieValue = request.cookies.mySecureCookie;
  reply.type("text/html");
  if (!cookieValue) {
    reply.setCookie("mySecureCookie", new Date().toString(), {
      secure: true,
      sameSite: "lax",
    });
    reply.send(`<p data-cy="no-cookie">Request didn't have a cookie</p>`);
  } else {
    reply.send(`<p data-cy="cookie">Cookie value: ${cookieValue}</p>`);
  }
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
