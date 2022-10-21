import { BaseRepository } from "commons/base.repository";
import db from "models";
import Sequelize from "sequelize";
const CategoryTopic = db.CategoryTopic;

export class CategoryTopicsRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }

  async getCategoryByName(name) {
    try {
      return await this.model.findOne({
        where: {
          name: {
            $iLike: `%${name}%`,
          },
        },
      });
    } catch (err) {
      console.log("Cannot get category by name", err);
    }
  }
}

export default new CategoryTopicsRepository(CategoryTopic);
