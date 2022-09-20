import { ReactNode } from "react";

export interface AppProviderProps {
	children: ReactNode;
}

export interface AppContextProps extends State {
	clearCart: () => void;
	remove: (id: number) => void;
	toggleAmount: (id: number, type: string) => void;
}

export interface Product {
	id: number;
	title: string;
	price: number;
	img: string;
	amount: number;
}

export interface State {
	loading: boolean;
	cart: Product[];
	total: number;
	amount: number;
}


export interface Action {
	type: string;
	payload: any;
}

export interface CartTotal {
	total: number;
	amount: number;
}

export interface CartContent {
	cart: Product[];
}
