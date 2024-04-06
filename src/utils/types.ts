export interface ServiceReturnInterface<T> {
	error: boolean;
	code: number;
	data?: T;
	message?: string;
}