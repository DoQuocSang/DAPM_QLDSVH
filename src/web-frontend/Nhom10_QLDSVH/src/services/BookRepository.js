import axios from 'axios';
import { get_api } from './Method';
import { post_api } from './Method';

export function getRandomBooks(
    numBooks = 3
    ) {     
    return get_api(`https://localhost:7245/api/books/random/{limit}?numBooks=${numBooks}`)
}

export function getBooks(
    SortColumn = "Title",
    SortOrder = "ASC",
    PageSize = 30,
    PageNumber = 1,
    ) {     
    // return get_api(`https://localhost:7245/api/books?PageSize=${PageSize}&PageNumber=${PageNumber}`)
    return get_api(` https://localhost:7245/api/books?PageSize=${PageSize}&PageNumber=${PageNumber}&SortColumn=${SortColumn}&SortOrder=${SortOrder}`)
   
}

export function getBookBySlug(
    slug = "",
    PageSize = 30,
    PageNumber = 1
    ) {     
    //console.log(urlSlug)
    return get_api(`https://localhost:7245/api/books/byslug/${slug}?PageSize=${PageSize}&PageNumber=${PageNumber}`)
}

export function getBookByAuthorSlug(
    slug = "",
    SortColumn = "Title",
    SortOrder = "ASC",
    PageSize = 30,
    PageNumber = 1
    ) {     
    //console.log(urlSlug)
    return get_api(`https://localhost:7245/api/books?AuthorSlug=${slug}&PageSize=${PageSize}&PageNumber=${PageNumber}&SortColumn=${SortColumn}&SortOrder=${SortOrder}`)
}

export function getBookByCategorySlug(
    slug = "",
    SortColumn = "Title",
    SortOrder = "ASC",
    PageSize = 30,
    PageNumber = 1
    ) {     
    //console.log(urlSlug)
    return get_api(`https://localhost:7245/api/books?CategorySlug=${slug}&PageSize=${PageSize}&PageNumber=${PageNumber}&SortColumn=${SortColumn}&SortOrder=${SortOrder}`)
}

export function getBookRelatedBySlug(
    slug = "",
    PageSize = 30,
    PageNumber = 1
    ) {     
    //console.log(urlSlug)
    return get_api(`https://localhost:7245/api/books/byslug/related/${slug}?PageSize=${PageSize}&PageNumber=${PageNumber}`)
}



export async function getBookById(
    id = 0
    ) {
    if(id > 0){
        return get_api(`https://localhost:7245/api/books/${id}`);
    }
    return null;
}

export function addOrUppdateBook(
    formData
    ) {
    return post_api(``, formData);
}

