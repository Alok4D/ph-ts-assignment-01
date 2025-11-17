function formatValue(
  value: string | number | boolean
): string | number | boolean {
  if (typeof value === "string") {
    return value.toUpperCase();
  } else if (typeof value === "number") {
    return value * 10;
  } else {
    return !value;
  }
}

function getLength(value: string | any[]): number {
  if (typeof value === "string") {
    return value.length;
  } else if (Array.isArray(value)) {
    return value.length;
  }
  return 0;
}

class Person {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getDetails(): string {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

function filterByRating(
  items: { title: string; rating: number }[]
): { title: string; rating: number }[] {
  return items.filter((item) => item.rating >= 4);
}

function filterActiveUsers(
  users: { id: number; name: string; email: string; isActive: boolean }[]
): { id: number; name: string; email: string; isActive: boolean }[] {
  return users.filter((user) => user.isActive === true);
}

interface Book {
  title: string;
  author: string;
  publishedYear: number;
  isAvailable: boolean;
}

function printBookDetails(book: Book): void {
  const availability = book.isAvailable ? "Yes" : "No";
  console.log(
    `Title: ${book.title}, Author: ${book.author}, Published: ${book.publishedYear}, Available: ${availability}`
  );
}

function getUniqueValues(
  array1: (number | string)[],
  array2: (number | string)[]
): (number | string)[] {
  const result: (number | string)[] = [];

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

interface Product {
  name: string;
  price: number;
  quantity: number;
  discount?: number;
}

function calculateTotalPrice(products: Product[]): number {
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
