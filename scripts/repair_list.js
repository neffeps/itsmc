function repair_list() {
	auth_check();
	viewMode = "list";
	fetch('https://neffeps.x10.mx/api/repairs.php', {
		method: "GET",
    	credentials: "include"
	})
	.then(response => response.json())
	.then(data => {
		if (data.error) {
			console.error(data.error);
			return;
		}
		dbDataDetailsContainer.style.display = "none";
		dbDataTableContainer.style.display = "flex";
		const colRepairId = document.querySelector('#repairId');
		const colRepairClientName = document.querySelector('#repairClientName');
		const colRepairEquipmentCompany = document.querySelector('#repairEquipmentCompany');
		const colRepairEquipmentModel = document.querySelector('#repairEquipmentModel');
		const colRepairEquipmentDamageDescription = document.querySelector('#repairEquipmentDamageDescription');
		const colRepairEquipmentRepairDescription = document.querySelector('#reapirEquipmentRepairDescription');
		const colRepairStatus = document.querySelector('#repairRepairStatus');
		const dbDataTBody = document.querySelector('#dbDataTBody');

		colRepairId.style.maxWidth = "48px";
		colRepairId.style.minWidth = "48px";
		colRepairClientName.style.width = "10%";
		colRepairClientName.style.minWidth = "144px";
		colRepairEquipmentCompany.style.width = "10%";
		colRepairEquipmentCompany.style.minWidth = "144px";
		colRepairEquipmentModel.style.width = "10%";
		colRepairEquipmentModel.style.minWidth = "144px";
		colRepairEquipmentDamageDescription.style.width = "30%";
		colRepairEquipmentDamageDescription.style.minWidth = "288px";
		colRepairEquipmentRepairDescription.style.width = "30%";
		colRepairEquipmentRepairDescription.style.minWidth = "288px";
		colRepairStatus.style.width = "10%";
		colRepairStatus.style.minWidth = "144px";

		let dbDataContent = '';
		data.forEach(row => {
			if (row.repair_status == "Nieprzydzielona") {
				dbDataContent += `
					<tr class='dbRow' onclick=repair_details(${row.id})>
						<td class='dbRowRoundedLeft'>${row.id}</td>
				    	<td>${row.first_name} ${row.last_name}</td>
						<td>${row.eq_company}</td>
						<td>${row.eq_model}</td>
						<td>${row.repair_status}</td>
						<td>${row.eq_damage_desc}</td>
                    	<td class='dbRowRoundedRight'>${row.repair_desc}</td>
					</tr>
				`;
			}
			else if (row.repair_status == "Otwarta") {
				dbDataContent += `
					<tr class='dbRow dbRowStatusOpen' onclick=repair_details(${row.id})>
						<td class='dbRowRoundedLeft'>${row.id}</td>
				    	<td>${row.first_name} ${row.last_name}</td>
						<td>${row.eq_company}</td>
						<td>${row.eq_model}</td>
						<td>${row.repair_status}</td>
						<td>${row.eq_damage_desc}</td>
                    	<td class='dbRowRoundedRight'>${row.repair_desc}</td>
					</tr>
				`;
			}
			else if (row.repair_status == "Aktualnie wykonywana") {
				dbDataContent += `
					<tr class='dbRow dbRowStatusInProgress' onclick=repair_details(${row.id})>
						<td class='dbRowRoundedLeft'>${row.id}</td>
				    	<td>${row.first_name} ${row.last_name}</td>
						<td>${row.eq_company}</td>
						<td>${row.eq_model}</td>
						<td>${row.repair_status}</td>
						<td>${row.eq_damage_desc}</td>
                    	<td class='dbRowRoundedRight'>${row.repair_desc}</td>
					</tr>
				`;
			}
			else if (row.repair_status == "Oczekuje na części") {
				dbDataContent += `
					<tr class='dbRow dbRowStatusWaitingForParts' onclick=repair_details(${row.id})>
						<td class='dbRowRoundedLeft'>${row.id}</td>
				    	<td>${row.first_name} ${row.last_name}</td>
						<td>${row.eq_company}</td>
						<td>${row.eq_model}</td>
						<td>${row.repair_status}</td>
						<td>${row.eq_damage_desc}</td>
                    	<td class='dbRowRoundedRight'>${row.repair_desc}</td>
					</tr>
				`;
			}
			else if (row.repair_status == "Oczekuje na decyzję") {
				dbDataContent += `
					<tr class='dbRow dbRowStatusWaitingForDecision' onclick=repair_details(${row.id})>
						<td class='dbRowRoundedLeft'>${row.id}</td>
				    	<td>${row.first_name} ${row.last_name}</td>
						<td>${row.eq_company}</td>
						<td>${row.eq_model}</td>
						<td>${row.repair_status}</td>
						<td>${row.eq_damage_desc}</td>
                    	<td class='dbRowRoundedRight'>${row.repair_desc}</td>
					</tr>
				`;
			}
			else if (row.repair_status == "Wykonana") {
				dbDataContent += `
					<tr class='dbRow dbRowStatusCompleted' onclick=repair_details(${row.id})>
						<td class='dbRowRoundedLeft'>${row.id}</td>
				    	<td>${row.first_name} ${row.last_name}</td>
						<td>${row.eq_company}</td>
						<td>${row.eq_model}</td>
						<td>${row.repair_status}</td>
						<td>${row.eq_damage_desc}</td>
                    	<td class='dbRowRoundedRight'>${row.repair_desc}</td>
					</tr>
				`;
			}
			else if (row.repair_status == "Niewykonana") {
				dbDataContent += `
					<tr class='dbRow dbRowStatusNotCompleted' onclick=repair_details(${row.id})>
						<td class='dbRowRoundedLeft'>${row.id}</td>
				    	<td>${row.first_name} ${row.last_name}</td>
						<td>${row.eq_company}</td>
						<td>${row.eq_model}</td>
						<td>${row.repair_status}</td>
						<td>${row.eq_damage_desc}</td>
                    	<td class='dbRowRoundedRight'>${row.repair_desc}</td>
					</tr>
				`;
			}
			else if (row.repair_status == "Zamknięta") {
				dbDataContent += `
					<tr class='dbRow dbRowStatusClosed' onclick=repair_details(${row.id})>
						<td class='dbRowRoundedLeft'>${row.id}</td>
				    	<td>${row.first_name} ${row.last_name}</td>
						<td>${row.eq_company}</td>
						<td>${row.eq_model}</td>
						<td>${row.repair_status}</td>
						<td>${row.eq_damage_desc}</td>
                    	<td class='dbRowRoundedRight'>${row.repair_desc}</td>
					</tr>
				`;
			}
			else {
				dbDataContent += `
					<tr class='dbRow' onclick=repair_details(${row.id})>
						<td class='dbRowRoundedLeft'>${row.id}</td>
				    	<td>${row.first_name} ${row.last_name}</td>
						<td>${row.eq_company}</td>
						<td>${row.eq_model}</td>
						<td>${row.repair_status}</td>
						<td>${row.eq_damage_desc}</td>
                    	<td class='dbRowRoundedRight'>${row.repair_desc}</td>
					</tr>
				`;
			}
		});
		dbDataTBody.innerHTML = dbDataContent;
	})
	.catch(error => {
		console.error('Błąd podczas pobierania danych: ', error);
	});
}
repair_list();
/*fetch('countObjects.php')
		.then(response => response.json())
		.then(data => {
			if (data.error) {
				console.error(data.error);
				return;
			}
			maxId = data.inRepairCount;
		});*/