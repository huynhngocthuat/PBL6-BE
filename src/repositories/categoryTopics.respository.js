import { BaseRepository } from "commons/base.repository";
import db from "models";
import Sequelize from "sequelize";
const CategoryTopic = db.CategoryTopic;

export class CategoryTopicsRepository extends BaseRepository {
  constructor(model) {
    super(model);
  }
}

export default new CategoryTopicsRepository(CategoryTopic);
