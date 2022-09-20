import { createContext, useContext, useEffect, useReducer, } from 'react'
import { Action, AppContextProps, AppProviderProps, State } from "./interfaces";
import reducer from './reducer'

const initialState: State = {
	loading: false,
	cart: [],
	total: 0,
	amount: 0
}

const url = 'https://course-api.com/react-useReducer-cart-project';

const AppContext = createContext({} as AppContextProps);

function AppProvider({ children }: AppProviderProps) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const clearCart = () => {
		dispatch({ type: 'CLEAR_CART' } as Action);
	};

	const remove = (id: number) => {
		dispatch({ type: 'REMOVE', payload: id } as Action);
	};

	const toggleAmount = (id: number, type: string) => {
		dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type } } as Action);
	};

	const fetchData = async () => {
		dispatch({ type: 'LOADING' } as Action);
		const response = await fetch(url);
		const cart = await response.json();
		dispatch({ type: 'DISPLAY_ITEMS', payload: cart } as Action);
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		dispatch({ type: 'GET_TOTALS' } as Action);
	}, [state.cart]);

	return (
		<AppContext.Provider
			value={{
				...state,
				clearCart,
				remove,
				toggleAmount,
			}}
		>
			{children}
		</AppContext.Provider>
	)
}

export const useGlobalContext = () => useContext(AppContext);

export { AppContext, AppProvider }
