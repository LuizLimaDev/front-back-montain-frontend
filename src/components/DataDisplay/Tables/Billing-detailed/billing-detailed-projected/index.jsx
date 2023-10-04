import { Link, useNavigate } from "react-router-dom";
import useCharges from "../../../../../hooks/useCharges";
import useMetricsDashboard from "../../../../../hooks/useMetricsDashboard";
import { moneyFormat } from "../../../../../utils/moneyFormat";
import "./style.css";
import SkeletonChargesTable from '../../../../Feedback/Skeleton/SkeletonChargesTable/index';

function BillingDetailedProjected() {
	const { metrics } = useMetricsDashboard();
	const { setChargesParams } = useCharges();
	const navigate = useNavigate();

	return (
		<div className="table-small">
			<div className="table-title">
				<h1 className="table-name">Cobranças Previstas</h1>
				<span className="quantity">
					{metrics.totalCounts.countProjected}
				</span>
			</div>

			<div className="table-infos-description">
				<p className="table-info">Cliente</p>
				<p className="table-info">Id da cob.</p>
				<p className="table-info">Valor</p>
			</div>
			{
				metrics.listBillings.projected.length > 0 ? (
					metrics.listBillings.projected.slice(0, 5).map((billing) => {
            const formattedValue = moneyFormat.format(billing.value).replace(/^(\D+)/, "$1 ");
            const valueClassName = formattedValue.length > 10 ? "data-value hidden" : "data-value";
            
						return (
							<div className="table-content" key={billing.id}>
								<p className="data-name">{billing.name}</p>
								<p className="data-id">{billing.id}</p>
								<p className="data-value">
									{moneyFormat.format(billing.value).replace(/^(\D+)/, "$1 ")}
								</p>
							</div>
						);
					})
				) : (
					<SkeletonChargesTable />
				)
			}
			<Link
				to="/billings"
				className="table-btn"
				onClick={(e) => {
					e.preventDefault();
					navigate("/billings");
					setChargesParams({ filter: '["pendente"]' });
				}}
			>
				Ver todos
			</Link>
		</div>
	);
}

export default BillingDetailedProjected;
