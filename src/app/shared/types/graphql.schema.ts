
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

export class SendOtpInput {
    otpType: string;
    email: string;
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

    abstract users(): Nullable<User>[] | Promise<Nullable<User>[]>;

    abstract user(id: number): Nullable<User> | Promise<Nullable<User>>;
}

export abstract class IMutation {
    abstract signup(signupInput: SignupInput): User | Promise<User>;

    abstract login(loginInput: LoginInput): AuthPayload | Promise<AuthPayload>;

    abstract setPassword(setPasswordInput: SetPasswordInput): SetPasswordResponse | Promise<SetPasswordResponse>;

    abstract generateResetPassJWT(passResetInput: PassResetInputDto): PassResetResponse | Promise<PassResetResponse>;

    abstract sendOtp(sendOtpInput: SendOtpInput): SendOtpResponse | Promise<SendOtpResponse>;

    abstract updateUser(id: number, updateUserInput: UpdateUserInput): User | Promise<User>;

    abstract createUser(createUserInput: CreateUserInput): User | Promise<User>;

    abstract removeUser(id: number): Nullable<User> | Promise<Nullable<User>>;

    abstract verifyEmail(verifyEmailInput: VerifyEmailInput): User | Promise<User>;
}

export class SendOtpResponse {
    success: boolean;
    message?: Nullable<string>;
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

export type DateTime = any;
type Nullable<T> = T | null;
