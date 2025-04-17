function repair_list() {
	showCurrentStatusPopup();
	auth_check();
	viewMode = "list";

	fetch('https://neffeps.x10.mx/api/repairs.php', {
		method: "GET",
    	credentials: "include"
	})
	.then(response => response.json())
	.then(api_response => {
		hideCurrentStatusPopup();
		if (api_response.error) {
			console.error(api_response.error);
			return;
		}

		min_id = api_response.data.min_id;
		max_id = api_response.data.max_id;

		dbDataDetailsContainer.style.display = "none";
		dbDataTableContainer.style.display = "flex";
		const columns = [
			{ el: document.querySelector('#repairId'), width: "40px" },
			{ el: document.querySelector('#repairClientName'), width: "10%", minWidth: "128px" },
			{ el: document.querySelector('#repairEquipmentCompany'), width: "10%", minWidth: "128px" },
			{ el: document.querySelector('#repairEquipmentModel'), width: "10%", minWidth: "128px" },
			{ el: document.querySelector('#repairEquipmentDamageDescription'), width: "30%", minWidth: "256px" },
			{ el: document.querySelector('#reapirEquipmentRepairDescription'), width: "30%", minWidth: "256px" },
			{ el: document.querySelector('#repairRepairStatus'), width: "10%", minWidth: "128px" },
		];

		columns.forEach(col =>{
			col.el.style.width = col.width;
			col.el.style.minWidth = col.minWidth || col.width;
		});

		const dbDataTBody = document.querySelector('#dbDataTBody');
		let dbDataContent = '';

		api_response.data.forEach(row => {
			const statusClass = `dbRowStatus_${sanitizeValue(row.status)}`;
			const clientName = row.is_company == 1 
			? sanitizeValue(row.company_name)
			: `${sanitizeValue(row.first_name)} ${sanitizeValue(row.last_name)}`;

			dbDataContent +=`
			<tr class="dbRow ${statusClass}" onclick="repair_details(${row.id})">
				<td class="dbRowRoundedLeft">${sanitizeValue(row.id)}</td>
				<td>${clientName}</td>
				<td>${sanitizeValue(row.brand)}</td>
				<td>${sanitizeValue(row.model)}</td>
				<td>${statusLabel(row.status)}</td>
				<td>${sanitizeValue(row.damage_description)}</td>
				<td class="dbRowRoundedRight">${sanitizeValue(row.repair_description)}</td>
			`;
		});
			
		dbDataTBody.innerHTML = dbDataContent;
	})
	.catch(error => {
		console.error('Błąd podczas pobierania danych: ', error);
	});
}

function sanitizeValue(value) {
	return value === null || value === undefined ? '' : value;
}

function statusLabel(statusLabel) {
	const statusMap = {
		"unassigned": "Nieprzydzielone",
		"diagnosis": "Diagnoza",
		"quoted": "Wycenione",
		"waiting_for_parts": "Oczekuje na części",
		"paused": "Wstrzymane",
		"in_repair": "W naprawie",
		"ready_for_pickup": "Gotowe do odbioru",
		"completed": "Odebrane",
		"cancelled": "Anulowane",
		"expired": "Przedawnione",
	}
	return statusMap[statusLabel] || "";
}

repair_list();
