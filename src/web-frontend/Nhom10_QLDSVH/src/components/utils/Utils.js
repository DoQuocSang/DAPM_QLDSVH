import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Moment from 'moment';
import tw from "twin.macro";


export function isEmptyOrSpaces(str) {
    return str == null || (typeof str === 'string' && str.match(/^ *$/) !== null);
}

export function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function toVND(value) {
    return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}

export function formatDateTme(value) {
    const time =  " - " + Moment(value).format("kk:mm:ss");
    const date =  "Ngày đăng: " + Moment(value).format("DD/MM/YYYY");
    return date + time;
}

export function FormatParagraph({props}) {
    //console.log(props.split('\n')); 
    const newText = props.split('\r\n\r\n').map(str => <p css={tw`pb-2`}>{str}</p>);
    return newText;
}

export function AddOrUpdateText(type, mainText) {
    let item = {
        headingText: "",
        buttonText: ""
    }

    if(type === "add"){
        item.headingText = "Thêm " + mainText;
        item.buttonText = "Thêm";
    }
    else{
        item.headingText = "Cập nhật " + mainText;
        item.buttonText = "Cập nhật";
    }
    return item;
}

export function isInterger(str) {
    return Number.isInteger(Number(str)) && Number(str) > 0;
}

export function decode(str) {
    let txt = new DOMParser().parseFromString(str, "text/html");
    return txt.documentElement.textContent;
}