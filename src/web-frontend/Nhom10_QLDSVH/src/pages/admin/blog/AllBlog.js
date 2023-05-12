import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Book1 from "images/book1.png"
import Book2 from "images/book2.jpg"
import Book3 from "images/book3.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getPosts } from "../../../services/PostRepository";
import { isEmptyOrSpaces } from "../../../components/utils/Utils";
import DefaultImage from "images/post-default.png"
import Error404 from "../../../components/admin/other/Error404";


export default () => {

    const [postsList, setPostsList] = useState([]);
    const [metadata, setMetadata] = useState([]);

    useEffect(() => {
        getPosts().then(data => {
            if (data) {
              setPostsList(data.items);
              setMetadata(data.metadata);
            }
            else
              setPostsList([]);
            //console.log(data.items)
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
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Quản lý bài viết</h3>
                                    <span className="text-base font-normal text-gray-500">Các bài viết hiện có trong database</span>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link to="/admin/dashboard/add-blog">
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
                                                        <th scope="col" width="15%" className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Tiêu đề
                                                        </th>
                                                        <th scope="col" width="20%" className="p-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Ảnh
                                                        </th>
                                                        <th scope="col" width="20%" className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Mô tả ngắn
                                                        </th>
                                                        <th scope="col" width="10%" className="p-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Số lượt xem
                                                        </th>
                                                        <th scope="col" className="p-4 text-center text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Trạng thái
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
                                                {postsList.map((post, index) => (
                                                    <tr>
                                                        <td className="p-4 text-center text-sm font-bold text-gray-500">
                                                            {index + 1}
                                                        </td>
                                                        <td className="p-4 text-sm font-semibold text-gray-500">
                                                            {post.title}
                                                        </td>
                                                        <td className="p-4 text-sm font-normal text-gray-500">
                                                        {isEmptyOrSpaces(post.imageUrl) ? (
                                                                    <img className="h-40 w-auto rounded-lg mx-auto" src={DefaultImage} alt="Neil image" />
                                                                ) : (
                                                                    <img className="h-40 w-auto rounded-lg mx-auto" src={post.imageUrl} alt="Neil image" />
                                                                )}
                                                        </td>
                                                        <td className="p-4 text-sm font-normal text-gray-500">
                                                        {post.shortDescription}
                                                        </td>
                                                        <td className="p-4 text-center text-sm font-normal text-gray-500">
                                                        {post.viewCount}
                                                        </td>
                                                        <td className="p-4 text-center text-sm font-semibold text-gray-500">
                                                            <a className="hidden transition duration-300 sm:inline-flex ml-5 text-white bg-gray-400 hover:bg-teal-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                                                            {post.published ? "Đã xuất bản" : "Chưa xuất bản"}
                                                            </a>
                                                        </td>

                                                        <th scope="col" className="p-4 text-left text-xl font-semibold text-emerald-400 uppercase tracking-wider">
                                                            <Link to={`/admin/dashboard/update-blog/${post.id}`}>
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
                                            {postsList.length === 0 ? <Error404 /> : ""}
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
