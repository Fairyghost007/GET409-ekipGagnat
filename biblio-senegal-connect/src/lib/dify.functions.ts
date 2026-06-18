import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const DIFY_API_KEY = process.env.DIFY_API_KEY;
const DIFY_URL = "https://api.dify.ai/v1/workflows/run";

export const askDifyAgent = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({
      query: z.string().min(1).max(2000),
      ressource_terrain: z.string().max(2000).optional(),
    }).parse(input),
  )
  .handler(async ({ data }) => {
    if (!DIFY_API_KEY) {
      return { ok: false as const, error: "network" as const };
    }
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const res = await fetch(DIFY_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${DIFY_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: {
            query: data.query,
            ...(data.ressource_terrain
              ? { ressource_terrain: data.ressource_terrain }
              : {}),
          },
          response_mode: "blocking",
          user: "user-bibliosen-" + Date.now(),
        }),
        signal: controller.signal,
      });
      if (!res.ok) {
        return { ok: false as const, error: "network" as const };
      }
      const json = (await res.json()) as {
        data?: { outputs?: unknown };
      };
      const raw = json?.data?.outputs ?? null;
      const extracted: string =
        raw == null
          ? ""
          : typeof raw === "string"
            ? raw
            : typeof (raw as Record<string, unknown>).text === "string"
              ? ((raw as Record<string, unknown>).text as string)
              : JSON.stringify(raw, null, 2);
      const outputs = extracted.replace(/<think>[\s\S]*?<\/think>/gi, "").trim();
      return { ok: true as const, outputs };
    } catch (e) {
      const isAbort = e instanceof Error && e.name === "AbortError";
      return {
        ok: false as const,
        error: isAbort ? ("timeout" as const) : ("network" as const),
      };
    } finally {
      clearTimeout(timeout);
    }
  });