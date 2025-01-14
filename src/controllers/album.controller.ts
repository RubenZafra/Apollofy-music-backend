import AlbumModel from '../models/album.model';
import { Album } from '../interfaces/album';
import { Request, Response } from 'express';

export const getAlbumTracks = async (req: Request, res: Response) => {
  const {id} = req.params;

  try {
    const album = await AlbumModel.find({id: id}).lean().exec();
    const data = await AlbumModel.findById(album[0]._id).populate('tracks').lean().exec();

    if (data) {
      res.status(200).send({data});
    } else if (!data) {
      res.status(404).send({ message: `Album with ID ${id} not found` });
    }
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

// Get All Albums
export const getAllAlbums = async (_req: Request, res: Response) => {
  try {
    const album = await AlbumModel.find({}).lean().exec();
    //console.log(album)

    if (album) {
      res.status(200).send({ data: album });
    } else if (!album) {
      res.status(404).send({ message: `Albums not found` });
    }
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const createAlbum = async (req: Request, res: Response) => {
  const { title, year, thumbnail, totalTracks, userId, likedBy }: Album =
    req.body;
  try {
    const newAlbum = await AlbumModel.create({
      title,
      year,
      thumbnail,
      totalTracks,
      userId,
      likedBy
    });
    res.status(200).send(newAlbum);
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};

export const deleteAlbum = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { title } = req.body;
  try {
    const album = await AlbumModel.findByIdAndDelete(id).lean().exec();
    res.status(200).send({
      status: true,
      message: `${title} has been deleted`,
      data: album
    });
  } catch (error) {
    res.status(500).send({ status: false, message: (error as Error).message });
  }
};

export const updateAlbum = async (req: Request, res: Response) => {
  const id = req.params.id;
  const props = req.body;

  try {
    await AlbumModel.findByIdAndUpdate(id, props).lean().exec();

    const updatedProps = Object.entries(props)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    res.status(200).send({ message: `Album ${id} modified: ${updatedProps}` });
  } catch (error) {
    res.status(500).send({ message: (error as Error).message });
  }
};