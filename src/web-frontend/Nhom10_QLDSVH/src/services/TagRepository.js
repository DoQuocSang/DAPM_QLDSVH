import axios from 'axios';
import { get_api } from './Method';
import { post_api } from './Method';


export function getTags(
    PageSize = 30,
    PageNumber = 1
    ) {     
    return get_api(`https://localhost:7245/api/tags?PageSize=${PageSize}&PageNumber=${PageNumber}`)
}

export function getTagBySlug(
    slug = ""
    ) {     
    return get_api(`https://localhost:7245/api/tags/${slug}`)
}

export function getPostsByTagSlug(
    slug = "",
    PageSize = 30,
    PageNumber = 1
    ) {     
    return get_api(`https://localhost:7245/api/tags/${slug}/posts?PageSize=${PageSize}&PageNumber=${PageNumber}`)
}


export async function getTagById(
    id = 0
    ) {
    if(id > 0){
        return get_api(`https://localhost:7245/api/tags/detail/${id}`);
    }
    return null;
}

export function addOrUpdateTag(
    formData
    ) {
    return post_api(``, formData);
}


