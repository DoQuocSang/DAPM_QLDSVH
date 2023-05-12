import axios from 'axios';
import { get_api } from './Method';
import { post_api } from './Method';

export function getAuthors(
    PageSize = 30,
    PageNumber = 1
    ) {     
    return get_api(`https://localhost:7245/api/authors?PageSize=${PageSize}&PageNumber=${PageNumber}`)
}

export function getAuthorBySlug(
    slug = ""
    ) {     
    return get_api(`https://localhost:7245/api/authors/${slug}`)
}

export function getPostsByAuthorSlug(
    slug = "",
    PageSize = 30,
    PageNumber = 1
    ) {     
    return get_api(`https://localhost:7245/api/authors/${slug}/posts?PageSize=${PageSize}&PageNumber=${PageNumber}`)
}

// export function getPostsByAuthorSlugasdsda(
//     slug = "",
//     PageSize = 30,
//     PageNumber = 1
//     ) {     
//     return get_api(`https://localhost:7245/api/authors`)
// }

// export async function updateService(id = 0, formData) {
//     return put_api(`https://localhost:7024/api/services/${id}`, formData);
//   }


export async function getAuthorById(
    id = 0
    ) {
    if(id > 0){
        return get_api(`https://localhost:7245/api/authors/detail/${id}`);
    }
    return null;
}

export function addOrUpdateAuthor(
    formData
    ) {
    return post_api(``, formData);
}


