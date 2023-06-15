import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { getManagementUnits, getManagementUnitsByQuerySearch } from "../../../services/ManagementUnitRepository";

import { isEmptyOrSpaces } from "../../../components/utils/Utils";
import Error404 from "../../../components/admin/other/Error404";
import DeleteModal from "../../../components/admin/modal/DeleteModal";

import SearchInput from "../../../components/admin/other/SearchInput";

export default () => {
    const [managementUnitList, setManagementUnitList] = useState([]);
    const [deleteId, setDeleteId] = useState(0);
    const [searchKey, setSearchKey] = useState("");
    const [searchColumn, setSearchColumn] = useState("name");

    //Xử lý khi bấm xóa bên component con DeleteModal
    const childToParent = (isDelete) => {
        if (isDelete === true && deleteId !== 0) {
            setManagementUnitList(managementUnitList.filter(item => item.id !== deleteId));
        }
        console.log(managementUnitList.length)
    }

    const handleSearch = () => {
        if (isEmptyOrSpaces(searchKey)) {
            getManagementUnits(1, 30)
                .then(data => {
                    if (data) {
                        setManagementUnitList(data.data);
                    } else {
                        setManagementUnitList([]);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setManagementUnitList([]);
                });
        } else {
            getManagementUnitsByQuerySearch(searchKey, searchColumn, 1, 30)
                .then(data => {
                    if (data) {
                        setManagementUnitList(data.data);
                    } else {
                        setManagementUnitList([]);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setManagementUnitList([]);
                });
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);

        getManagementUnits().then(data => {
            if (data) {
                setManagementUnitList(data.data);
            }
            else
                setManagementUnitList([]);
            console.log(data)
        })
    }, []);

    const handleDelete = (id) => {
        setDeleteId(id)
    }

    return (
      <>
        <main>
          <div className="pt-6 px-4">
            <div className="w-full mb-8">
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8 ">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Quản lý đơn vị quản lý
                    </h3>
                    <span className="text-base font-normal text-gray-500">
                      Các đơn vị quản lý hiện có trong database
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <Link to="/admin/dashboard/add-management-unit">
                      <a className="hidden transition duration-300 sm:inline-flex ml-5 text-white bg-teal-400 hover:bg-teal-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-sm px-5 py-2.5 text-center items-center mr-3">
                        <FontAwesomeIcon
                          icon={faPlus}
                          className="text-base mr-3"
                        />
                        Thêm
                      </a>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col mt-8">
                  <div className="overflow-x-auto rounded-lg">
                    <div className="align-middle inline-block min-w-full">
                      <div className="shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-3 bg-white sm:p-6">
                          <div className="flex items-center justify-between">
                            <SearchInput
                              searchKey={searchKey}
                              setSearchKey={setSearchKey}
                              handleSearch={handleSearch}
                              handleKeyPress={handleKeyPress}
                            />
                            <button
                              className="ml-3 px-4 py-2 text-sm font-medium text-white bg-teal-400 hover:bg-teal-600 focus:ring-4 focus:ring-cyan-200 rounded-lg"
                              onClick={handleSearch}
                            >
                              Tìm kiếm
                            </button>
                          </div>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200 border border-gray-200">
                          <thead className="bg-gray-200">
                            <tr>
                              <th
                                scope="col"
                                className="p-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider"
                              >
                                STT
                              </th>
                              <th
                                scope="col"
                                className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
                              >
                                Tên đơn vị quản lý
                              </th>
                              <th
                                scope="col"
                                className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
                              >
                                Mô tả
                              </th>
                              <th
                                scope="col"
                                className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
                              >
                                Sửa
                              </th>
                              <th
                                scope="col"
                                className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
                              >
                                Xóa
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white">
                            {managementUnitList.map((item, index) => (
                              <tr className={index % 2 !== 0 && "bg-gray-100"}>
                                <td className="p-4 text-center text-sm font-bold text-gray-500">
                                  {index + 1}
                                </td>
                                <td className="p-4 text-sm font-semibold text-gray-500">
                                  {item.name}
                                </td>
                                <td className="p-4 text-sm font-normal text-gray-500 align-middle">
                                  {item.description}
                                </td>
                                <th
                                  scope="col"
                                  className="p-4 text-left text-xl font-semibold text-emerald-400 uppercase tracking-wider hover:text-emerald-600 transition duration-75"
                                >
                                  <Link
                                    to={`/admin/dashboard/update-management-unit/${item.id}`}
                                  >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                  </Link>
                                </th>
                                <th
                                  scope="col"
                                  onClick={() => handleDelete(item.id)}
                                  className="delete_buttonmodal cursor-pointer p-4 text-left text-xl font-semibold text-red-400 uppercase tracking-wider hover:text-red-600 transition duration-75"
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                </th>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {managementUnitList.length === 0 ? (
                          <Error404 />
                        ) : (
                          <DeleteModal
                            deleteId={deleteId}
                            isDelete={childToParent}
                            type="management-unit"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </>
    );
}

