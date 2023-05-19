import React from 'react';

interface IButton {
    descricao?: string,
    icon?: JSX.Element,
    width?: string
}
export const Button: React.FC<IButton & React.HTMLAttributes<HTMLDivElement>> = ({ descricao, icon, width, ...props }) => {

    return (
        <>
            <div {...props} className={` flex justify-center text-base   items-center h-8 ${width ?? 'w-36'}  md:w-40  bg-white cursor-pointer text-gray-800 rounded-lg hover:bg-slate-300`}>
                {icon && <div className="pr-5 max-sm:pr-2">{icon}</div>}
                {descricao && <div className="max-sm:text-sm">{descricao}</div>}
            </div>
        </>
    )

}