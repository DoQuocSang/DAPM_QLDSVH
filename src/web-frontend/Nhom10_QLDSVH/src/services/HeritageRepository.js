import axios from 'axios';
import { get_api } from './Method';
import { delete_api } from './Method';

export function getHeritageById(
    id = 0,
    ) {    
    return get_api(`http://localhost:3000/v1/heritage/${id}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function getHeritages(
    page = 1,
    limit = 30
    ) {    
    return get_api(`http://localhost:3000/v1/heritage?page=${page}&limit=${limit}`)
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

export function deleteHeritageById(
    id = 0,
    ) {    
    return delete_api(`http://localhost:3000/v1/heritage/${id}`)
}



