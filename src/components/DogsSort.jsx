import PropTypes from 'prop-types';
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export default function DogsSort({sort, onSortChange}) {
    return (
        <FormControl>
            <InputLabel id="sort-select-label">Sort By:</InputLabel>
            <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sort}
                label="Sort By:"
                onChange={onSortChange}
            >
                <MenuItem value={"breed:asc"}>Breed (A-Z)</MenuItem>
                <MenuItem value={"breed:desc"}>Breed (Z-A)</MenuItem>
                <MenuItem value={"age:asc"}>Youngest</MenuItem>
                <MenuItem value={"age:desc"}>Oldest</MenuItem>
                <MenuItem value={"name:asc"}>Name (A-Z)</MenuItem>
                <MenuItem value={"name:desc"}>Name (Z-A)</MenuItem>
            </Select>
        </FormControl> 
    )
}
DogsSort.propTypes = {
    sort: PropTypes.string.isRequired,
    onSortChange: PropTypes.func.isRequired
}