import Joi from "joi";

// Esquema para validar los parámetros de consulta
export const querySchema = Joi.object({
  nombre: Joi.string().optional(),
  is_active: Joi.string().valid("true", "false").optional(),
  exact_match: Joi.string().valid("true", "false").optional(),
});

// Esquema para validar la estructura de un artículo
export const articleSchema = Joi.object({
  ID: Joi.number().required(),
  NOMBRE: Joi.string().required(),
  MARCA: Joi.string().required(),
  ESTADO: Joi.number().valid(0, 1).required(),
  FECHA_MODIFICACION: Joi.date().required(),
});

export const articleSchemaCreate = Joi.object({
  nombre: Joi.string().required(),
  marca: Joi.string().required(),
});

export const updateQuery = Joi.object({
  nombre: Joi.string().optional(),
  marca: Joi.string().optional(),
  estado: Joi.number().valid(0, 1).optional(),
});
