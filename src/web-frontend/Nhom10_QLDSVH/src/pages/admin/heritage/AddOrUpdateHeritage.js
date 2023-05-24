import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faCircleNotch, faPenToSquare, faPencil, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { AddOrUpdateText } from "../../../components/utils/Utils";
import { isEmptyOrSpaces } from "../../../components/utils/Utils";
import { generateSlug } from "../../../components/utils/Utils";

import { getHeritageById } from "services/HeritageRepository";
import { getHeritageTypes } from "services/HeritageTypeRepository";
import { addHeritage } from "../../../services/HeritageRepository";
import { patchHeritage } from "../../../services/HeritageRepository";
import NotificationModal from "../../../components/admin/modal/NotificationModal";

import DefaultImage from "images/post-default-full.png"

export default ({ type = "" }) => {

    let mainText = AddOrUpdateText(type, "di sản");
    const initialState = {
        IdHeritageType: 0,
        Name: '',
        ImageUrl: '',
        Location: '',
        ShortDescription: '',
        Status: '',
        UrlSlug: '',
        Description: ''
    }, [heritage, setHeritage] = useState(initialState);

    const [heritageTypeList, setHeritageTypeList] = useState([]);
    const [successFlag, SetSuccessFlag] = useState(false);
    const [errors, setErrors] = useState({});

    let { id } = useParams();
    id = id ?? 0;

    let maintAction = '';
    if (id === 0) {
        maintAction = 'thêm';
    }
    else {
        maintAction = 'cập nhật';
    }

    //console.log(id);
    useEffect(() => {
        document.title = "Thêm/ cập nhật di sản";

        if (id !== 0) {
            getHeritageById(id).then(data => {
                if (data) {
                    const {
                        id: ignoredId,
                        Time: ignoredTime,
                        created_at: ignoredCreatedAt,
                        updated_at: ignoredUpdatedAt,
                        ...heritageData } = data;
                    setHeritage({
                        ...heritageData
                    });
                    //console.log("Đã bỏ qua id: " + ignoredId);
                } else {
                    setHeritage(initialState);
                }
            })
        }

        getHeritageTypes().then(data => {
            if (data) {
                setHeritageTypeList(data);
            }
            else
                setHeritageTypeList([]);
            //console.log(data)
        })
    }, [])
    //console.log(heritage);

  

    //validate lỗi bổ trống
    const validateAllInput = () => {
        const validationErrors = {};

        if (heritage.IdHeritageType === 0) {
            validationErrors.IdHeritageType = 'Vui lòng chọn loại di sản';
        }

        if (heritage.Name.trim() === '') {
            validationErrors.Name = 'Vui lòng nhập tên di sản';
        }

        if (heritage.ImageUrl.trim() === '') {
            validationErrors.ImageUrl = 'Vui lòng nhập địa chỉ url của ảnh';
        }

        if (heritage.Location.trim() === '') {
            validationErrors.Location = 'Vui lòng nhập vị trí';
        }

        if (heritage.ShortDescription.trim() === '') {
            validationErrors.ShortDescription = 'Vui lòng nhập mô tả ngắn';
        }

        if (heritage.Status.trim() === '') {
            validationErrors.Status = 'Vui lòng chọn trạng thái';
        }

        if (heritage.UrlSlug.trim() === '') {
            validationErrors.UrlSlug = 'Slug chưa được tạo';
        }

        if (heritage.Description.trim() === '') {
            validationErrors.Description = 'Vui lòng nhập mô tả chi tiết';
        }

        setErrors(validationErrors);
        // Kiểm tra nếu có lỗi
        if (Object.keys(validationErrors).length === 0) {
            return false;
        }
        else {
            return true;
        }
    }

    const handleSubmit = () => {


        // Nếu không có lỗi mới xóa hoặc cập nhật
        if (validateAllInput() === false) {
            if (id === 0) {
                addHeritage(heritage).then(data => {
                    if (data) {
                        SetSuccessFlag(true);
                    }
                    else {
                        SetSuccessFlag(false);
                    }
                    //console.log(data);
                });
            }
            else {
                patchHeritage(id, heritage).then(data => {
                    if (data) {
                        SetSuccessFlag(true);
                    }
                    else {
                        SetSuccessFlag(false);
                    }
                    //console.log(data);
                });
            }
        }
    }

    //Xử lý khi bấm xóa bên component con NotificationModal
    const childToParent = (isContinue) => {
        if (isContinue === true && id === 0) {
            setHeritage(initialState);
        }
    }

    return (
        <main>
            <div className="mt-12 px-4">
                <div className="bg-white editor mx-auto flex w-10/12 max-w-2xl flex-col p-6 text-gray-800 shadow-lg mb-12 rounded-lg border-t-4 border-purple-400">
                    <div className="flex mb-4 items-center space-x-5">
                        <div className="h-14 w-14 bg-yellow-200 rounded-full flex flex-shrink-0 justify-center items-center text-yellow-500 text-2xl font-mono">i</div>
                        <div className="block pl-2 font-semibold text-xl self-start text-gray-700">
                            <h2 className="leading-relaxed">{mainText.headingText}</h2>
                            <p className="text-sm text-gray-500 font-normal leading-relaxed">Vui lòng điền vào các ô bên dưới</p>
                        </div>
                    </div>
                    <h2 className="font-semibold text-sm text-teal-500">
                        Tên di sản
                    </h2>
                    <input
                        name="name"
                        required
                        type="text"
                        value={heritage.Name || ''}
                        onChange={e => setHeritage({
                            ...heritage,
                            Name: e.target.value,
                            UrlSlug: generateSlug(e.target.value),
                        })}
                        placeholder="Nhập tên di sản"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {errors.Name &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.Name}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        UrlSlug
                    </h2>
                    <input
                        name="slug"
                        required
                        type="text"
                        value={heritage.UrlSlug || ''}
                        // onChange={e => setHeritage({
                        //     ...heritage,
                        //     UrlSlug: e.target.value
                        // })}
                        placeholder="Nhập định danh slug"
                        className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                    {errors.UrlSlug &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.UrlSlug}
                        </p>
                    }
                    
                    <h2 className="font-semibold text-sm text-teal-500">
                        Loại di sản
                    </h2>
                    <select
                        name='idHeritageType'
                        value={heritage.IdHeritageType}
                        required
                        onChange={e => {
                            setHeritage({
                                ...heritage,
                                IdHeritageType: parseInt(e.target.value, 10)
                            })
                        }}
                        className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none">
                        <option value=''>--- Chọn loại di sản ---</option>
                        {heritageTypeList.map((item, index) => (
                            <option key={index} value={item.id}>{item.Name}</option>
                        ))}
                    </select>
                    {errors.IdHeritageType &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.IdHeritageType}
                        </p>
                    }
                    
                    <h2 className="font-semibold text-sm text-teal-500">
                        Mô tả ngắn
                    </h2>
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
                     {errors.ShortDescription &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.ShortDescription}
                        </p>
                    }
                    
                    <h2 className="font-semibold text-sm text-teal-500">
                        Mô tả chi tiết
                    </h2>
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
                    {errors.Description &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.Description}
                        </p>
                    }
                    
                    <h2 className="font-semibold text-sm text-teal-500">
                        Địa điểm
                    </h2>
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
                      {errors.Location &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.Location}
                        </p>
                    }
                    
                    <h2 className="font-semibold text-sm text-teal-500">
                        Trạng thái
                    </h2>
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
                        <option value={"Đang bảo tồn"}>Đang bảo tồn</option>
                        <option value={"Bị đe dọa"}>Bị đe dọa</option>
                        <option value={"Nguy cơ biến mất"}>Nguy cơ biến mất</option>
                    </select>
                    {errors.Status &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.Status}
                        </p>
                    }

                    <h2 className="font-semibold text-sm text-teal-500">
                        Hình ảnh
                    </h2>
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
                    {errors.ImageUrl &&
                        <p className="text-red-500 mb-6 text-sm font-semibold">
                            <FontAwesomeIcon className="mr-2" icon={faXmarkCircle} />
                            {errors.ImageUrl}
                        </p>
                    }

                    {!isEmptyOrSpaces(heritage.ImageUrl) && <>
                        <p className="text-gray-600 mb-4 text-center">Ảnh hiện tại</p>
                        <img src={heritage.ImageUrl} className="w-full h-auto mb-4 rounded-lg" />
                    </>}

                    <div className="buttons flex">
                        <hr className="mt-4" />
                        <Link to="/admin/dashboard/all-heritage" className="btn ml-auto rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500">
                            Hủy
                        </Link>
                        <button id="notification_buttonmodal" onClick={() => { handleSubmit() }} type="submit" className="btn ml-2 rounded-md transition duration-300 ease-in-out cursor-pointer !hover:bg-indigo-700 !bg-indigo-500 p-2 px-5 font-semibold text-white">
                            {mainText.buttonText}
                        </button>
                    </div>

                    <NotificationModal mainAction={maintAction} isSuccess={successFlag} isContinue={childToParent} type="heritage"/>
                </div>

            </div>
        </main>
    );
}
