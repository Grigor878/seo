import { useSearchParams } from 'react-router-dom';

const useQueryParams = (keys) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const getParams = keys?.map(key => searchParams.get(key));

    const setParams = (params) => {
        Object.keys(params).forEach(key => {
            if (params[key] === undefined || params[key] === null) {
                searchParams.delete(key);
            } else {
                searchParams.set(key, params[key]);
            }
        });
        setSearchParams(searchParams);
    };

    const removeParam = (key) => {
        searchParams.delete(key);
        setSearchParams(searchParams);
    };

    // return [...getParams, setParams]
    return [...getParams, setParams, removeParam];
};

export default useQueryParams;