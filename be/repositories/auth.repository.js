import BaseRepository from "./base.repository.js";
import User from "../models/user.model.js";
import { Op } from "sequelize";

class AuthRepository extends BaseRepository {
  constructor() {
    super(User);
  }
  
  async IdentifyAccount(identifier) {
    const normalized = identifier.trim().toLowerCase();
    return await this.findOne({
      [Op.or]: [
        { email: normalized }, 
        { phoneNumber: normalized }
      ]
    });
  }
}

export default new AuthRepository();