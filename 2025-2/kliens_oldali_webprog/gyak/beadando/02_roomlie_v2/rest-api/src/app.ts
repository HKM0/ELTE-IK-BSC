import { OpenAPIHono } from "@hono/zod-openapi";
import { swaggerUI } from "@hono/swagger-ui";
import { cors } from "hono/cors";
import { authRouter } from "./routes/auth.js";
import { tablesRouter } from "./routes/tables.js";
import { bookingsRouter } from "./routes/bookings.js";
import type { AppEnv } from "./types.js";
import { logger } from "hono/logger";
import { prettyJSON } from "hono/pretty-json";

export function createApp() {
  const app = new OpenAPIHono<AppEnv>();

  // ─── CORS ──────────────────────────────────────────────────────────────────
  app.use(
    "*",
    cors({
      origin: (origin) => {
        const allowed = [
          "http://localhost:5173",
          process.env.FRONTEND_URL,
        ].filter(Boolean) as string[];
        return allowed.includes(origin) ? origin : allowed[0];
      },
      allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
      allowHeaders: ["Content-Type", "Authorization"],
      credentials: true,
    }),
  );

  // ─── Security scheme  ───────────────────────────────────────────────────────
  app.openAPIRegistry.registerComponent("securitySchemes", "Bearer", {
    type: "http",
    scheme: "bearer",
    description: "Paste the token received from POST /api/v1/auth/login.",
  });

  app.use(logger());
  app.use(prettyJSON());

  // ─── API v1 routes ─────────────────────────────────────────────────────────
  const v1 = new OpenAPIHono<AppEnv>();
  v1.route("/auth", authRouter);
  v1.route("/tables", tablesRouter);
  v1.route("/bookings", bookingsRouter);
  app.route("/api/v1", v1);

  // ─── OpenAPI spec ──────────────────────────────────────────────────────────
  app.doc("/openapi.json", {
    openapi: "3.0.0",
    info: {
      title: "Roomlie API",
      version: "1.0.0",
      description: "REST API for the Roomlie table booking system.",
    },
    servers: [{ url: `http://localhost:${process.env.PORT ?? 3000}` }],
  });

  // ─── Swagger UI ────────────────────────────────────────────────────────────
  app.get("/docs", swaggerUI({ url: "/openapi.json" }));

  // ─── Health check ──────────────────────────────────────────────────────────
  app.get("/", (c) => c.json({ status: "ok", version: "1.0.0" }));

  // ─── Error handling ────────────────────────────────────────────────────────
  app.onError((err, c) => {
    console.error(err);
    return c.json({ message: "Internal server error" }, 500);
  });

  app.notFound((c) => c.json({ message: "Not found" }, 404));

  return app;
}
