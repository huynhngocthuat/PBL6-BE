import { CategoryTopicsService } from "services";
import Response from "helpers/response";
import * as CONSTANTS from "constants";

class CategoryTopicsController {
  constructor(service) {
    this.service = service;
    this.create = this.create.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.get = this.get.bind(this);
  }

  async create(req, res) {
    try {
      const categoryTopic = await this.service.create(req.body);
      return Response.success(
        res,
        { docs: categoryTopic },
        CONSTANTS.STATUS_OK
      );
    } catch (error) {
      return Response.error(res, error, 400);
    }
  }

  async get(req, res) {
    try {
      const id = req.params.id;
      const categoryTopics = await this.service.get(id);

      return Response.success(
        res,
        { docs: categoryTopics },
        CONSTANTS.STATUS_OK
      );
    } catch (error) {
      console.log("controller", error);
      return Response.error(res, error, 400);
    }
  }

  async update(req, res) {
    try {
      const id = req.params.id;
      const data = await this.service.update(id, req.body);
      if (data) {
        return Response.success(res, { docs: data }, CONSTANTS.STATUS_OK);
      }
    } catch (error) {
      return Response.error(res, error, 400);
    }
  }

  async delete(req, res) {
    try {
      const id = req.params.id;
      console.log(id);
      const data = await this.service.delete(id);
      return Response.success(res, { docs: data }, CONSTANTS.STATUS_OK);
    } catch (error) {
      return Response.error(res, error, 400);
    }
  }
}

export default new CategoryTopicsController(CategoryTopicsService);
