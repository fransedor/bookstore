import { JwtPayload } from "jwt-decode";

export interface ServiceReturnInterface<T> {
	error: boolean;
	code: number;
	data?: T;
	message?: string;
}

export interface CustomErrorInterface {
	code: number;
	message: string;
}

export interface CustomJWTPayload extends JwtPayload {
  admin: boolean;
  exp: number;
}