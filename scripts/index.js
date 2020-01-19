//let URL = 'https://petsittersa.herokuapp.com/';
let URL = 'https://petsittersa.herokuapp.com/';
let userId = 0;

function findWorker(){
	let phoneWorker = $("#inputWorker").val();
	let contentDiv = $('.content');
	let workerDiv = $('#worker');
	let txtName = $('#txtName');
    let txtBirthday = $('#txtDateOfBirth');
    let txtLocation = $('#txtLocation');
    let txtEmail = $('#txtEmail');
    let txtPhone = $('#txtPhone');
    let txtSkills = $('#txtSkills');
    let btnActv = $('#btnActv');
    let imgAvatar = $('#imgAvatar');
    let imgDoc1 = $('#photo1');
    let imgDoc2 = $('#photo2');

    $.post(URL + 'info/findByPhone',
    	{phone: phoneWorker},function(data,status){
        console.log(data);
        console.log(data.response.worker.firstName);
        if (data.status) {
           txtName.text('Имя: ' + data.response.worker.firstName
           + ' ' + data.response.worker.lastName);
           txtBirthday.text('Дата рождения: ' + data.response.worker.birthday);
           var address = '';
           if (data.response.address.privateHouse) {
           	address = 'Адрес: ' + data.response.address.country + ', '
           	+ data.response.address.city + ', '
           	+ data.response.address.district + ', '
           	+ data.response.address.street + ', '
           	+ data.response.address.house;
           }else{
           	address = 'Адрес: ' + data.response.address.country + ', '
           	+ data.response.address.city + ', '
           	+ data.response.address.district + ', '
           	+ data.response.address.street + ', '
           	+ data.response.address.apartment;
           }
           txtLocation.text(address);
           txtEmail.text('Електронная почта: ' + data.response.worker.email);
           txtPhone.text('Контактные телефоны: '
            + data.response.worker.contactPhone1 + ', '
            + data.response.worker.contactPhone2);
           txtSkills.text('Навыки: ' + data.response.worker.skills);
           if (data.response.worker.account_enabled) {
           	  btnActv.text('Активирован');
           	  btnActv.val(1);
           	  btnActv.css({
		      "background": "#66BEE8"
	          });
           }else{
           	  btnActv.text('Не активирован');
           	  btnActv.val(-1);
           	  btnActv.css({
		      "background": "#B5CFD8"
	          });
           }
           imgAvatar.attr('src','data:image/jpeg;charset=utf-8;base64, '
            + data.response.worker.photo);
           imgDoc1.attr('src','data:image/jpeg;charset=utf-8;base64, '
            + data.response.worker.document1);
           imgDoc2.attr('src','data:image/jpeg;charset=utf-8;base64, '
            + data.response.worker.document2);
           userId = data.response.worker.id;
           console.log(btnActv.val());
           console.log(userId);
           clearStyle(txtName);
           clearStyle(txtBirthday);
           clearStyle(txtLocation);
           clearStyle(txtEmail);
           clearStyle(txtPhone);
           clearStyle(txtSkills);
           clearStyle(imgAvatar);
           clearStyle(imgDoc1);
           clearStyle(imgDoc2);
        }
    });
    contentDiv.hide();
    workerDiv.show();
}

function clearStyle(view){
	view.css({
		"background": "none",
		"border": "none"
	});
}

function changeStatus(){
	let btnActv = $('#btnActv');
	console.log(userId);
	console.log(btnActv.val());
	$.post(URL + 'info/changeStatus',
    	{id: userId, type: 'Worker'},function(data,status){
              console.log(data)
              if (data.status) {
              	 if (btnActv.val() == -1) {
              	 	btnActv.text('Активирован');
           	        btnActv.css({
		            "background": "#66BEE8"
	                });
	                btnActv.val(1);
              	 }else if(btnActv.val() == 1){
                    btnActv.text('Не активирован');
           	        btnActv.css({
		            "background": "#B5CFD8"
	                });
	                btnActv.val(-1);
              	 }
              } 
    });
}
