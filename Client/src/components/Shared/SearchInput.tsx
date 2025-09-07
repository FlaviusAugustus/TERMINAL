import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import IconButton from "./IconButton";
import InputField from "./InputField";

export interface SearchInputProps {
    onSearch: (query: string) => void;
    onClearSearch: () => void;
    isSearching: boolean;
    searchValue: string;
    placeholder?: string;
}

const SearchInput = (params: SearchInputProps) => {
    const [localSearchValue, setLocalSearchValue] = useState<string>(
        params.searchValue || ""
    );

    useEffect(() => {
        setLocalSearchValue(params.searchValue || "");
    }, [params.searchValue]);

    const handleSearchSubmit = () => {
        const trimmedValue = localSearchValue.trim();
        params.onSearch(trimmedValue);

        if (trimmedValue === "") {
            params.onClearSearch();
        }
    };

    const handleClearSearch = () => {
        setLocalSearchValue("");
        params.onClearSearch();
    };

    return (
        <div className="flex gap-2 items-center">
            <InputField
                className="!text-sm !h-[40px]"
                placeholder={params.placeholder ? params.placeholder : "Search"}
                icon={<MagnifyingGlassIcon className="h-4" />}
                value={localSearchValue}
                onChange={(e) => setLocalSearchValue(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        handleSearchSubmit();
                    }
                }}
            />
            {params.isSearching && (
                <IconButton
                    onClick={handleClearSearch}
                    className="h-[40px] flex bg-white items-center gap-1 !hover:border-gray-300"
                    title="Clear search"
                >
                    <XMarkIcon className="h-4" />
                    <p className="text-xs">Clear</p>
                </IconButton>
            )}
        </div>
    );
};

export default SearchInput;