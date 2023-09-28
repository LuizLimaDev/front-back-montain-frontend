/* eslint-disable react/prop-types */
import { createContext, useState } from "react";

export const ChargesContext = createContext({});

export const ChargesProvider = ({ children }) => {
	const [charges, setCharges] = useState([]);
	const [charge, setCharge] = useState({
		name: "",
		customerId: "",
		status: "",
		value: "",
		dueDate: "",
		description: "",
	});
	const [chargeEdit, setChargeEdit] = useState({
		name: "",
		id: "",
		status: "",
		value: "",
		dueDate: "",
		description: "",
		customerId: "",
	});
	
	const [chargesParams, setChargesParams] = useState({});

	return (
		<ChargesContext.Provider
			value={{
				charges,
				setCharges,
				charge,
				setCharge,
				chargeEdit, 
				setChargeEdit,
				chargesParams,
				setChargesParams
			}}
		>
			{children}
		</ChargesContext.Provider>
	);
};
