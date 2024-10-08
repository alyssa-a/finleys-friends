import PropTypes from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function DogsPagination({prevPage, onClickPrev, onClickNext, offset, total}) {
    const offsetNum = Number(offset.split("from=")[1]);
    let startingNum = offsetNum - 24;
    return (
        <div className="mt-8 flex flex-col md:flex-row gap-x-6 items-center md:justify-between">
            <p className="mb-4 md:mb-0">{startingNum} - {Math.min(offsetNum, total)} of {total} dogs</p>
            
            <div className="flex gap-x-4">
                <button
                    className="flex items-center outline outline-slate-700 rounded-sm px-2 py-1 disabled:opacity-75 focus-visible:outline focus-visible:outline-red-500 focus-visible:outline-4"
                    disabled={!prevPage}
                    onClick={onClickPrev}
                >
                    <ChevronLeftIcon className="size-4"/>
                    Prev
                </button>

                <button
                    className="flex items-center outline outline-slate-700 rounded-sm px-2 py-1  disabled:opacity-75 focus-visible:outline focus-visible:outline-red-500 focus-visible:outline-4"
                    disabled={offsetNum > total ? true : false}
                    onClick={onClickNext}
                >
                    Next
                    <ChevronRightIcon className="size-4"/>
                </button>   
                </div>
            
        </div>
    )
}
DogsPagination.propTypes = {
    prevPage: PropTypes.bool.isRequired,
    onClickPrev: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired,
    offset: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired
}