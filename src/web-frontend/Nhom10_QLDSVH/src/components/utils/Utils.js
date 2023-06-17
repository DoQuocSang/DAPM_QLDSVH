import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Moment from 'moment';
import tw from "twin.macro";
import { remove } from 'diacritics';
import PostDefault from "images/post-default.png";
import { ReactComponent as SvgDotPatternIcon } from "images/dot-pattern.svg";


export function isEmptyOrSpaces(str) {
    return str == null || (typeof str === 'string' && str.match(/^ *$/) !== null);
}

export function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export function toVND(value) {
    return value.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
}

export function formatDateTme(value) {
    const time = " - " + Moment(value).format("kk:mm:ss");
    const date = Moment(value).format("DD/MM/YYYY");
    return date + time;
}

export function FormatParagraph({ props }) {
    //console.log(props.split('\n')); 
    const newText = props.split('\r\n\r\n').map(str => <p css={tw`pb-2`}>{str}</p>);
    return newText;
}

export function AddOrUpdateText(type, mainText) {
    let item = {
        headingText: "",
        buttonText: ""
    }

    if (type === "add") {
        item.headingText = "Thêm " + mainText;
        item.buttonText = "Thêm";
    }
    else {
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

export function upperCaseFirstCharacter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

//Tạo slug tự động
export function generateSlug(value) {
    // Sử dụng hàm remove của thư viện sanitized để loại bỏ dấu tiếng Việt
    const sanitizedValue = remove(value);
    const slug = sanitizedValue
        .toLowerCase()
        // ^ phủ định, kí tự chữ cái và số \w, kí tự khoảng trắng \s
        // Thay thế mọi kí tự không phải là khoảng trắng trắng hoặc chữ thành ''
        .replace(/[^\w\s-]/g, '')
        // Thay thế một hoặc nhiều kí tự khoảng trắng thành '-'
        .replace(/\s+/g, '-')
        // Thay thế một hoặc nhiều kí tự '-' trắng thành '-'
        .replace(/--+/g, '-')
        .trim();
    return slug;
};

//Chặt chuỗi theo kí tự và trả về mảng kết quả
export const handleSplitString = (str) => {
    const trimmedString = str.trim(); // Xóa khoảng trắng hai đầu chuỗi
    const resultArray = trimmedString.split(','); // Chia chuỗi thành mảng các phần tử
    return resultArray;
};

// Chặt chuỗi và trả về chuỗi đầu tiên
export const handleGetFirstString = (str) => {
    const trimmedString = str.trim(); // Xóa khoảng trắng hai đầu chuỗi
    const resultArray = trimmedString.split(','); // Chia chuỗi thành mảng các phần tử
    return resultArray[0]; // Trả về phần tử đầu tiên của mảng
};


// export function formatNumber(number) {
//     if (number < 10 && number !== 0) {
//       return '0' + number;
//     }
//     return number.toString();
//   }

// Định dạng số 1.000.000
export const toThousandFormat = (str) => {
    return str.toLocaleString('en');
};

// Làm mượt hoạt ảnh cuộn lên đầu trang
export const scrollToTop = () => {
    // Điều chỉnh tốc độ
    const scrollStep = window.scrollY / (1000 / 5);

    const scrollAnimation = () => {
        if (window.scrollY !== 0) {
            window.scrollBy(0, -scrollStep);
            requestAnimationFrame(scrollAnimation);
        }
    };

    requestAnimationFrame(scrollAnimation);
};

export const checkImageArray = (value) => {
    //console.log(value)
    const arr = value.map(item => item !== '' ? item : PostDefault);
    return arr;
}

export const checkImageUrl = (value) => {
    if (isEmptyOrSpaces(value)) {
        return PostDefault;
    } else {
        return value;
    }
}

// Hiển thị ảnh theo vị trí trong thuộc tính mô tả
export const DescriptionWithImage = ({ title, description, image_description, image_url, index }) => {
    const imageTag = '<image>';

    if (description && image_url && description.includes(imageTag)) {
        const parts = description.split(imageTag);
        const textBeforeImage = parts[0];
        const textAfterImage = parts[1];

        return (
            <>
                <h2 className="title" id={`paragraph-${index}`}>{title}</h2>
                <p className="description">{textBeforeImage}</p>
                <div className="imageContainer">
                    <img className="imageSection"  src={image_url} alt={image_description}/>
                    <p className="imageDescription">{image_description + " (Ảnh minh họa)"}</p>
                </div>
                <p className="description">{textAfterImage} </p>
            </>
        );
    }else if (description && image_url) {
        return (
          <>
            <h2 className="title" id={`paragraph-${index}`}>{title}</h2>
            <p className="description">{description}</p>
            <div className="imageContainer">
              <img className="imageSection" src={image_url} alt={image_description} />
              <p className="imageDescription">
                {image_description + " (Ảnh minh họa)"}
              </p>
            </div>
          </>
        );
      }

    return (
        <>
            <h2 className="title" id={`paragraph-${index}`}>{title}</h2>
            <p className="description">{description}</p>
        </>
    );
};