import React, { useEffect, useState } from "react";
import { deleteHeritageById } from "../../../services/HeritageRepository";

export default ({ mainText = 'item', deleteId=0 })=> {
    useEffect(() => {
        const buttons = document.getElementsByClassName('delete_buttonmodal')
        const closebutton = document.getElementById('delete_closebutton')
        const modal = document.getElementById('delete_modal')
        console.log(Array.from(buttons).forEach((button) => {
            button.addEventListener('click', () => modal.classList.add('scale-100'))
        }))
        closebutton.addEventListener('click', () => modal.classList.remove('scale-100'))
    }, []);

    const handleDelete = () => {
        deleteHeritageById(deleteId).then(data => {    
            console.log(data)
        })
    }

    return (
        <>
            <div id="delete_modal" className="transform scale-0 transition-transform duration-300 min-w-screen h-screen animated fadeIn fixed left-0 top-0 flex justify-center items-center inset-0 z-50 outline-none focus:outline-none" >
                <div className="absolute bg-black opacity-50 inset-0 z-0"></div>
                <div className="w-full  max-w-lg p-5 relative mx-auto my-auto rounded-xl shadow-lg  bg-white ">
                    <div className="">
                        <div className="text-center p-5 flex-auto justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
                            </svg>
                            <h2 className="text-xl font-bold py-4 ">Xác nhận xóa {deleteId}</h2>
                            <p className="text-sm text-gray-500 px-8">Bạn có chắc chắc là muốn xóa {mainText} này không?</p>
                            <p className="text-sm text-gray-500 px-8">Vui lòng xác nhận để tiếp tục</p>
                        </div>
                        <div className="p-3  mt-2 text-center space-x-4 md:block">
                            <button id="delete_closebutton" className="mb-2 md:mb-0 bg-white px-10 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100">
                                Hủy
                            </button>
                            <button onClick={()=>handleDelete()} className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-10 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600">Xóa</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}