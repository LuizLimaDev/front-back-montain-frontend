import { useTheme } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useContext } from "react";
import { Link } from "react-router-dom";
import ChevronUpDown from "../../../assets/chevron-Up-Down.png";
import CreateBilling from "../../../assets/create-billing.png";
import { ModalsContext } from "../../../context/ModalsContext";
import useCustomers from "../../../hooks/useCustomers";
import ChargeModal from "../../Modals/ChargeModal";
import "./style.css";

let red = <div className="red">Inadimplente</div>;
let green = <div className="green">Em dia</div>;

export default function ClientsTable() {
	const { customers } = useCustomers();
	const { setOpenChargeModal, setCustomerCharges } =
		useContext(ModalsContext);

	const theme = useTheme();

	return (
		<TableContainer
			component={Paper}
			sx={{
				...theme.layoutOutletContents,
				...theme.infoBillingsTable,
				overflowY: "auto",
				maxHeight: "42rem",
			}}
		>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead
					sx={{
						position: "sticky",
						top: 0,
						backgroundColor: "white",
					}}
				>
					<TableRow>
						<TableCell>
							<div className="client-icon">
								<img
									style={{ cursor: "pointer" }}
									src={ChevronUpDown}
								/>{" "}
								Cliente
							</div>
						</TableCell>
						<TableCell align="left">CPF</TableCell>
						<TableCell align="left">E-mail</TableCell>
						<TableCell align="left">Telefone</TableCell>
						<TableCell align="left">Status</TableCell>
						<TableCell align="left">Criar Cobrança</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{customers.map((row) => (
						<TableRow
							key={row.id}
							sx={{
								"&:last-child td, &:last-child th": {
									border: 0,
								},
								...theme.clientValueStyle,
							}}
						>
							<TableCell
								sx={theme.clientValueStyle}
								component="th"
								scope="row"
							>
								<Link
									className="link"
									to={`/clients/${row.id}`}
								>
									{row.name}
								</Link>
							</TableCell>
							<TableCell sx={theme.clientValueStyle} align="left">
								{row.cpf}
							</TableCell>
							<TableCell sx={theme.clientValueStyle} align="left">
								{row.email}
							</TableCell>
							<TableCell sx={theme.clientValueStyle} align="left">
								{row.phone}
							</TableCell>
							<TableCell sx={theme.clientValueStyle} align="left">
								{row.status === "pendente" ||
								row.status === "vencido"
									? red
									: green}
							</TableCell>
							<TableCell sx={theme.clientValueStyle} align="left">
								<img
									style={{ cursor: "pointer" }}
									src={CreateBilling}
									onClick={() => {
										setCustomerCharges((prevState) => {
											return {
												...prevState,
												customerId: row.id,
												name: row.name,
											};
										});
										setOpenChargeModal(true);
									}}
								></img>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
			<ChargeModal />
		</TableContainer>
	);
}
