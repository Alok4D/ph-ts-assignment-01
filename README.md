# TypeScript Assignment - Interview Questions Blog

## প্রশ্ন ১: TypeScript-এ Interface এবং Type-এর মধ্যে পার্থক্য কী?

TypeScript-এ `interface` এবং `type` দুটোই টাইপ ডিফাইন করার জন্য ব্যবহৃত হয়, কিন্তু তাদের মধ্যে কিছু গুরুত্বপূর্ণ পার্থক্য রয়েছে:

### Interface:
- মূলত অবজেক্ট এবং ক্লাসের কাঠামো ডিফাইন করে
- Declaration merging সাপোর্ট করে
- Extends করা যায়
- Class implement করতে পারে

```typescript
interface User {
  name: string;
  age: number;
}

interface Admin extends User {
  role: string;
}

// Declaration merging
interface User {
  email: string; // User interface-এ যোগ হবে
}

class Person implements User {
  name: string;
  age: number;
  email: string;
}
```

### Type Alias:
- যেকোনো ধরনের টাইপ ডিফাইন করতে পারে
- Union এবং intersection types তৈরি করতে পারে
- Computed properties সাপোর্ট করে
- Primitive types alias করতে পারে

```typescript
type Status = "active" | "inactive" | "pending";

type UserType = {
  name: string;
  age: number;
}

type AdminType = UserType & {
  role: string;
}

type StringOrNumber = string | number;
```

### মূল পার্থক্য:
- **Interface**: অবজেক্ট শেইপ ডিফাইন করার জন্য, ক্লাস implementation এর জন্য
- **Type**: Union types, complex type operations এর জন্য

---

## প্রশ্ন ২: TypeScript-এ keyof কীওয়ার্ডের ব্যবহার কী? উদাহরণ দিন।

`keyof` অপারেটর একটি অবজেক্ট টাইপের সব key গুলোর union type তৈরি করে।

### মূল ব্যবহার:

```typescript
interface Person {
  name: string;
  age: number;
  email: string;
}

// keyof Person = "name" | "age" | "email"
type PersonKeys = keyof Person;

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person: Person = {
  name: "আহমেদ",
  age: 25,
  email: "ahmed@example.com"
};

const name = getProperty(person, "name"); // string type
const age = getProperty(person, "age");   // number type
```

### Practical Example:

```typescript
interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
}

// Dynamic property access with type safety
function updateProduct<K extends keyof Product>(
  product: Product, 
  key: K, 
  value: Product[K]
): Product {
  return { ...product, [key]: value };
}

const product: Product = {
  id: 1,
  title: "ল্যাপটপ",
  price: 50000,
  category: "ইলেকট্রনিক্স"
};

// Type-safe updates
const updatedProduct = updateProduct(product, "price", 45000);
const updatedTitle = updateProduct(product, "title", "নতুন ল্যাপটপ");
```

### Object Key Validation:

```typescript
function hasProperty<T extends object>(obj: T, key: keyof T): boolean {
  return key in obj;
}

const user = { name: "রহিম", age: 30 };
console.log(hasProperty(user, "name")); // true
console.log(hasProperty(user, "age"));  // true
```

`keyof` ব্যবহার করে আমরা type-safe property access এবং dynamic object manipulation করতে পারি, যা runtime error প্রতিরোধ করে।
