import APIError from "../../errors/api-error";
import { Request, Response, NextFunction } from "express";
import Note from "../../models/note";
import { decodedPayload } from "../../utils/jwtDecoder";
import mongoose from "mongoose";

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

export const updateNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const note = await Note.get(id);
    const newNote = new Note(req.body);
    newNote._id = id;

    console.log(newNote);
    await note.updateOne(newNote, { override: true, upsert: true });
    const updatedNote = await Note.findById(note._id);
    res.json(updatedNote);
  } catch (err) {
    next(err);
  }
};

export const deleteNote = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    Note.findByIdAndRemove("62c609b25a27fe7f8a5798b3");

    Note.findByIdAndRemove(req.params.id, (err: Error) => {
      if (!err) {
        res.json({ success: true });
      } else {
        console.log(err);
        new APIError({
          status: 401,
          err,
        });
      }
    });
  } catch (err) {
    next(err);
  }
};
