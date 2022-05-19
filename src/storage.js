function storeObject(key, object){
    localStorage.setItem(key, JSON.stringify(object));
}

function retriveObject(key){
    return JSON.parse(localStorage.getItem(key));
}