import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Book1 from "images/book1.png"
import Book2 from "images/book2.jpg"
import Book3 from "images/book3.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getTags } from "../../../services/TagRepository";
import Error404 from "../../../components/admin/other/Error404";

export default () => {
    const [tagsList, setTagsList] = useState([]);
    const [metadata, setMetadata] = useState([]);

    useEffect(() => {
        getTags().then(data => {
            if (data) {
              setTagsList(data.items);
              setMetadata(data.metadata);
            }
            else
              setTagsList([]);
            console.log(data.items)
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
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Quản lý thẻ</h3>
                                    <span className="text-base font-normal text-gray-500">Các thẻ hiện có trong database</span>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link to="/admin/dashboard/add-tag">
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
                                                            Tên thẻ
                                                        </th>
                                                        <th scope="col" className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Mô tả
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
                                                {tagsList.map((tag, index) => (
                                                    <tr>
                                                        <td className="p-4 text-center text-sm font-bold text-gray-500">
                                                            {index + 1}
                                                        </td>
                                                        <td className="p-4  text-sm font-semibold text-gray-500">
                                                            {tag.name}
                                                        </td>
                                                        <td className="p-4  text-sm font-normal text-gray-500">
                                                            {tag.description}
                                                        </td>
                                                        <th scope="col" className="p-4 text-left text-xl font-semibold text-emerald-400 uppercase tracking-wider">
                                                        <Link to={`/admin/dashboard/update-tag/${tag.id}`}>
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
                                            {tagsList.length === 0 ? <Error404 /> : ""}
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
