import { Request, Response } from "express";
import UserModel from "../models/auth.model";

const authController = {
  login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = UserModel.find(username);

    if (user && user.password === password) {
      req.session.user = username;
      res.json(
        "iniciaste session correctamente,ahora puedes utilizar toda la API"
      );
    } else {
      res.json("Credenciales incorrectas");
    }
  },

  logout(req: Request, res: Response) {
    req.session.destroy();
    res.json("Cerraste session correctamente");
  },
};

export default authController;
