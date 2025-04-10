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
		const colRepairId = document.querySelector('#repairId');
		const colRepairClientName = document.querySelector('#repairClientName');
		const colRepairEquipmentCompany = document.querySelector('#repairEquipmentCompany');
		const colRepairEquipmentModel = document.querySelector('#repairEquipmentModel');
		const colRepairEquipmentDamageDescription = document.querySelector('#repairEquipmentDamageDescription');
		const colRepairEquipmentRepairDescription = document.querySelector('#reapirEquipmentRepairDescription');
		const colRepairStatus = document.querySelector('#repairRepairStatus');
		const dbDataTBody = document.querySelector('#dbDataTBody');

		colRepairId.style.maxWidth = "40px";
		colRepairId.style.minWidth = "40px";
		colRepairClientName.style.width = "10%";
		colRepairClientName.style.minWidth = "128px";
		colRepairEquipmentCompany.style.width = "10%";
		colRepairEquipmentCompany.style.minWidth = "128px";
		colRepairEquipmentModel.style.width = "10%";
		colRepairEquipmentModel.style.minWidth = "128px";
		colRepairEquipmentDamageDescription.style.width = "30%";
		colRepairEquipmentDamageDescription.style.minWidth = "256px";
		colRepairEquipmentRepairDescription.style.width = "30%";
		colRepairEquipmentRepairDescription.style.minWidth = "256px";
		colRepairStatus.style.width = "10%";
		colRepairStatus.style.minWidth = "128px";

		let dbDataContent = '';
		api_response.data.forEach(row => {
			if (row.is_company == 0 || row.is_company == null) {
				dbDataContent += `
					<tr class='dbRow' onclick=repair_details(${row.id})>
						<td class='dbRowRoundedLeft'>${row.id}</td>
						<td>${row.first_name} ${row.last_name}</td>
						<td>${row.brand}</td>
						<td>${row.model}</td>
						<td>${row.status}</td>
						<td>${row.damage_description}</td>
                		<td class='dbRowRoundedRight'>${row.repair_description}</td>
					</tr>
				`;
			}
			else {
				dbDataContent += `
					<tr class='dbRow' onclick=repair_details(${row.id})>
						<td class='dbRowRoundedLeft'>${row.id}</td>
						<td>${row.company_name}</td>
						<td>${row.brand}</td>
						<td>${row.model}</td>
						<td>${row.status}</td>
						<td>${row.damage_description}</td>
                		<td class='dbRowRoundedRight'>${row.repair_description}</td>
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
