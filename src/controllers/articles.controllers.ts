import { Request, Response, NextFunction } from "express";
import Joi from "joi";
import AppError from "../utilities/error/appError";
import { ArticleModel } from "../models/model.article";
import {
  articleSchema,
  articleSchemaCreate,
  querySchema,
} from "../utilities/joi";

export class ArticleController {
  // Buscar
  static async getByName(req: Request, res: Response, next: NextFunction) {
    const { nombre } = req.query;

    // Validar parámetros
    const { error } = querySchema.validate(req.query);
    if (error) {
      return next(
        new AppError(
          "ValidationError",
          400,
          `Parámetros faltantes o inválidos en la consulta: ${error.message}`
        )
      );
    }

    // Verificar que el nombre esté presente y sea de tipo string
    if (!nombre || typeof nombre !== "string") {
      return next(
        new AppError(
          "InvalidParameterError",
          400,
          "El parámetro 'nombre' es obligatorio y debe ser una cadena de texto."
        )
      );
    }

    try {
      // Buscar artículos en la base de datos
      const articles: any = await ArticleModel.findArticlesByName(nombre);

      // Verificar si no se encontraron artículos
      if (articles.length === 0) {
        return next(
          new AppError(
            "NotFoundError",
            404,
            "No se encontraron productos con los criterios de búsqueda especificados."
          )
        );
      }

      // Validar el resultado con el esquema del artículo
      const validationResult = Joi.array()
        .items(articleSchema)
        .validate(articles);

      if (validationResult.error) {
        return next(
          new AppError(
            "ValidationError",
            400,
            `Error al validar productos: ${validationResult.error.message}`
          )
        );
      }

      // Devolver los artículos encontrados
      res.status(200).json({ articles });
    } catch (error: any) {
      return next(
        new AppError(
          "InternalServerError",
          500,
          `Error al realizar la búsqueda: ${error.message}`
        )
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
        new AppError(
          "ValidationError",
          400,
          `Todos los parámetros son requeridos: ${error.message}`
        )
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
      return next(
        new AppError(
          "InternalServerError",
          500,
          `Error al crear el artículo: ${error.message}`
        )
      );
    }
  }
}
