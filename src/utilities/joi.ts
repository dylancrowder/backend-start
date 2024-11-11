import Joi from "joi";

// Esquema para validar los parámetros de consulta
export const querySchema = Joi.object({
  nombre: Joi.string().optional(),
});

// Esquema para validar la estructura de un artículo
export const articleSchema = Joi.object({
  ID: Joi.number().required(),
  NOMBRE: Joi.string().required(),
  MARCA: Joi.string().required(),
  FECHA_MODIFICACION: Joi.date().required(),
});

export const articleSchemaCreate = Joi.object({
  nombre: Joi.string().required(),
  marca: Joi.string().required(),
});
