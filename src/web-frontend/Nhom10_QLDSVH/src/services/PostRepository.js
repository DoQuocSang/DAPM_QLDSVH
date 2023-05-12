import axios from 'axios';
import { get_api } from './Method';
import { post_api } from './Method';

export function getFeaturedPosts(
    numBooks=2
    ) {     
    return get_api(`https://localhost:7245/api/posts/featured/{limit}?numPosts=${numBooks}`)
}

export function getRandomPosts(
    numBooks=6
    ) {     
    return get_api(`https://localhost:7245/api/posts/random/{limit}?numPosts=${numBooks}`)
}

export function getPosts(
    PageSize = 100,
    PageNumber = 1
    ) {     
    return get_api(`https://localhost:7245/api/posts?PageSize=${PageSize}&PageNumber=${PageNumber}`)
}

export function getPostBySlug(
    slug = "",
    PageSize = 30,
    PageNumber = 1
    ) {     
    //console.log(urlSlug)
    return get_api(`https://localhost:7245/api/posts/byslug/${slug}?PageSize=${PageSize}&PageNumber=${PageNumber}`)
}

export async function getPostById(
    id = 0
    ) {
    if(id > 0){
        return get_api(`https://localhost:7245/api/posts/${id}`);
    }
    return null;
}

export function addOrUppdatePost(
    formData
    ) {
    return post_api(`https://localhost:7245/api/posts`, formData);
}