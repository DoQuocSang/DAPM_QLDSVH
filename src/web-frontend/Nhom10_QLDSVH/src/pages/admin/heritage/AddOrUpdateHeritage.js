import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AddOrUpdateText } from "../../../components/utils/Utils";
import { isEmptyOrSpaces } from "../../../components/utils/Utils";

import { getHeritageById } from "services/HeritageRepository";
import { getHeritageTypes } from "services/HeritageTypeRepository";


export default ({ type = "" }) => {

    let mainText = AddOrUpdateText(type, "di sản");
    const initialState = {
        id: 0,
        IdHeritageType: 0,
        Name: '',
        ImageUrl: '',
        Location: '',
        ShortDescription: '',
        Status: '',
        UrlSlug: '',
        Time: '',
        Description: ''
    },[heritage, setHeritage] = useState(initialState);

    const [heritageTypeList, setHeritageTypeList] = useState([]);

    let { id } = useParams();
    id = id ?? 0;
    //console.log(id);
    useEffect(() => {
        document.title = "Thêm/ cập nhật di sản";

        getHeritageById(id).then(data => {
            if (data)
                setHeritage({
                    ...data
                });
            else
                setHeritage(initialState);
            console.log(data);
        })

        getHeritageTypes().then(data => {
            if (data) {
              setHeritageTypeList(data);
            }
            else
              setHeritageTypeList([]);
            console.log(data)
          })
    }, [])
    console.log(heritage);

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
                        <input
                            name="name"
                            required
                            type="text"
                            value={heritage.Name || ''}
                            onChange={e => setHeritage({
                                ...heritage,
                                Name: e.target.value,
                            })}
                            placeholder="Nhập tên di sản"
                            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                        <input
                            name="slug"
                            required
                            type="text"
                            value={heritage.UrlSlug || ''}
                            onChange={e => setHeritage({
                                ...heritage,
                                UrlSlug: e.target.value
                            })}
                            placeholder="Nhập định danh slug"
                            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                        
                        <select
                            name='idHeritageType'
                            value={heritage.IdHeritageType}
                            required
                            onChange={e => {
                                setHeritage({
                                    ...heritage,
                                    IdHeritageType: e.target.value
                                })
                            }}
                            className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none">
                            <option value=''>--- Chọn loại di sản ---</option>
                            {heritageTypeList.map((item, index) => (
                                <option key={index} value={item.id}>{item.Name}</option>
                            ))}
                        </select>
                        <textarea
                            name="shortDescription"
                            required
                            type="text"
                            value={heritage.ShortDescription || ''}
                            onChange={e => setHeritage({
                                ...heritage,
                                ShortDescription: e.target.value
                            })}
                            placeholder="Nhập mô tả ngắn"
                            className="description mb-4 sec h-20 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" spellcheck="false"></textarea>
                        <textarea
                            name="description"
                            required
                            type="text"
                            value={heritage.Description || ''}
                            onChange={e => setHeritage({
                                ...heritage,
                                Description: e.target.value
                            })}
                            placeholder="Nhập mô tả chi tiết"
                            className="description mb-4 sec h-36 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" spellcheck="false" ></textarea>

                        <input
                            name="location"
                            required
                            type="text"
                            value={heritage.Location || ''}
                            onChange={e => setHeritage({
                                ...heritage,
                                Location: e.target.value
                            })}
                            placeholder="Nhập địa điểm"
                            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                        <select
                            name='status'
                            value={heritage.Status}
                            required
                            onChange={e => {
                                setHeritage({
                                    ...heritage,
                                    Status: e.target.value
                                })
                            }}
                            className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none">
                            <option value=''>--- Chọn trạng thái ---</option>
                            <option value={0}>Đang sửa chữa</option>
                            <option value={1}>Cần sửa chữa</option>
                            <option value={2}>Bình thường</option>
                        </select>
                        <input
                            name="imageUrl"
                            required
                            type="text"
                            value={heritage.ImageUrl || ''}
                            onChange={e => setHeritage({
                                ...heritage,
                                ImageUrl: e.target.value,
                            })}
                            placeholder="Nhập link ảnh"
                            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />

                        {!isEmptyOrSpaces(heritage.ImageUrl) && <>
                            <p className="text-gray-600 mb-4 text-center">Ảnh hiện tại</p>
                            <img src={heritage.ImageUrl} className="w-full h-auto mb-4 rounded-lg" />
                        </>}

                        <div className="buttons flex">
                            <hr className="mt-4" />
                            <Link to="/admin/dashboard/all-heritage" className="btn ml-auto rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500">
                                Hủy
                            </Link>
                            <button type="submit" className="btn ml-2 rounded-md transition duration-300 ease-in-out cursor-pointer !hover:bg-indigo-700 !bg-indigo-500 p-2 px-5 font-semibold text-white">
                                {mainText.buttonText}
                            </button>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}
