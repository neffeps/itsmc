function repair_details(id) {
	showCurrentStatusPopup();
	auth_check();
	viewMode = 'details';
	fetch('https://neffeps.x10.mx/api/repair_details.php?id='+id, {
		method: "GET",
    	credentials: "include"
	})
 	.then(response => response.json())
  	.then(data => {
		hideCurrentStatusPopup();
		if (data.error) {
			console.error(data.error);
			return;
		}
		current_id = data.id;
        const dbDataDetailsFirstName = document.querySelector('#dbDataDetailsFirstName');
		const dbDataDetailsLastName = document.querySelector('#dbDataDetailsLastName');
		const dbDataDetailsEmailAddresses = document.querySelector('#dbDataDetailsEmailAddresses');
		const dbDataDetailsPhoneNumbers = document.querySelector('#dbDataDetailsPhoneNumbers');
		const dbDataDetailsStreet = document.querySelector('#dbDataDetailsStreet');
		const dbDataDetailsStreetNumber = document.querySelector('#dbDataDetailsStreetNumber');
		const dbDataDetailsRoomNumber = document.querySelector('#dbDataDetailsRoomNumber');
		const dbDataDetailsCity = document.querySelector('#dbDataDetailsCity');
		const dbDataDetailsId = document.querySelector('#dbDataDetailsHeaderId');
		const dbDataDetailsEquipmentCompany = document.querySelector('#dbDataDetailsEquipmentCompany');
		const dbDataDetailsEquipmentModel = document.querySelector('#dbDataDetailsEquipmentModel');
		const dbDataDetailsEquipmentType = document.querySelector('#dbDataDetailsEquipmentType');
		const dbDataDetailsEquipmentStatus = document.querySelector('#dbDataDetailsEquipmentStatus');
		const dbDataDetailsCreationDate = document.querySelector('#dbDataDetailsCreationDate');
		const dbDataDetailsRepairUser = document.querySelector('#dbDataDetailsRepairUser');
		const dbDataDetailsRepairType = document.querySelector('#dbDataDetailsRepairType');
		const dbDataDetailsRepairStatus = document.querySelector('#dbDataDetailsRepairStatus');
		const dbDataDetailsDamageDescription = document.querySelector('#dbDataDetailsDamageDescription');
		const dbDataDetailsRepairDescripiton = document.querySelector('#dbDataDetailsRepairDescription');
		const previousObject = document.querySelector('#previousObject');
		const nextObject = document.querySelector('#nextObject');
		
		dbDataDetailsFirstName.textContent = data.first_name || '';
		dbDataDetailsLastName.textContent = data.last_name || '';
		dbDataDetailsEmailAddresses.textContent = data.email_addresses || '';
		dbDataDetailsId.textContent = data.id || '';
		dbDataDetailsEquipmentCompany.textContent = data.brand || '';
		dbDataDetailsEquipmentModel.textContent = data.model || '';
		dbDataDetailsEquipmentType.textContent = data.device_type || '';
		dbDataDetailsCreationDate.textContent = data.creation_date || '';
		dbDataDetailsRepairType.textContent = data.repair_type || '';
		dbDataDetailsRepairStatus.textContent = data.repair_status || '';
		dbDataDetailsDamageDescription.textContent = data.damage_description || '';
		dbDataDetailsRepairDescripiton.textContent = data.repair_description || '';
		const dbDataTableContainer = document.querySelector('#dbDataTableContainer');
    	const dbDataDetailsContainer = document.querySelector('#dbDataDetailsContainer');
    	dbDataTableContainer.style.display = "none";
    	dbDataDetailsContainer.style.display = "flex";
		});
}
