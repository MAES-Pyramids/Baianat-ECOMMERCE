
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CreateUserInput {
    first_name: string;
    last_name?: Nullable<string>;
    email: string;
    password: string;
}

export class UpdateUserInput {
    role?: Nullable<string>;
    first_name?: Nullable<string>;
    last_name?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    isSuspended?: Nullable<boolean>;
}

export class User {
    id: number;
    role: string;
    first_name: string;
    last_name?: Nullable<string>;
    email: string;
    isVerified: boolean;
    isSuspended: boolean;
}

export abstract class IQuery {
    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract updateUser(id: number, updateUserInput: UpdateUserInput): User | Promise<User>;
}

export type DateTime = any;
type Nullable<T> = T | null;
