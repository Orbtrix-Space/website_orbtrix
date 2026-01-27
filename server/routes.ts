import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Frontend-only application. 
  // No API routes needed for the minimal requirements.
  // The frontend handles all data via static JSON/Arrays.

  return httpServer;
}
