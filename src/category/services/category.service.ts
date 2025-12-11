import { parse } from "node:path";
import { AppError } from "../../utils/appError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../../utils/errors";
import { CreateCategoryDto } from "../dtos/category.create.dto";
import { DeleteCategoryDto } from "../dtos/category.delete.dto";
import { UpdateCategoryDto } from "../dtos/category.update.dto";
import { CategoryRepository } from "../repositories/category.repository";

export class CategoryService {
  private readonly repo: CategoryRepository;

  constructor() {
    this.repo = new CategoryRepository();
  }

  async create(data: CreateCategoryDto,adminId:number) {
    //if category name is not there throw error 
    if(!data.categoryname){

      throw new AppError(
        ERROR_CODES.CATEGORY_CREATION_FAILED,
        ERROR_MESSAGES.CATEGORY_CREATION_FAILED,
        HTTP_STATUS.BAD_REQUEST
      );

    }
    const name = await this.repo.findByCategoryName(data.categoryname);
    if(name){

       throw new AppError(
        ERROR_CODES.CATEGORY_ALREADY_EXISTS,
        ERROR_MESSAGES.CATEGORY_ALREADY_EXISTS,
        HTTP_STATUS.BAD_REQUEST
      );

    }
    //to find if there exist a category with the given id or not

    const parsedData = {
      ...data,
    };

    return this.repo.createCategory(parsedData,adminId);
  }

  async getAll() {
    return this.repo.findAll();
  }

  async getOne(id: number) {
    const category = await this.repo.findById(id);
    if (!category) {
      throw new AppError(
        ERROR_CODES.CATEGORY_NOT_FOUND,
        ERROR_MESSAGES.CATEGORY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    return category;
  }

  async update(id: number, data: UpdateCategoryDto,adminId:number) {
    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new AppError(
        ERROR_CODES.CATEGORY_NOT_FOUND,
        ERROR_MESSAGES.CATEGORY_NOT_FOUND,
        HTTP_STATUS.NOT_FOUND
      );
    }
    const parsedData = {
      ...data,
    };

    return this.repo.updateCategory(id, parsedData,adminId);
  }

  async delete(id: number) {
    const existing = await this.repo.findById(id);

    if (!existing) {
      throw new AppError(
        ERROR_CODES.CATEGORY_DELETE_FAILED,
        ERROR_MESSAGES.CATEGORY_DELETE_FAILED,
        HTTP_STATUS.NOT_FOUND
      );
    }

    return this.repo.deleteCategory(id);
  }
}
