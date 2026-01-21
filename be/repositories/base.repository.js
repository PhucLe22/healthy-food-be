export default class BaseRepository {
  constructor(model) {
    this.model = model;
  }

    async create(data) {
    return await this.model.create(data);
    }

    async findAll(filter = {}, options = {}) {
    const { populate = "", sort = { createdAt: -1 }, limit, skip } = options;

    let query = this.model.find(filter).sort(sort);

    if (populate) {
      query = query.populate(populate);
    }

    if (limit) query = query.limit(limit);
    if (skip) query = query.skip(skip);

    return await query.exec();
    }

    async findById(id, populate = "") {
    return await this.model.findById(id).populate(populate).exec();
    }

    async findOne(filter = {}, populate = "") {
    return await this.model.findOne(filter).populate(populate).exec();
    }

    async updateById(id, data) {
    return await this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    async deleteById(id) {
    return await this.model.findByIdAndDelete(id).exec();
    }
}