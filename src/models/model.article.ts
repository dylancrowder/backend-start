import { connectToDatabase } from "../db/db_connect";


export class ArticleModel {
  // Filtrar  por nombre
  static async findArticlesByName(nombre: string) {
    let query = "SELECT * FROM ARTICLE WHERE 1=1";
    const params: string[] = [];

    if (nombre) {
      query += " AND NOMBRE LIKE CONCAT('%', ?, '%')";
      params.push(nombre);
    }

    try {
      const dbPool = await connectToDatabase();
      const [rows] = await dbPool.query(query, params);
      return rows;
    } catch (error: any) {
      throw new Error(`Error al buscar el artículo: ${error.message}`);
    }
  }

  // Crear artículos
  static async createArticle(nombre: string, marca: string) {
    const query =
      "INSERT INTO ARTICLE (NOMBRE, MARCA, ESTADO) VALUES (?, ?, ?)";
    const params: [string, string, boolean] = [nombre, marca, true];

    try {
      const dbPool = await connectToDatabase();
      const [result] = await dbPool.query(query, params);
      return result;
    } catch (error: any) {
      throw new Error(`Error al crear el artículo: ${error.message}`);
    }
  }
}
