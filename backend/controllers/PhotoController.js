const Photo = require("../models/Photo");
const User = require("../models/User");
const mongoose = require("mongoose");

//Insert a photo, with an user related to it
const insertPhoto = async (req, res) => {
  const { title } = req.body;
  const image = req.file.filename;
  const reqUser = req.user;
  const user = await User.findById(reqUser._id);

  //Create a photo
  const newPhoto = await Photo.create({
    image,
    title,
    userId: user._id,
    userName: user.name,
  });

  //if photo was created sucessfully, return data
  if (!newPhoto) {
    res.status(422).json({
      errors: ["Houve um problema, tente novamente mais tarde"],
    });
    return;
  }

  res.status(201).json(newPhoto);
};

//Delete photo
const deletePhoto = async (req, res) => {
  const { id } = req.params;
  const reqUser = req.user;

  try {
    const photo = await Photo.findById(id);

    //Check if photo exist
    if (!photo) {
      return res.status(404).json({ errors: ["Foto não encontrada"] });
    }

    //Check if photo belongs user
    if (!photo.userId.equals(reqUser._id)) {
      return res
        .status(422)
        .json({ errors: ["Você não tem permissão para excluir esta foto"] });
    }

    await Photo.findByIdAndDelete(photo._id);

    res
      .status(200)
      .json({ id: photo._id, message: "Foto excluída com sucesso!" });
  } catch (error) {
    console.error("Erro ao excluir foto:", error);
    res.status(500).json({ errors: ["Erro interno do servidor"] });
  }
};

//Get all Photos
const getAllPhotos = async (req, res) => {
  const photos = await Photo.find({})
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

//Get user photos
const getUserPhotos = async (req, res) => {
  const { id } = req.params;
  const photos = await Photo.find({ userId: id })
    .sort([["createdAt", -1]])
    .exec();

  return res.status(200).json(photos);
};

//Get photo by id
const getPhotoById = async (req, res) => {
  const { id } = req.params;

  const photo = await Photo.findById(id);

  if (!photo) {
    res.status(404).json({ errors: ["Foto não encontada"] });
    return;
  }
  res.status(200).json(photo);
};

//Update a photo (CORRIGIDA)
const updatePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const reqUser = req.user;

    // Verificação segura do body
    const title = req.body ? req.body.title : undefined;

    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({ errors: ["Foto não encontrada."] });
    }

    if (!photo.userId.equals(reqUser._id)) {
      return res
        .status(422)
        .json({ errors: ["Essa foto não pertence a esse usuario."] });
    }

    if (title) {
      photo.title = title;
    }

    await photo.save();

    res.status(200).json({ photo, message: "Foto atualizada com sucesso!" });
  } catch (error) {
    console.error("Erro ao atualizar foto:", error);
    res.status(500).json({ errors: ["Erro interno do servidor"] });
  }
};

//Like functionality (CORRIGIDA)
const likePhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const reqUser = req.user;
    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({ errors: ["Foto não encontrada."] });
    }

    if (photo.likes.includes(reqUser._id)) {
      return res.status(422).json({ errors: ["Você já curtiu essa foto."] });
    }

    //Put user id in likes array
    photo.likes.push(reqUser._id);
    await photo.save();

    res.status(200).json({
      photoId: id,
      userId: reqUser._id,
      message: "A foto foi curtida",
    });
  } catch (error) {
    console.error("Erro ao curtir foto:", error);
    res.status(500).json({ errors: ["Erro interno do servidor"] });
  }
};

//Comments functionality (CORRIGIDA)
const commentPhoto = async (req, res) => {
  try {
    const { id } = req.params;
    const reqUser = req.user;

    // Verificação segura do body
    const comment = req.body ? req.body.comment : undefined;

    if (!comment) {
      return res.status(400).json({ errors: ["O comentário é obrigatório"] });
    }

    const user = await User.findById(reqUser._id);
    const photo = await Photo.findById(id);

    if (!photo) {
      return res.status(404).json({ errors: ["Foto não encontrada."] });
    }

    //Put comment in the array of comments
    const userComment = {
      comment,
      userName: user.name,
      userImage: user.profileImage,
      userId: user._id, // Corrigido: user._id em vez de user.id
    };

    photo.comments.push(userComment);
    await photo.save();

    res.status(200).json({
      comment: userComment,
      message: "O comentario foi adicionado com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao comentar foto:", error);
    res.status(500).json({ errors: ["Erro interno do servidor"] });
  }
};

//Search photos by title
const searchPhotos = async (req, res) => {
  const { q } = req.query;
  const photos = await Photo.find({ title: new RegExp(q, "i") }).exec();

  res.status(200).json(photos);
};

module.exports = {
  insertPhoto,
  deletePhoto,
  getAllPhotos,
  getUserPhotos,
  getPhotoById,
  updatePhoto,
  likePhoto,
  commentPhoto,
  searchPhotos,
};
