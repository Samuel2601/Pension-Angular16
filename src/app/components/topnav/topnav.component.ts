import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
@Component({
	selector: 'app-topnav',
	templateUrl: './topnav.component.html',
	styleUrls: ['./topnav.component.css'],
})
export class TopnavComponent implements OnInit {
	public rol: any;
	public nombres: any;
	public estado: any;
	public aux: any;
	public id: any;
	public token = localStorage.getItem('token');
	constructor(private _router: Router, private _adminService: AdminService) {}

	ngOnInit(): void {
		let aux = localStorage.getItem('identity');
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			this.rol = response.data.rol;
			this.id = response.data._id;
			this.nombres = response.data.nombres + ' ' + response.data.apellidos;
			this.aux = response.data.email;
			if (response.data.estado != undefined) {
				this.estado = response.data.estado;
			}
		});
	}

	logout() {
		//window.location.reload();
		localStorage.clear();

		this._router.navigate(['/']).then(() => {
			window.location.reload();
		});
	}
}
