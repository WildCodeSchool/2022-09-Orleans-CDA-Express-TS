import type { Request, Response } from "express";

export interface Controller {
  [key: string]: (req: Request, res: Response) => Promise<void>;
}
