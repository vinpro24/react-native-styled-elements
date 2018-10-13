export function autoComplete(input, key) {
    return fetch(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&language=en_GB&key=${key}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    }).then(res => res.json());
}

export function getPlaceDetail(placeid, key) {
    return fetch(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeid}&key=${key}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    }).then(res => res.json());
}

export function geocodeByLatLong(lat, long, key) {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${key}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    }).then(res => res.json());
}

export function getAddressParts(object) {
    let address = {};
    object.address_components.forEach(element => {
        address[element.types[0]] = element.short_name;
    });
    return address;
}
