import axios from 'axios';
import { get_api } from './Method';
import { post_api } from './Method';


export function getCategories(
    PageSize = 30,
    PageNumber = 1
    ) {     
    return get_api(`https://localhost:7245/api/categories?PageSize=${PageSize}&PageNumber=${PageNumber}`)
}

export function getCategoryBySlug(
    slug = ""
    ) {     
    return get_api(`https://localhost:7245/api/categories/${slug}`)
}

export function getPostsByCategorySlug(
    slug = "",
    PageSize = 30,
    PageNumber = 1
    ) {     
    return get_api(`https://localhost:7245/api/categories/${slug}/posts?PageSize=${PageSize}&PageNumber=${PageNumber}`)
}

export async function getCategoryById(
    id = 0
    ) {
    if(id > 0){
        return get_api(`https://localhost:7245/api/categories/detail/${id}`);
    }
    return null;
}

export function addOrUpdateCategory(
    formData
    ) {
    return post_api(``, formData);
}


