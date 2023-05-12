import axios from 'axios';
import { get_api } from './Method';

export function getHeritageById(
    ) {    
    return get_api("http://localhost:3000/v1/di-san-van-hoa/3")
    // return get_api(`https://localhost:7245/api/users?PageSize=30&PageNumber=1`)
}

