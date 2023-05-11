import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
declare var iziToast: any;
declare var $: any;
@Component({
	selector: 'app-config',
	templateUrl: './config.component.html',
	styleUrls: ['./config.component.css'],
})
export class ConfigComponent implements OnInit {
	public config: any = {};
	public config_const: any = {};
	public load_btn = true;
	public token = localStorage.getItem('token');
	public load_data = true;
	public rol = undefined;
	public auxdate = '';
	public auxmescompleto = '';
	
	public yo = 0;
	public bol = '';
	public arr_meses: Array<any> = [];

	public rubro = {
		idrubro:'',
		descripcion:'',
		valor:''
	};
	public arr_rubro: Array<any> = [];
	public arr_rubro_const: Array<any> = [];

	constructor(private _adminService: AdminService) {}

	ngOnInit(): void {
		let aux = localStorage.getItem('identity');
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			this.rol = response.data.rol;
			if (response.data.email == 'samuel.arevalo@espoch.edu.ec') {
				this.yo = 1;
			}
			////console.log(this.yo);
		});
		this.init_data();
	}
	public uniqueArray=true;
	init_data() {
		this.load_data = true;
		this._adminService.obtener_config_admin(this.token).subscribe((response) => {
			if (response.message) {
				this.bol = response.message;
				
				this.load_btn = false;
				this.load_data = false;
			} else {
				
				this.config_const = response.data[0];
				this.config=this.config_const;
				//console.log(this.config);
				if(this.config.extrapagos){
					this.arr_rubro_const=Object.assign(JSON.parse(this.config.extrapagos));
					this.arr_rubro= Object.assign(JSON.parse(this.config.extrapagos));
					//console.log(this.arr_rubro_const);
					
				}
				this.auxdate = this.config.anio_lectivo;
				this.auxmescompleto = this.config.mescompleto;
				this.config.mescompleto='';
				this.load_data = false;
				this.fechas(1);
				this._adminService.actualizar_config_admin(this.config_const, this.token).subscribe(
					(response) => {
						iziToast.show({
							title: 'SUCCESS',
							titleColor: '#1DC74C',
							color: '#FFF',
							class: 'text-success',
							position: 'topRight',
							message: 'Se encuentra actualiza correctamente las configuraciones.',
						});
					},
					(error) => {
						this.load_btn = false;
					}
				);
			}

			if (this.config.numpension >= 10) {
				this.load_btn = false;
			}
		});
	}
	cerrar_add_rubro(){
		$('#modalNuevoRubro').modal('hide');
	}
	fechas(id) {
		this.arr_meses = [];
		for (var i = 0; i < 10; i++) {
			this.arr_meses.push({
				date: new Date(this.config.anio_lectivo).setMonth(new Date(this.config.anio_lectivo).getMonth() + i),
			});
		}
	}
	addarr_rubro(addrubroForm: any){
		
		if(addrubroForm.valid){
			
			if(this.arr_rubro.find(element=>element.idrubro==this.rubro.idrubro)==undefined){
				this.arr_rubro.push(this.rubro);
				this.uniqueArray=JSON.stringify(this.arr_rubro) === JSON.stringify(this.arr_rubro_const);
				//console.log(this.uniqueArray);
				this.rubro={idrubro:'',
				descripcion:'',
				valor:''};
				$('#modalNuevoRubro').modal('hide');
			}else{
				iziToast.show({
					title: 'DANGER',
					titleColor: 'RED',
					color: 'RED',
					class: 'text-success',
					position: 'topRight',
					message: 'Ya existe ese código de rubro',
				});
			}
		}
		
	}
	eliminarrubro(val){
		this._adminService.obtener_detalles_ordenes_rubro(this.arr_rubro[val].idrubro,this.token).subscribe((response)=>{
			//console.log(response);
			if(response.pagos.length==0){
				this.arr_rubro.splice(val, 1);
				this.uniqueArray=JSON.stringify(this.arr_rubro) === JSON.stringify(this.arr_rubro_const);
				//console.log(this.uniqueArray);
			}else{
				iziToast.show({
					title: 'DANGER',
					titleColor: 'RED',
					color: 'RED',
					class: 'text-success',
					position: 'topRight',
					message: 'Hay pagos bajo este rubro',
				});
			}
		});
		
	}

	addrubro(){
		if(this.arr_rubro.length>=0){
			this.config=this.config_const;
			this.config.extrapagos=JSON.stringify(this.arr_rubro);
			this._adminService.actualizar_config_admin(this.config, this.token).subscribe(
				(response) => {
					$('#modalRubro').modal('hide');
					iziToast.show({
						title: 'SUCCESS',
						titleColor: '#1DC74C',
						color: '#FFF',
						class: 'text-success',
						position: 'topRight',
						message: 'Se encuentra actualiza correctamente las configuraciones.',
					});
					location.reload();
				},
				(error) => {
					this.load_btn = false;
				}
			);
		}
	}
	actualizar(actualizarForm: any) {
		//console.log(this.config);

		if (actualizarForm.valid) {
			this.load_btn = true;
			//console.log(new Date(new Date(this.auxdate).setMonth(new Date(this.auxdate).getMonth() + 10)).getTime() < new Date(this.config.anio_lectivo).getTime());
			this.config.nuevo=1;
			if (
				(this.bol == '' &&
					this.config.numpension >= 10 &&
					new Date(new Date(this.auxdate).setMonth(new Date(this.auxdate).getMonth() + 10)).getTime() <
						new Date(this.config.anio_lectivo).getTime()) ||
				this.bol != ''
			) {
				this._adminService.actualizar_config_admin(this.config, this.token).subscribe(
					(response) => {
						//console.log(response);
						if (response.message == undefined) {
							iziToast.show({
								title: 'SUCCESS',
								titleColor: '#1DC74C',
								color: '#FFF',
								class: 'text-success',
								position: 'topRight',
								message: 'Se actualizó correctamente las configuraciones.',
							});
						} else {
							iziToast.show({
								title: 'DANGER',
								titleColor: 'RED',
								color: 'RED',
								class: 'text-success',
								position: 'topRight',
								message: response.message,
							});
						}

						this.load_btn = false;

						//this.ngOnInit();
						$('#modalConfirmar').modal('hide');
						location.reload();
					},
					(error) => {
						this.load_btn = false;
					}
				);
				
			} else {
				$('#modalConfirmar').modal('hide');
				this.load_btn = false;
				iziToast.show({
					title: 'DANGER',
					titleColor: 'RED',
					color: 'RED',
					class: 'text-success',
					position: 'topRight',
					message:
						'No se puede añadir un nuevo perido si es menor o igual al actual y ya hayan pasado los 10 meses ',
				});
			}
		} else {
			iziToast.show({
				title: 'ERROR',
				titleColor: '#FF0000',
				color: '#FFF',
				class: 'text-danger',
				position: 'topRight',
				message: 'Los datos del formulario no son validos',
			});
		}
	}
}
