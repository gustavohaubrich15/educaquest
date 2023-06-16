import React, { useState } from 'react';
import { MultiSelect } from "react-multi-select-component";

interface IFilterSelect {
    options: IFilterSelectOption[],
    title: string,
    titleAll: string,
    onChangeSelected: (option : IFilterSelectOption[]) => void
}

export interface IFilterSelectOption{
    label: string,
    value: string
}

export const FilterSelect: React.FC<IFilterSelect> = ({ options, title, titleAll, onChangeSelected }) => {

    const [selected, setSelected] = useState<IFilterSelectOption[]>([]);


    return (
        <>
            <MultiSelect
            className="w-96 text-black"
                options={options}
                value={selected}
                onChange={(option: IFilterSelectOption[])=>{
                    setSelected(option)
                    onChangeSelected(option)
                }}
                labelledBy="Filtre por trilha"
                overrideStrings={{
                    "allItemsAreSelected": `${titleAll}`,
                    "clearSearch": "Limpar busca",
                    "clearSelected": "Limpar selecionados",
                    "noOptions": "Sem opções",
                    "search": "Buscar",
                    "selectAll": "Selecionar todos",
                    "selectAllFiltered": "Selecionar todos (Filtrados)",
                    "selectSomeItems": `${title}`,
                    "create": "Criar",
                  }}
                  
                
            />
        </>
    )

}