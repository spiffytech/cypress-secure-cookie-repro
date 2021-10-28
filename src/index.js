// Require the framework and instantiate it
const fastify = require("fastify")({ logger: true });

fastify.register(require("fastify-cookie"), {});

const cookieName = "mySecureCookie";

/**
 * Demonstrates that Cypress will set the cookie, but won't actually send it, if
 * we're viewing a different page than the one the cookie was set on
 */
fastify.get("/set-cookie", async (request, reply) => {
  reply.setCookie(cookieName, new Date().toISOString(), {
    secure: request.query.secure === "true",
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

/**
 * Demonstrates that Cypress will send the cookie if it's set on the same page
 * we're showing
 */
fastify.get("/set-and-show", async (request, reply) => {
  reply.type("text/html");
  const cookieValue = request.cookies[cookieName];
  if (!cookieValue) {
    reply.setCookie(cookieName, new Date().toISOString(), {
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
