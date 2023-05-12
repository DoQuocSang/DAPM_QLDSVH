import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Book1 from "images/book1.png"
import Book2 from "images/book2.jpg"
import Book3 from "images/book3.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { addOrUpdateUser } from "../../../services/AppUserRepository";
import { getUserById } from "../../../services/AppUserRepository";
import { AddOrUpdateText, isEmptyOrSpaces } from "../../../components/utils/Utils";

export default  ({ type = "" }) => {

    let mainText = AddOrUpdateText(type, "tài khoản");
    const initialState = {
        id: 0,
        username: '',
        email: '',
        lastName: '',
        firstName:'',
    },
    [user, setUser] = useState(initialState);

    let { id } = useParams();
    id = id ?? 0;
    //console.log(id);
    useEffect(() => {
        document.title = "Thêm/ cập nhật tài khoản";

        getUserById(id).then(data => {
            if (data)
                setUser({
                    ...data,
                });
            else
                setUser(initialState);
            //console.log(data);
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let form = new FormData(e.target);
            addOrUpdateUser(form).then(data => {
            if (data)
                alert("Lưu thành công");
            else
                alert("Lỗi");
            console.log(data);
        });
    }

    return (
        <div id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
            <main>
                <div className="mt-12 px-4">
                    <div className="editor mx-auto flex w-10/12 max-w-2xl flex-col p-6 text-gray-800 shadow-lg mb-12 rounded-lg border-t-4 border-purple-400">
                        <div className="flex mb-4 items-center space-x-5">
                            <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                            <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                                <h2 className="leading-relaxed">{mainText.headingText}</h2>
                                <p className="text-sm text-gray-500 font-normal leading-relaxed">Vui lòng điền vào các ô bên dưới</p>
                            </div>
                        </div>
                        <input placeholder="Nhập họ" className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                        <input placeholder="Nhập tên" className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                        <input placeholder="Nhập tên tài khoản" className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                        <input placeholder="Nhập email" className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                        <input placeholder="Nhập mật khẩu" className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                        {/* <div className="icons m-2 flex text-gray-500">
                            <svg className="mr-2 h-7 cursor-pointer rounded-full border p-1 hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <svg className="mr-2 h-7 cursor-pointer rounded-full border p-1 hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <svg className="mr-2 h-7 cursor-pointer rounded-full border p-1 hover:text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" /></svg>
                            <div className="count ml-auto text-xs font-semibold text-gray-400">0/300</div>
                        </div> */}

                        <div className="buttons flex">
                            <hr className="mt-4" />
                            <Link to="/admin/dashboard/all-user" className="btn ml-auto rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500">
                                Hủy
                            </Link>
                            <Link to="/admin/dashboard/all-user" className="btn ml-2 rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-indigo-700 bg-indigo-500 p-2 px-5 font-semibold text-white">
                                Thêm
                            </Link>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}
