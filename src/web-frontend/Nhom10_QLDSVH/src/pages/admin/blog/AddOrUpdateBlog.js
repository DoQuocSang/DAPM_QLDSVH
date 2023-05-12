import React, { useEffect, useState } from "react";
import Book1 from "images/book1.png"
import Book2 from "images/book2.jpg"
import Book3 from "images/book3.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Form, Link, Navigate, useParams } from "react-router-dom";
import { AddOrUpdateText, isInterger } from "../../../components/utils/Utils";
import { isEmptyOrSpaces } from "../../../components/utils/Utils";
import { addOrUppdatePost, getPostById } from "../../../services/PostRepository";
import { getAuthors } from "../../../services/AuthorRepository";
import { getTags } from "../../../services/TagRepository";
import { getCategories } from "../../../services/CategoryRepository";

export default ({ type = "" }) => {

    let mainText = AddOrUpdateText(type, "bài viết");
    const initialState = {
        id: 0,
        title: '',
        shortDescription: '',
        Description: '',
        urlSlug: '',
        meta: '',
        imageUrl: '',
        // category: {},
        // author: {},
        authorId: 0,
        categoryId: 0,
        tag: [],
        selectedTags: '',
        published: true,
    },
        [post, setPost] = useState(initialState);

    const [tagsList, setTagsList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);
    const [authorsList, setAuthorsList] = useState([]);


    let { id } = useParams();
    id = id ?? 0;
    //console.log(id);
    useEffect(() => {
        document.title = "Thêm/ cập nhật bài viết";

        getPostById(id).then(data => {
            if (data)
                setPost({
                    ...data,
                    selectedTags: data.tags.map(tag => tag?.name).join('\r\n'),
                });
            else
                setPost(initialState);
            console.log(data);
        })

        getAuthors().then(data => {
            if (data) {
                setAuthorsList(data.items);
            }
            else
                setAuthorsList([]);
            //console.log(data.items)
        })

        getTags().then(data => {
            if (data) {
                setTagsList(data.items);
            }
            else
                setTagsList([]);
            //console.log(data.items)
        })

        getCategories().then(data => {
            if (data) {
                setCategoriesList(data.items);
            }
            else
                setCategoriesList([]);
            //console.log(data.items)
        })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        let form = new FormData(e.target);
        addOrUppdatePost(form).then(data => {
            if (data)
                alert("Lưu thành công");
            else
                alert("Lỗi");
            console.log(data);
        });
    }

    // if(id && !isInterger(id))
    //     return(
    //         <Navigate to={'/error'} />
    //     )

    return (
        <form method="post" encType="multipart/form-data" onSubmit={handleSubmit} id="main-content" className="h-full w-full bg-gray-50 relative overflow-y-auto lg:ml-64">
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
                            name="title"
                            required
                            type="text"
                            value={post.title || ''}
                            onChange={e => setPost({
                                ...post,
                                title: e.target.value,
                                meta: e.target.value
                            })}
                            placeholder="Nhập tiêu để"
                            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />

                        <input
                            name="slug"
                            required
                            type="text"
                            value={post.urlSlug || ''}
                            onChange={e => setPost({
                                ...post,
                                urlSlug: e.target.value
                            })}
                            placeholder="Nhập định danh slug"
                            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />
                        <select
                            name='authorId'
                            value={post.authorId}
                            required
                            onChange={e => {
                                setPost({
                                    ...post,
                                    authorId: e.target.value
                                })
                            }}
                            className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none">
                            <option value=''>--- Chọn tác giả ---</option>
                            {authorsList.map((item, index) => (
                                <option key={index} value={item.id}>{item.fullName}</option>
                            ))}
                        </select>
                        <select
                            name='categoryId'
                            value={post.categoryId}
                            required
                            onChange={e => {
                                setPost({
                                    ...post,
                                    categoryId: e.target.value
                                }); console.log(post.categoryId)
                            }}
                            className=" text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400 appearance-none">
                            <option value=''>--- Chọn chủ đề ---</option>
                            {categoriesList.map((item, index) => (
                                <option key={index} value={item.id}>{item.name}</option>
                            ))}
                        </select>
                        <textarea
                            name="shortDescription"
                            required
                            type="text"
                            value={post.shortDescription || ''}
                            onChange={e => setPost({
                                ...post,
                                shortDescription: e.target.value
                            })}
                            placeholder="Nhập mô tả ngắn"
                            className="description mb-4 sec h-20 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" spellcheck="false"></textarea>
                        <textarea
                            name="description"
                            required
                            type="text"
                            value={post.description || ''}
                            onChange={e => setPost({
                                ...post,
                                description: e.target.value
                            })}
                            placeholder="Nhập mô tả chi tiết"
                            className="description mb-4 sec h-36 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" spellcheck="false" ></textarea>
                        <textarea
                            name="selectedTags"
                            required
                            type="text"
                            value={post.selectedTags}
                            onChange={e => setPost({
                                ...post,
                                selectedTags: e.target.value
                            })}
                            placeholder="Nhập từ khóa (mỗi từ 1 dòng)"
                            className="description mb-4 sec h-36 text-black placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" spellcheck="false" ></textarea>
                        <input
                            name="imageUrl"
                            required
                            type="text"
                            value={post.imageUrl || ''}
                            onChange={e => setPost({
                                ...post,
                                imageUrl: e.target.value,
                            })}
                            placeholder="Nhập link ảnh"
                            className="text-black mb-4 placeholder-gray-600 w-full px-4 py-2.5 mt-2 text-base   transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200  focus:border-blueGray-500 focus:bg-white dark:focus:bg-gray-800 focus:outline-none focus:shadow-outline focus:ring-1 ring-offset-current ring-offset-2 ring-purple-400" />

                        {!isEmptyOrSpaces(post.imageUrl) && <>
                            <p className="text-gray-600 mb-4 text-center">Ảnh hiện tại</p>
                            <img src={post.imageUrl} className="w-full h-auto mb-4 rounded-lg" />
                        </>}

                        <div className="buttons flex">
                            <hr className="mt-4" />
                            <Link to="/admin/dashboard/all-blog" className="btn ml-auto rounded-md transition duration-300 ease-in-out cursor-pointer hover:bg-gray-500 p-2 px-5 font-semibold hover:text-white text-gray-500">
                                Hủy
                            </Link>
                            <button type="submit" className="btn ml-2 rounded-md transition duration-300 ease-in-out cursor-pointer !hover:bg-indigo-700 !bg-indigo-500 p-2 px-5 font-semibold text-white">
                                {mainText.buttonText}
                            </button>
                        </div>

                    </div>

                </div>
            </main>
        </form>

    );
}

