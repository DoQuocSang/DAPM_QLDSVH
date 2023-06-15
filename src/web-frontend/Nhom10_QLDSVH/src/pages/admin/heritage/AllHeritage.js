import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { isEmptyOrSpaces } from "../../../components/utils/Utils";
import DefaultImage from "images/post-default.png"
import Error404 from "../../../components/admin/other/Error404";
import { getHeritages, getHeritagesByQuerySearch } from "services/HeritageRepository";
import DeleteModal from "../../../components/admin/modal/DeleteModal";
import SearchInput from "../../../components/admin/other/SearchInput";

export default () => {
    const [heritageList, setHeritageList] = useState([]);
    const [deleteId, setDeleteId] = useState(0);
    const [searchKey, setSearchKey] = useState("");
    const [searchColumn, setSearchColumn] = useState("name");

    const childToParent = (isDelete) => {
        if (isDelete === true && deleteId !== 0) {
            setHeritageList(heritageList.filter(item => item.id !== deleteId));
        }
    }

    const handleSearch = () => {
        if (isEmptyOrSpaces(searchKey)) {
            getHeritages(1, 30)
                .then(data => {
                    if (data) {
                        setHeritageList(data.data);
                    } else {
                        setHeritageList([]);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setHeritageList([]);
                });
        } else {
            getHeritagesByQuerySearch(searchKey, searchColumn, 1, 30)
                .then(data => {
                    if (data) {
                        setHeritageList(data.data);
                    } else {
                        setHeritageList([]);
                    }
                })
                .catch(error => {
                    console.log(error);
                    setHeritageList([]);
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
        getHeritages().then(data => {
            if (data) {
                setHeritageList(data.data);
            } else {
                setHeritageList([]);
            }
        });
    }, []);

    const handleDelete = (id) => {
        setDeleteId(id);
    }

    return (
      <>
        <main>
          <div className="pt-6 px-4">
            <div className="w-full mb-8">
              <div className="bg-white shadow rounded-lg p-4 sm:p-6 xl:p-8">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      Quản lý di sản
                    </h3>
                    <span className="text-base font-normal text-gray-500">
                      Các di sản hiện có trong database
                    </span>
                  </div>
                  <div className="flex-shrink-0">
                    <Link to="/admin/dashboard/add-heritage">
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
                                Tên di sản
                              </th>
                              <th
                                scope="col"
                                width="10%"
                                className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
                              >
                                Loại di sản
                              </th>
                              <th
                                scope="col"
                                width="20%"
                                className="p-4 text-center text-sm font-semibold text-gray-500 uppercase tracking-wider"
                              >
                                Hình ảnh
                              </th>
                              <th
                                scope="col"
                                className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
                              >
                                Địa điểm
                              </th>
                              <th
                                scope="col"
                                className="p-4 text-left text-sm font-semibold text-gray-500 uppercase tracking-wider"
                              >
                                Đơn vị quản lý
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
                            {heritageList.map((item, index) => (
                              <tr
                                className={index % 2 !== 0 && "bg-gray-100"}
                                key={item.id}
                              >
                                <td className="p-4 text-center text-sm font-bold text-gray-500">
                                  {index + 1}
                                </td>
                                <td className="p-4 text-sm font-semibold text-gray-500">
                                  {item.name}
                                </td>
                                <td className="p-4 text-sm font-normal text-gray-500">
                                  {item.heritage_type.name}
                                </td>
                                <td className="p-4 text-sm font-normal text-gray-500">
                                  {isEmptyOrSpaces(item.image_url) ? (
                                    <img
                                      className="h-auto rounded-lg mx-auto"
                                      src={DefaultImage}
                                      alt="Neil image"
                                    />
                                  ) : (
                                    <img
                                      className="h-auto rounded-lg mx-auto"
                                      src={item.image_url}
                                      alt="Neil image"
                                    />
                                  )}
                                </td>
                                <td className="p-4 text-sm font-normal text-gray-500 align-middle">
                                  {item.location.name}
                                </td>
                                <td className="p-4 text-sm font-semibold text-gray-500">
                                  {item.management_unit.name}
                                </td>
                                <td className="p-4 text-left text-xl font-semibold text-emerald-400 uppercase tracking-wider hover:text-emerald-600 transition duration-75">
                                  <Link
                                    to={`/admin/dashboard/update-heritage/${item.id}`}
                                  >
                                    <FontAwesomeIcon icon={faPenToSquare} />
                                  </Link>
                                </td>
                                <td className="delete_buttonmodal cursor-pointer p-4 text-left text-xl font-semibold text-red-400 uppercase tracking-wider hover:text-red-600 transition duration-75">
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={() => handleDelete(item.id)}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                        {heritageList.length === 0 ? (
                          <Error404 />
                        ) : (
                          <DeleteModal
                            deleteId={deleteId}
                            isDelete={childToParent}
                            type="heritage"
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
