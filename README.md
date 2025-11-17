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

---

## প্রশ্ন ৩: TypeScript-এ any, unknown, এবং never টাইপের মধ্যে পার্থক্য কী?

TypeScript-এ `any`, `unknown`, এবং `never` তিনটি বিশেষ টাইপ যাদের আলাদা আলাদা ব্যবহার রয়েছে:

### any Type:
- সব ধরনের টাইপ চেকিং বন্ধ করে দেয়
- যেকোনো অপারেশন করা যায়
- TypeScript-এর সুবিধা হারিয়ে ফেলে

```typescript
let value: any = 42;
value = "hello";
value = true;
value.foo.bar; // কোনো error নেই
```

### unknown Type:
- Type-safe version of any
- ব্যবহারের আগে type checking প্রয়োজন
- সবচেয়ে নিরাপদ top type

```typescript
let value: unknown = 42;

// Type checking প্রয়োজন
if (typeof value === "string") {
  console.log(value.toUpperCase()); // নিরাপদ
}

if (typeof value === "number") {
  console.log(value * 2); // নিরাপদ
}
```

### never Type:
- কোনো value represent করে না
- Function যা কখনো return করে না
- Unreachable code এর জন্য

```typescript
function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

// Exhaustive checking
type Status = "success" | "error";

function handleStatus(status: Status): string {
  switch (status) {
    case "success":
      return "Success!";
    case "error":
      return "Error!";
    default:
      const exhaustive: never = status; // Type safety
      return exhaustive;
  }
}
```

### মূল পার্থক্য:
- **any**: Type safety হারায়, সব কিছু allow করে
- **unknown**: Type-safe, ব্যবহারের আগে checking প্রয়োজন
- **never**: কোনো value নেই, unreachable code represent করে

---

## প্রশ্ন ৪: TypeScript-এ Enum-এর ব্যবহার কী? Numeric এবং String Enum-এর উদাহরণ দিন।

Enum হলো named constants-এর একটি সেট যা code readability এবং maintainability বাড়ায়।

### Numeric Enum:
- Default ভাবে 0 থেকে শুরু হয়
- Auto-increment হয়
- Reverse mapping সাপোর্ট করে

```typescript
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}

// Custom starting value
enum Status {
  Pending = 1,
  Approved,  // 2
  Rejected   // 3
}

function move(direction: Direction) {
  console.log(`Moving ${Direction[direction]}`);
}

move(Direction.Up); // Moving Up
console.log(Direction[0]); // "Up" (reverse mapping)
```

### String Enum:
- প্রতিটি member-এ string value assign করতে হয়
- Reverse mapping নেই
- Runtime-এ meaningful values

```typescript
enum Color {
  Red = "red",
  Green = "green",
  Blue = "blue"
}

enum ApiEndpoint {
  Users = "/api/users",
  Products = "/api/products",
  Orders = "/api/orders"
}

function setTheme(color: Color) {
  document.body.style.backgroundColor = color;
}

setTheme(Color.Red); // "red"
console.log(ApiEndpoint.Users); // "/api/users"
```

### Mixed Enum:
```typescript
enum Response {
  No = 0,
  Yes = 1,
  Message = "success"
}
```

### মূল সুবিধা:
- **Type Safety**: Compile-time checking
- **Readability**: Meaningful names
- **IntelliSense**: IDE support
- **Refactoring**: Easy to change values

---

## প্রশ্ন ৫: TypeScript-এ Union এবং Intersection Types-এর ব্যবহার কী? উদাহরণ দিন।

Union এবং Intersection types TypeScript-এ complex type relationships তৈরি করার জন্য ব্যবহৃত হয়।

### Union Types (|):
- একাধিক type-এর মধ্যে যেকোনো একটি হতে পারে
- "OR" logic অনুসরণ করে

```typescript
type StringOrNumber = string | number;
type Status = "loading" | "success" | "error";

function formatId(id: string | number): string {
  if (typeof id === "string") {
    return id.toUpperCase();
  }
  return id.toString();
}

formatId("abc123"); // "ABC123"
formatId(456); // "456"

// Function parameter union
function processData(data: string[] | number[]): number {
  return data.length;
}
```

### Intersection Types (&):
- একাধিক type-এর সব properties একসাথে থাকে
- "AND" logic অনুসরণ করে

```typescript
interface User {
  name: string;
  email: string;
}

interface Admin {
  role: string;
  permissions: string[];
}

type AdminUser = User & Admin;

const adminUser: AdminUser = {
  name: "রহিম",
  email: "rahim@example.com",
  role: "admin",
  permissions: ["read", "write", "delete"]
};

// Function intersection
type Loggable = {
  log(): void;
};

type Serializable = {
  serialize(): string;
};

type LoggableSerializable = Loggable & Serializable;

class DataProcessor implements LoggableSerializable {
  log() {
    console.log("Processing data...");
  }
  
  serialize() {
    return JSON.stringify(this);
  }
}
```

### Practical Example:
```typescript
type ApiResponse<T> = {
  data: T;
  status: number;
} & ({
  success: true;
} | {
  success: false;
  error: string;
});

function handleResponse(response: ApiResponse<any>) {
  if (response.success) {
    console.log(response.data); // No error property
  } else {
    console.log(response.error); // Has error property
  }
}
```

### মূল পার্থক্য:
- **Union (|)**: যেকোনো একটি type হতে পারে
- **Intersection (&)**: সব type-এর properties একসাথে থাকতে হবে

---

## 📚 আরও প্রশ্ন ও উত্তর

> **বিস্তারিত TypeScript Interview Questions এবং সমাধান দেখতে নিচের লিংকে ক্লিক করুন:**

### 🔗 [Complete TypeScript Interview Guide](https://drive.google.com/file/d/1MiBqIeHl41djWwNsnx2GLIEF_U8RMNi6/view?usp=sharing)

**এই গাইডে যা পাবেন:**
- ✅ Advanced TypeScript Concepts
- ✅ Real-world Examples
- ✅ Best Practices
- ✅ Common Interview Questions
- ✅ Detailed Solutions

---

### 📝 সংক্ষিপ্ত সারাংশ

এই README-তে আমরা TypeScript-এর মূল বিষয়গুলো নিয়ে আলোচনা করেছি:

1. **Interface vs Type** - কখন কোনটি ব্যবহার করবেন
2. **keyof Operator** - Type-safe property access
3. **any, unknown, never** - বিশেষ টাইপগুলোর পার্থক্য
4. **Enums** - Named constants এর ব্যবহার
5. **Union & Intersection** - Complex type relationships

> 💡 **টিপ:** TypeScript শেখার জন্য প্রতিদিন অনুশীলন করুন এবং real-world projects এ apply করুন।

---

**Happy Coding! 🚀**
