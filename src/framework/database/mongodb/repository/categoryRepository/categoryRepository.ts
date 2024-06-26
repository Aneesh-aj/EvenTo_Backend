import { IeventCategory } from "../../../../../entities/eventCategory";
import { IcategoryRepository } from "../../../../../usecases/interface/repositoryInterface/categoryRepository";

import {activeCategory, addCategory, deleteCategory, editCategory, getAllCategory} from "./category/index"

export class CategoryRepository implements IcategoryRepository{
      constructor(){}

      async  addCategory(category: string): Promise<IeventCategory | undefined> {
          return await addCategory(category)
      }

      async  getAllCategory(): Promise<IeventCategory[] | undefined> {
           return await getAllCategory()   
      }

      async  deleteCategory(id: string): Promise<IeventCategory[] | undefined> {
           return await deleteCategory(id)
      }

      async  activeCategory(id: string): Promise<IeventCategory[] | undefined> {
          return await activeCategory(id)
      }

      async  editCategory(id: string, category: string): Promise<{ success: boolean; message: string; }> {
          return await editCategory(id,category)
      }
}