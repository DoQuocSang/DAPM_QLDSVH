import axios from 'axios';
import { get_api } from './Method';
import { delete_api } from './Method';
import { post_api } from './Method';
import { patch_api } from './Method';

export function getHeritageTypeById(
    id = 0,
    ) {    
    return get_api(`http://localhost:3000/v1/heritage-type/${id}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getHeritageTypes(
    page = 1,
    limit = 30
    ) {    
    return get_api(`http://localhost:3000/v1/heritage-type?page=${page}&limit=${limit}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function deleteHeritageTypeById(
    id = 0,
    ) {    
    return delete_api(`http://localhost:3000/v1/heritage-type/${id}`)
}

export function addHeritageType(
    formData
    ) {
    return post_api(`http://localhost:3000/v1/heritage-type`, formData);
}

export function patchHeritageType(
    id = 0,
    formData
    ) {
    return patch_api(`http://localhost:3000/v1/heritage-type/${id}`, formData);
}
