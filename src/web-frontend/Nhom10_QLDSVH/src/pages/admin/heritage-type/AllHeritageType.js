import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Book1 from "images/book1.png"
import Book2 from "images/book2.jpg"
import Book3 from "images/book3.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Error404 from "../../../components/admin/other/Error404";
import { getHeritageTypes } from "services/HeritageTypeRepository";

export default () => {

    const [heritageTypeList, setHeritageTypeList] = useState([]);

    useEffect(() => {
        getHeritageTypes().then(data => {
            if (data) {
              setHeritageTypeList(data);
            }
            else
              setHeritageTypeList([]);
            console.log(data)
          })
    }, []);

    return (
        <div id="main-content" className="h-full w-full bg-gray-100 relative overflow-y-auto lg:ml-64">
            <main>
                <div className="pt-6 px-4">
                    <div className="w-full mb-8">
                        <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                            <div className="mb-4 flex items-center justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2">Quản lý loại di sản</h3>
                                    <span className="text-base font-normal text-gray-500">Các loại di sảnhiện có trong database</span>
                                </div>
                                <div className="flex-shrink-0">
                                    <Link to="/admin/dashboard/add-heritage-type">
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
                                            <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                                                <thead className="bg-gray-200">
                                                    <tr>
                                                        <th scope="col" className="p-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Id
                                                        </th>
                                                        <th scope="col" width="25%" className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider">
                                                            Tên loại
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
                                                    {heritageTypeList.map((item, index) => (
                                                    <tr className={index%2 !== 0 && "bg-gray-100"}>
                                                        {/* <td className="p-4  text-sm font-normal text-gray-900">
                                                            Payment from <span className="font-semibold">Bonnie Green</span>
                                                        </td> */}
                                                        <td className="p-4 text-center text-sm font-bold text-gray-500">
                                                            {index + 1}
                                                        </td>
                                                        <td className="p-4  text-sm font-semibold text-gray-500">
                                                            {item.Name}
                                                        </td>
                                                        <td className="p-4  text-sm font-normal text-gray-500">
                                                            {item.Description}
                                                        </td>
                                                        <th scope="col" className="p-4 text-left text-xl font-semibold text-emerald-400 uppercase tracking-wider">
                                                        <Link to={`/admin/dashboard/update-heritage-type/${item.id}`}>
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
                                            {heritageTypeList.length === 0 ? <Error404 /> : ""}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className=" my-4">
                        <div className="bg-white shadow rounded-lg mb-4 p-4 sm:p-6 h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-xl font-bold leading-none text-gray-900">Latest Customers</h3>
                                <a href="#" className="text-sm font-medium text-cyan-600 hover:bg-gray-100 rounded-lg inline-flex items-center p-2">
                                    View all
                                </a>
                            </div>
                            <div className="flow-root">
                                <ul role="list" className="divide-y divide-gray-200">
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/neil-sims.png" alt="Neil image" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    Neil Sims
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="17727a767e7b57607e7973646372653974787a">[email&#160;protected]</a>
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                $320
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/bonnie-green.png" alt="Neil image" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    Bonnie Green
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="d4b1b9b5bdb894a3bdbab0a7a0b1a6fab7bbb9">[email&#160;protected]</a>
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                $3467
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/michael-gough.png" alt="Neil image" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    Michael Gough
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="57323a363e3b17203e3933242332257934383a">[email&#160;protected]</a>
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                $67
                                            </div>
                                        </div>
                                    </li>
                                    <li className="py-3 sm:py-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/thomas-lean.png" alt="Neil image" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    Thomes Lean
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="284d45494144685f41464c5b5c4d5a064b4745">[email&#160;protected]</a>
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                $2367
                                            </div>
                                        </div>
                                    </li>
                                    <li className="pt-3 sm:pt-4 pb-0">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <img className="h-8 w-8 rounded-full" src="https://demo.themesberg.com/windster/images/users/lana-byrd.png" alt="Neil image" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    Lana Byrd
                                                </p>
                                                <p className="text-sm text-gray-500 truncate">
                                                    <a href="/cdn-cgi/l/email-protection" className="__cf_email__" data-cfemail="a2c7cfc3cbcee2d5cbccc6d1d6c7d08cc1cdcf">[email&#160;protected]</a>
                                                </p>
                                            </div>
                                            <div className="inline-flex items-center text-base font-semibold text-gray-900">
                                                $367
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
                </div>
            </main>

        </div>
    );
}
