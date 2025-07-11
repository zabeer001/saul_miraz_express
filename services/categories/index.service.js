import Category from "../../models/category.model.js";
import { formatPaginationResponse } from "../../helpers/formatPaginationResponse.js";

export const indexService = async (req) => {
  try {

    
    const params = req.query;
    const page = parseInt(params?.page, 10) ?? 1;
    const per_page = parseInt(params?.paginate_count, 10) ?? 10;
    

    const options = {
      page,
      limit: per_page,
      lean: true, 
    };

      

    const paginationResult = await Category.paginate({}, options);
    const data = formatPaginationResponse(paginationResult, params, req);
  // console.log('hello');
    // return {success:true , ...data};
    return {success:true , data};
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error.message}`);
  }
};