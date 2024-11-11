import { NextFunction, Request, Response } from "express";
import Joi from "joi";

import { ArticleModel } from "../models/model.article";
import {
  articleSchema,
  articleSchemaCreate,
  querySchema,
  updateQuery,
} from "../utilities/joi";
import { HttpError } from "../utilities/error/httpError";
import { Article } from "../interfaces/article.interface";

export class ArticleController {
  // Buscar
  static async getByFilters(req: Request, res: Response, next: NextFunction) {
    const { nombre, is_active, exact_match } = req.query;

    //Validar parametros
    const { error } = querySchema.validate(req.query);
    if (error) {
      return next(
        new HttpError(`Parametros faltantes en la consulta`, 400, error)
      );
    }

    const isExactMatch = exact_match === "true";

    try {
      // Buscar Articulos DB
      const articles: any = await ArticleModel.findArticlesByFilters(
        nombre as string | undefined,
        is_active === "true",
        isExactMatch
      );

      if (articles.length === 0) {
        return next(
          new HttpError(
            "No se encontraron productos con los criterios de búsqueda especificados.",
            404,
            "el array no contiene nada"
          )
        );
      }
      // Validar resultado
      const validationResult = Joi.array()
        .items(articleSchema)
        .validate(articles);
      if (validationResult.error) {
        return next(
          new HttpError(
            `Error al validar productos.`,
            400,
            validationResult.error
          )
        );
      }

      res.status(200).json(articles);
    } catch (error: any) {
      next(new HttpError(`Error inesperado`, 500, error));
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

  // Actualizar
  static async update(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    // Validar el body
    const { error } = updateQuery.validate(req.body);
    if (error) {
      return next(
        new HttpError("Error en los parametros enviados", 400, error)
      );
    }

    try {
      const updates: Partial<Article> = req.body;
      const result: any = await ArticleModel.updateArticle(
        parseInt(id),
        updates
      );
      if (result.affectedRows === 0) {
        return next(
          new HttpError(
            "No se encontró el artículo para actualizar.",
            404,
            "err"
          )
        );
      }
      res.status(200).json({ message: "Artículo actualizado exitosamente." });
    } catch (error: any) {
      next(
        new HttpError(
          `Error al actualizar el artículo: ${error.message}`,
          500,
          error
        )
      );
    }
  }

  // Desactivar
  static async deactivate(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    // Validar que el ID sea un número
    const { error } = Joi.number().required().validate(Number(id));
    if (error) {
      return next(new HttpError(`El ID debe ser un número válido`, 400, error));
    }

    try {
      const result: any = await ArticleModel.deactivateArticle(Number(id));

      // Si el artículo no existe lanzar un error
      if (!result) {
        return next(new HttpError(`Artículo no encontrado`, 404, result));
      }

      res.status(200).json({
        message: "Artículo desactivado exitosamente",
        article: {
          id: result.id,
          nombre: result.nombre,
          marca: result.marca,
          estado: result.estado,
        },
      });
    } catch (error: any) {
      console.error(error);
      next(new HttpError(`Error al desactivar el artículo`, 500, error));
    }
  }
}
