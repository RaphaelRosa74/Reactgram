const { body } = require("express-validator");

const photoInsertValidation = () => {
  return [
    body("title")
      .not()
      .equals("undefined")
      .withMessage("O titulo é obrigatorio")
      .isString()
      .withMessage("O titulo é obrigatorio")
      .isLength({ min: 3 })
      .withMessage("O titulo é obrigatorio"),
    body("image").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("A imagem não é valida");
      }
      return true;
    }),
  ];
};

const photoUpdateValidation = () => {
  return [
    body("title")
      .optional()
      .isString()
      .withMessage("O título é obrigatorio!")
      .isLength({ min: 3 })
      .withMessage("O titulo é obrigatorio"),
  ];
};

const commentValidation = () => {
  return[
    body("comment").isString().withMessage("O comentario é obrigatorio!"),
  ];
};

module.exports = {
  photoInsertValidation,
  photoUpdateValidation,
  commentValidation,
};
