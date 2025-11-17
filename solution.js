"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function formatValue(value) {
    if (typeof value === "string") {
        return value.toUpperCase();
    }
    else if (typeof value === "number") {
        return value * 10;
    }
    else {
        return !value;
    }
}
function getLength(value) {
    if (typeof value === "string") {
        return value.length;
    }
    else if (Array.isArray(value)) {
        return value.length;
    }
    return 0;
}
class Person {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    getDetails() {
        return `Name: ${this.name}, Age: ${this.age}`;
    }
}
function filterByRating(items) {
    return items.filter((item) => item.rating >= 4);
}
function filterActiveUsers(users) {
    return users.filter((user) => user.isActive === true);
}
function printBookDetails(book) {
    const availability = book.isAvailable ? "Yes" : "No";
    console.log(`Title: ${book.title}, Author: ${book.author}, Published: ${book.publishedYear}, Available: ${availability}`);
}
function getUniqueValues(array1, array2) {
    const result = [];
    // Add all elements from first array
    for (let i = 0; i < array1.length; i++) {
        let exists = false;
        for (let j = 0; j < result.length; j++) {
            if (array1[i] === result[j]) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            result.push(array1[i]);
        }
    }
    // Add elements from second array if not already in result
    for (let i = 0; i < array2.length; i++) {
        let exists = false;
        for (let j = 0; j < result.length; j++) {
            if (array2[i] === result[j]) {
                exists = true;
                break;
            }
        }
        if (!exists) {
            result.push(array2[i]);
        }
    }
    return result;
}
function calculateTotalPrice(products) {
    return products
        .map((product) => {
        const total = product.price * product.quantity;
        if (product.discount) {
            return total * (1 - product.discount / 100);
        }
        return total;
    })
        .reduce((sum, value) => sum + value, 0);
}
//# sourceMappingURL=solution.js.map