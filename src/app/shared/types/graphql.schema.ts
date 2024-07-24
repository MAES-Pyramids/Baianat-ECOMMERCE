
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class SignupInput {
    firstName: string;
    lastName?: Nullable<string>;
    email: string;
    password: string;
}

export class LoginInput {
    email: string;
    password: string;
}

export class PassResetInputDto {
    email: string;
    otp: string;
}

export class SetPasswordInput {
    passwordResetToken: string;
    password: string;
}

export class CreateCategoryInput {
    name: string;
    parentId?: Nullable<number>;
}

export class UpdateCategoryInput {
    name?: Nullable<string>;
    parentId?: Nullable<number>;
}

export class CreateProductInput {
    title: string;
    description: string;
    specifications?: Nullable<JSON>;
    price: number;
    quantity: number;
    images?: Nullable<string[]>;
    categoryId: number;
}

export class UpdateProductInput {
    title?: Nullable<string>;
    description?: Nullable<string>;
    specifications?: Nullable<JSON>;
    price?: Nullable<number>;
    quantity?: Nullable<number>;
    images?: Nullable<string[]>;
    categoryId?: Nullable<number>;
}

export class CreateUserInput {
    firstName: string;
    lastName?: Nullable<string>;
    email: string;
    password: string;
}

export class UpdateUserInput {
    role?: Nullable<string>;
    firstName?: Nullable<string>;
    lastName?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    isSuspended?: Nullable<boolean>;
}

export class VerifyEmailInput {
    email: string;
    otp: string;
}

export class SendOtpInput {
    otpType: string;
    email: string;
}

export class AuthPayload {
    user: User;
    accessToken: string;
}

export class PassResetResponse {
    success: boolean;
    passwordResetToken?: Nullable<string>;
}

export class SetPasswordResponse {
    success: boolean;
    message?: Nullable<string>;
}

export abstract class IQuery {
    abstract me(): Nullable<User> | Promise<Nullable<User>>;

    abstract getTopCategories(): Category[] | Promise<Category[]>;

    abstract getCategoryInfo(id: number): Nullable<Category> | Promise<Nullable<Category>>;

    abstract getProductsByCategoryId(id: number): Product[] | Promise<Product[]>;

    abstract products(): Nullable<Product>[] | Promise<Nullable<Product>[]>;

    abstract product(id: number): Nullable<Product> | Promise<Nullable<Product>>;

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract signup(signupInput: SignupInput): User | Promise<User>;

    abstract login(loginInput: LoginInput): AuthPayload | Promise<AuthPayload>;

    abstract setPassword(setPasswordInput: SetPasswordInput): SetPasswordResponse | Promise<SetPasswordResponse>;

    abstract generateResetPassJWT(passResetInput: PassResetInputDto): PassResetResponse | Promise<PassResetResponse>;

    abstract createCategory(createCategoryInput: CreateCategoryInput): Category | Promise<Category>;

    abstract updateCategory(id: number, updateCategoryInput: UpdateCategoryInput): Category | Promise<Category>;

    abstract createProduct(createProductInput: CreateProductInput): Product | Promise<Product>;

    abstract updateProduct(id: number, updateProductInput: UpdateProductInput): Product | Promise<Product>;

    abstract removeProduct(id: number): Nullable<Product> | Promise<Nullable<Product>>;

    abstract updateUser(id: number, updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract sendOtp(sendOtpInput: SendOtpInput): SendOtpResponse | Promise<SendOtpResponse>;

    abstract verifyEmail(verifyEmailInput: VerifyEmailInput): User | Promise<User>;
}

export class Category {
    id: number;
    name: string;
    parentId?: Nullable<number>;
    parent?: Nullable<Category>;
    children?: Nullable<Category[]>;
    products?: Nullable<Product[]>;
}

export class Product {
    id: number;
    title: string;
    description: string;
    specifications?: Nullable<JSON>;
    price: number;
    quantity: number;
    images?: Nullable<string[]>;
    createdAt: DateTime;
    updatedAt: DateTime;
    category: Category;
}

export class User {
    id: number;
    role: string;
    firstName: string;
    lastName?: Nullable<string>;
    email: string;
    password: string;
    isVerified: boolean;
    isSuspended: boolean;
}

export class SendOtpResponse {
    success: boolean;
    message?: Nullable<string>;
}

export type JSON = any;
export type DateTime = any;
type Nullable<T> = T | null;
