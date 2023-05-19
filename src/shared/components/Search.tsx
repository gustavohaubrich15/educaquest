import React, { useState } from 'react';

interface ISearch {
    onChangeSearch: (valor: string) => void
}

export const Search: React.FC<ISearch> = ({ onChangeSearch }) => {

    const [inputValue, setInputValue] = useState<string>('');

    const handleInputChange = (event: any) => {
        const value = event.target.value;
        setInputValue(value);
        onChangeSearch(value);
    };

    return (
        <>
            <form>
                <label className="mb-2 text-sm font-medium sr-only">Encontre uma trilha</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    </div>
                    <input onChange={(e)=>{
                        
                        e.preventDefault()
                        handleInputChange(e)
                    }} value={inputValue} type="search" id="search" className=" h-7 block w-56 md:w-80 p-4 pl-10 text-sm text-black outline-none  border border-gray-300 rounded-lg bg-gray-50 focus:ring-gray-200 focus:border-gray-200" placeholder="Encontre uma trilha" required />

                </div>
            </form>
        </>
    )

}