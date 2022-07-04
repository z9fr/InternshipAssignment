import APIError from "../../errors/api-error";
import { Request, Response, NextFunction } from "express";
import Note from "../../models/note";
import { decodedPayload } from "../../utils/jwtDecoder";
import { Not } from "typeorm";

export const getNotes = async (req: Request, res: Response) => {
  const notes = await Note.list(req.query);
  res.json(notes);
};

export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const note = new Note(req.body);
  const authorization = req.headers["authorization"];

  try {
    const token = authorization?.split(" ")[1];
    const payload = decodedPayload(token!);
    note.ownedBy = payload.id;

    if (payload) {
      note.ownedBy = payload.id;
      const saved_note = await note.save();
      res.json(saved_note);
    } else {
      throw new APIError({
        message: "Unable to save the note",
        status: 500,
        errors: [],
      });
    }
  } catch (err) {
    next(err);
  }
};

export const getUserNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const note = new Note(req.body);
  const authorization = req.headers["authorization"];

  try {
    const token = authorization?.split(" ")[1];
    const payload = decodedPayload(token!);
    note.ownedBy = payload.id;

    if (payload) {
      const notes = await Note.myNotes({
        page: req.query?.page || 1,
        perPage: req.query?.perPage || 30,
        ownedBy: payload.id,
      });

      res.json(notes);
    } else {
      throw new APIError({
        message: "Unable to fetch notes",
        status: 500,
        errors: [],
      });
    }
  } catch (err) {
    next(err);
  }
};
