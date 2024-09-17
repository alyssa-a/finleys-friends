import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import DogCard from "../components/DogCard";

const dog = {
    id: "ABCD123456",
    img: "https://frontend-take-home.fetch.com/dog-images/n02106166-Border_collie/n02106166_1426.jpg",
    name: "Buddy",
    age: 5,
    zip_code: "12345",
    breed: "Border Collie"
}

describe("DogCard", () => {
    it("should render all dog data", () => {
        const updateFavorites = vi.fn();

        render(<DogCard dog={dog} isFavorite={false} updateFavorites={updateFavorites} location={dog.zip_code}/>);

        const name = screen.getByText("Buddy");
        expect(name).toBeInTheDocument();

        const breed = screen.getByText("Border Collie");
        expect(breed).toBeInTheDocument();

        const age = screen.getByText("5 years old");
        expect(age).toBeInTheDocument();

        const zip = screen.getByText("12345");
        expect(zip).toBeInTheDocument();
    
    });

    it("should call updateFavorites with the dog id when user clicks favorite button", () => {
        const updateFavorites = vi.fn();

        render(<DogCard dog={dog} isFavorite={false} updateFavorites={updateFavorites} location={dog.zip_code}/>);

        const favButton = screen.getByRole("button");
        fireEvent.click(favButton);

        expect(updateFavorites).toHaveBeenCalled();

        const favoritedDogId = updateFavorites.mock.calls[0][0];
        expect(favoritedDogId).toBe("ABCD123456");
    });
});