import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Book1 from "images/book1.png"
import Book2 from "images/book2.jpg"
import Book3 from "images/book3.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getUsers } from "../../../services/AppUserRepository";
import DefaultImage from "images/post-default.png"
import Error404 from "../../../components/admin/other/Error404";

export default () => {

    const [usersList, setUsersList] = useState([]);
    const [metadata, setMetadata] = useState([]);

    useEffect(() => {
        getUsers().then(data => {
            if (data) {
              setUsersList(data.items);
              setMetadata(data.metadata);
            }
            else
              setUsersList([]);
            //console.log(data)
          })
    }, []);

    return (
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
            <main>
                <div className="pt-6 px-4">
                    <div className="w-full mb-8">
                        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Quản tài khoản</h3>
                                    <span className="text-base font-normal text-gray-500">Các tài khoản hiện có trong database</span>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link to="/admin/dashboard/add-user">
                                        <a className="hidden transition duration-300 sm:inline-flex ml-5 text-white bg-teal-400 hover:bg-teal-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                                            <FontAwesomeIcon icon={faPlus} className="text-base mr-3" />
                                            Thêm
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-col mt-8">
                                <div className="overflow-x-auto rounded-lg">
                                    <div className="align-middle inline-block min-w-full">
                                        <div className="shadow overflow-hidden sm:rounded-lg">
                                            <table className="min-w-full divide-y divide-gray-200">
                                                <thead className="bg-gray-50">
                                                    <tr>
                                                        <th scope="col" className="p-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Id
                                                        </th>
                                                        <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Tên tài khoản
                                                        </th>
                                                        <th scope="col" className="p-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Ảnh
                                                        </th>
                                                        <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Email
                                                        </th>
                                                        <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Sửa
                                                        </th>
                                                        <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Xóa
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="bg-white">
                                                {usersList.map((user, index) => (
                                                    <tr>
                                                        {/* <td className="p-4  text-sm font-normal text-gray-900">
                                                            Payment from <span className="font-semibold">Bonnie Green</span>
                                                        </td> */}
                                                        <td className="p-4 text-center text-sm font-bold text-gray-500">
                                                            {index + 1}
                                                        </td>
                                                        <td className="p-4  text-sm font-semibold text-gray-500">
                                                            {user.username}
                                                        </td>
                                                        <td className="p-4 text-sm font-normal text-gray-500">
                                                            <img className="h-20 w-auto rounded-full mx-auto" src={DefaultImage} alt="Neil image" />
                                                        </td>
                                                        <td className="p-4  text-sm font-normal text-gray-500">
                                                            {user.email}
                                                        </td>
                                                        <th scope="col" className="p-4 text-left text-xl font-semibold text-emerald-400 uppercase tracking-wider">
                                                        <Link to={`/admin/dashboard/update-user/${user.id}`}>
                                                            <FontAwesomeIcon icon={faPenToSquare} />
                                                            </Link>
                                                        </th>
                                                        <th scope="col" className="p-4 text-left text-xl font-semibold text-red-400 uppercase tracking-wider">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </th>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                            {usersList.length === 0 ? <Error404 /> : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
}
