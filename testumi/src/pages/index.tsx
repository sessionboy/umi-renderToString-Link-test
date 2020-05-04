import React from 'react';
import { Link } from "umi";
import { renderToString } from 'react-dom/server'

export default () => {
  const regx = /@([^@|\s]{1,20})\s/img;
  let text = "哈喽，@jack 你好呀"

  // 匹配提及用户，并替换为a链接
  text = text.replace(regx,(match:string,username:string)=>{
    return renderToString(
      <Link 
        to={`/user/${username}`}
        onClick={e=>{
          // 阻止冒泡，防止父级a链接跳转
          e.stopPropagation();
        }}
        style={{ color: "#0DADFE" }}
      >
        { username }
      </Link>
    );
  })
  
  return (
    <div 
      dangerouslySetInnerHTML={{
        __html: text
      }}
    />
  );
}
