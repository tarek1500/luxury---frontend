export interface IPaginate<T> {
	data: T;
	meta: IMeta;
}

export interface IMeta {
	current_page: number;
	per_page: number;
	total: number;
}