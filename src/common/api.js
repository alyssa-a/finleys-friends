const baseUrl = "https://frontend-take-home-service.fetch.com";

export async function login(requestBody) {
    const loginRes = await fetch(`${baseUrl}/auth/login`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: requestBody
    });

    if (!loginRes.ok) {
        throw new Error(`An error has occured: ${loginRes.status}`);
    } else {
        return loginRes.status;
    }
}

export async function logout() {
    const logoutRes = await fetch(`${baseUrl}/auth/logout`, {
        credentials: "include",
        method: "POST"
    });

    if (!logoutRes.ok) {
        throw new Error(`An error has occured: ${logoutRes.status}`);
    } else {
        console.log("session ended")
    }
}

export async function getBreeds() {
    const breedsRes = await fetch(`${baseUrl}/dogs/breeds`, {
        credentials: "include"
    });

    if (!breedsRes.ok) {
        throw new Error(`An error has occured: ${breedsRes.status}`);
    }

    return await breedsRes.json();
}

export async function searchDogs(params) {
    let url = `${baseUrl}/dogs/search`;

    if (params) {
        url = `${url}?${params}`;
    }

    const searchRes = await fetch(url, {
        credentials: "include"
    });

    if (!searchRes.ok) {
        throw new Error(`An error has occured: ${searchRes.status}`);
    }

    return await searchRes.json();
}

export async function getPage(params) {
    const url = baseUrl + params;

    const pageRes = await fetch(url, {
        credentials: "include"
    });

    if (!pageRes.ok) {
        throw new Error(`An error has occured: ${pageRes.status}`);
    }

    return await pageRes.json();
}

export async function getDogs(dogIds) {
    const dogsRes = await fetch(`${baseUrl}/dogs`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dogIds)
    });

    if (!dogsRes.ok) {
        throw new Error(`An error has occured: ${dogsRes.status}`);
    }

    return await dogsRes.json();
}

export async function getLocations(zipcodes) {
    const locationsRes = await fetch(`${baseUrl}/locations`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(zipcodes)
    });

    if (!locationsRes.ok) {
        throw new Error(`An error has occured: ${locationsRes.status}`);
    }

    return await locationsRes.json();
}

export async function matchDog(favoriteIds) {
    const matchRes = await fetch(`${baseUrl}/dogs/match`, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: favoriteIds
    });

    if (!matchRes.ok) {
        throw new Error(`An error has occured: ${matchRes.status}`);
    }

    return await matchRes.json();
}