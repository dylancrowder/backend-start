import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { ArticleModel } from "../models/model.article";
import {
  articleSchema,
  articleSchemaCreate,
  querySchema,
} from "../utilities/joi";
import { HttpError } from "../utilities/error/httpError";

export class ArticleController {
  // Buscar
  static async getByName(req: Request, res: Response, next: NextFunction) {
    const { nombre } = req.query;

    // Validar parámetros
    const { error } = querySchema.validate(req.query);
    if (error) {
      return next(
        new HttpError(
          `Parámetros faltantes o inválidos en la consulta: ${error.message}`,
          400
        )
      );
    }

    // Verificar que el nombre esté presente y sea de tipo string
    if (!nombre || typeof nombre !== "string") {
      return next(
        new HttpError(
          "El parámetro 'nombre' es obligatorio y debe ser una cadena de texto.",
          400
        )
      );
    }

    try {
      // Buscar artículos en la base de datos
      const articles: any = await ArticleModel.findArticlesByName(nombre);

      // Verificar si no se encontraron artículos
      if (articles.length === 0) {
        return next(
          new HttpError(
            "No se encontraron productos con los criterios de búsqueda especificados.",
            404
          )
        );
      }

      // Validar el resultado con el esquema del artículo
      const validationResult = Joi.array()
        .items(articleSchema)
        .validate(articles);

      if (validationResult.error) {
        return next(
          new HttpError(
            `Error al validar productos: ${validationResult.error.message}`,
            400
          )
        );
      }

      // Devolver los artículos encontrados
      res.status(200).json({ articles });
    } catch (error: any) {
      return next(
        new HttpError(`Error al realizar la búsqueda: ${error.message}`, 500)
      );
    }
  }
  // Crear
  static async create(req: Request, res: Response, next: NextFunction) {
    const { nombre, marca } = req.body;

    // Validar datos del artículo
    const { error } = articleSchemaCreate.validate(req.body);
    if (error) {
      return next(
        new HttpError(`Todos los parámetros son requeridos`, 400, error)
      );
    }

    try {
      const result: any = await ArticleModel.createArticle(nombre, marca);
      const newArticle = {
        id: result.insertId,
        nombre: nombre,
        marca: marca,
        estado: true,
      };

      res.status(201).json({
        message: "Artículo creado exitosamente",
        newArticle: newArticle,
      });
    } catch (error: any) {
      console.error(error);
      next(new HttpError(`Error al crear el artículo`, 500, error));
    }
  }
}
