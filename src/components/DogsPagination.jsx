import PropTypes from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function DogsPagination({prevPage, nextPage, onClickPrev, onClickNext}) {
    return (
        <div className="mt-8 flex gap-x-6 justify-center">
            <button
                className="flex items-center outline outline-slate-700 rounded-sm px-2 py-1 disabled:opacity-75"
                disabled={!prevPage}
                onClick={onClickPrev}
            >
                <ChevronLeftIcon className="size-4"/>
                Prev
            </button>

            <button
                className="flex items-center outline outline-slate-700 rounded-sm px-2 py-1  disabled:opacity-75"
                disabled={!nextPage}
                onClick={onClickNext}
            >
                Next
                <ChevronRightIcon className="size-4"/>
            </button>
        </div>
    )
}
DogsPagination.propTypes = {
    prevPage: PropTypes.bool.isRequired,
    nextPage: PropTypes.bool.isRequired,
    onClickPrev: PropTypes.func.isRequired,
    onClickNext: PropTypes.func.isRequired
}