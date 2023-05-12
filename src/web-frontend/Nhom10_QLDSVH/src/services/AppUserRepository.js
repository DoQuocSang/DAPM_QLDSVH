import axios from 'axios';
import { specical_case_get_api } from './Method';
import { post_api } from './Method';

export function getUsers(
    PageSize = 30,
    PageNumber = 1
    ) {    
    return specical_case_get_api(`https://localhost:7245/api/users?PageSize=${PageSize}&PageNumber=${PageNumber}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export async function getUserById(
    id = 0
    ) {
    return null;
}

export function addOrUpdateUser(
    formData
    ) {
    return null;
}


