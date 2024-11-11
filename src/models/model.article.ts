import { connectToDatabase } from "../db/db_connect";
import { Article } from "../interfaces/article.interface";

export class ArticleModel {
  //Filtrar articulos
  static async findArticlesByFilters(
    nombre?: string,
    isActive?: boolean,
    exactMatch?: boolean
  ) {
    let query = "SELECT * FROM ARTICLE WHERE 1=1";
    const params: (string | boolean)[] = [];

    if (nombre) {
      if (exactMatch) {
        query += " AND NOMBRE = ?";
      } else {
        query += " AND NOMBRE LIKE CONCAT('%', ?, '%')";
      }
      params.push(nombre);
    }

    if (isActive !== undefined) {
      query += " AND ESTADO = ?";
      params.push(isActive);
    }

    try {
      const dbConnect = await connectToDatabase();
      const [rows] = await dbConnect.query(query, params);
      return rows;
    } catch (error: any) {
      throw new Error(`Error al buscar un articulo: ${error.message}`);
    }
  }

  //Crear articulos
  static async createArticle(nombre: string, marca: string) {
    const query =
      "INSERT INTO ARTICLE (NOMBRE, MARCA, ESTADO) VALUES (?, ?, ?)";
    const params: [string, string, boolean] = [nombre, marca, true];

    try {
      const dbConnect = await connectToDatabase();
      const [result] = await dbConnect.query(query, params);
      return result;
    } catch (error: any) {
      throw new Error(`Error al crear el artículo: ${error.message}`);
    }
  }

  // Update
  static async updateArticle(id: number, updates: Partial<Article>) {
    const updateFields = Object.keys(updates)
      .map((field) => `${field} = ?`)
      .join(", ");

    const params = [...Object.values(updates), id];
    const sql = `UPDATE ARTICLE SET ${updateFields} WHERE ID = ?`;

    try {
      const dbConnect = await connectToDatabase();
      const [result] = await dbConnect.query(sql, params);
      return result;
    } catch (error: any) {
      throw new Error(`Error al actualizar el articulo: ${error.message}`);
    }
  }
  // Desactivar un Artículo
  static async deactivateArticle(id: number) {
    const query = "UPDATE ARTICLE SET ESTADO = ? WHERE ID = ?";
    const params: [boolean, number] = [false, id];

    try {
      const dbConnect = await connectToDatabase();
      await dbConnect.query(query, params);
      return { id, nombre: "", marca: "", estado: false };
    } catch (error: any) {
      throw new Error(`Error al desactivar el articulo: ${error.message}`);
    }
  }
}
