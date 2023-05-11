import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { GLOBAL } from 'src/app/service/GLOBAL';

declare var $: any;
declare var iziToast: any;

@Component({
	selector: 'app-control',
	templateUrl: './control.component.html',
	styleUrls: ['./control.component.css'],
})
export class ControlComponent implements OnInit {
	public token = localStorage.getItem('token');
	public filtro = '';
	public admin: Array<any> = [];
	public admin_const: Array<any> = [];
	public page = 1;
	public pageSize = 10;
	public url = GLOBAL.url;

	constructor(private _adminService: AdminService, private _router: Router) {}

	ngOnInit(): void {
		if (JSON.parse(localStorage.getItem('user_data')).email != 'samuel.arevalo@espoch.edu.ec') {
			this._router.navigate(['/']);
		} else {
			this._adminService.listar_admininstitucion(this.token).subscribe((response) => {
				if (response.data) {
					////console.log(response.data);
					this.admin_const = response.data;
					this.admin = this.admin_const;
					this.admin.forEach((element: any) => {
						element.idadmin.telefono = element.idadmin.telefono.slice(0, -1);
						element.telefonoinsti = element.telefonoinsti.slice(0, -1);
					});
					//console.log(this.admin);
				}
			});
		}
	}
	async filtrar_estudiante() {
		if (this.filtro) {
			var term = new RegExp(this.filtro.toString().trim(), 'i');
			this.admin = this.admin_const.filter(
				(item) =>
					term.test(item.titulo) ||
					term.test(item.pais) ||
					term.test(item.provincia) ||
					term.test(item.canton) ||
					term.test(item.telefonocon) ||
					term.test(item.telefonoinsti) ||
					term.test(item.codigopostal) ||
					term.test(item.idadmin.dni) ||
					term.test(item.idadmin.apellidos) ||
					term.test(item.idadmin.nombres) ||
					term.test(item.idadmin.telefono) ||
					term.test(item._id)
			);
		} else {
			this.admin = this.admin_const;
		}
	}
	actualizar(idadmin) {
		//console.log(idadmin);
		this._adminService.actualizar_admininstitucion(idadmin, this.token).subscribe((response) => {
			if (response.message) {
				iziToast.show({
					title: 'SUCCESS',
					titleColor: '#1DC74C',
					color: '#FFF',
					class: 'iziToast-success',
					position: 'topRight',
					message: response.message,
				});
				setTimeout(function () {
					location.reload();
				}, 1000);
			}
		});
	}
	cambiar_b(base){
		let b: any = {};
		b.base = base;
		this._adminService.cambiar_base(b, this.token).subscribe((response)=>{
			
			if(response.data){
				localStorage.removeItem('token');
				localStorage.removeItem('user_data');
				//localStorage.removeItem('identity');

				localStorage.setItem('token', response.token);
				//localStorage.setItem('identity', response.data._id);
				localStorage.setItem('user_data', JSON.stringify(response.data));
				this._router.navigate(['/dashboard']);
				//console.log(response);
			}else if(response.message){
				iziToast.show({
					title: 'ERROR',
					titleColor: '#1DC74C',
					color: '#FFF',
					class: 'iziToast-danger',
					position: 'topRight',
					message: response.message,
				});
			}

		});
	}
}
