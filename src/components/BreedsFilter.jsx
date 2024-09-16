import PropTypes from 'prop-types';
import { Autocomplete, TextField } from "@mui/material";

export default function BreedsFilter({ breeds, onBreedsChange }) {
    return (
        <Autocomplete
            multiple
            limitTags={100}
            id="multiple-limit-tags"
            options={breeds}
            getOptionLabel={(option) => option}
            onChange={onBreedsChange}
            renderInput={(params) => (
                <TextField {...params} label="Breeds" placeholder="Breeds" />
            )}
        />
    );
}
BreedsFilter.propTypes = {
    breeds: PropTypes.array.isRequired,
    onBreedsChange: PropTypes.func.isRequired
}