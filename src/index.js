// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

fastify.register(require("fastify-cookie"), {});

const cookieName = "mySecureCookie";

fastify.get("/set-cookie", async (request, reply) => {
  reply.setCookie(cookieName, new Date().toString(), {
    secure: true,
    sameSite: "lax",
  });
  reply.type("text/html");
  return "<p>Cookie has been set</p>";
});

fastify.get("/", async (request, reply) => {
  const cookieValue = request.cookies[cookieName];
  reply.type("text/html");
  reply.send(`<p data-cy="cookie">Cookie value: ${cookieValue}</p>`);
});

fastify.get("/set-and-show", async (request, reply) => {
  reply.type("text/html");
  const cookieValue = request.cookies[cookieName];
  if (!cookieValue) {
    reply.setCookie(cookieName, new Date().toString(), {
      secure: true,
      sameSite: "lax",
    });
    return '<p data-cy="no-cookie">Cookie has been set</p>';
  } else {
    reply.send(`<p data-cy="cookie">Cookie value: ${cookieValue}</p>`);
  }
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
