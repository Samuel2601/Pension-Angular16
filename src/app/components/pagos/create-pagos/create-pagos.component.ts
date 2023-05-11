import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
import { EstudianteService } from 'src/app/service/estudiante.service';

declare var $: any;
declare var iziToast: any;

@Component({
	selector: 'app-create-pagos',
	templateUrl: './create-pagos.component.html',
	styleUrls: ['./create-pagos.component.css'],
})
export class CreatePagosComponent implements OnInit {
	public load_btn = false;
	public documentocreate: any = {};
	public rol: any;
	public valores_pensiones = 0;
	public aux_valor_pension = 0;
	public num_pagos = 0;
	public num_pagado = -1;
	public meses_beca = -1;
	public valor_matricula = 0;
	public matricula_pago = -1;
	public tipo = -1;
	public tok = -1;

	public config: any = {};

	public estudiantes_const: Array<any> = [];
	public load_data = false;
	public token = localStorage.getItem('token');

	public filtro_estudiante = '';
	public estudiantes: Array<any> = [];
	public pageEstudiante = 1;
	public pageSizeEstudiante = 10;
	public load_estudiantes = false;

	public direcciones: Array<any> = [];
	public pageDireccion = 1;
	public pageSizeDireccion = 10;
	public load_direcciones = false;
	public direccion_select: any = {};

	public documento: Array<any> = [];
	public auxabono: Array<any> = [];
	public documento_const: Array<any> = [];
	public pageVariedad = 1;
	public pageSizeVariedad = 10;
	public load_documento = false;
	public documento_select: any = undefined;
	public mes: any;

	public fecha: Array<any> = [];

	public fecha2: Array<any> = [];
	public auxmes: any;
	public auxmes1: any;
	public auxmes2: any;
	public auxmes3: any;
	public auxmes4: any;
	public auxmes5: any;
	public auxmes6: any;
	public auxmes7: any;
	public auxmes8: any;
	public auxmes9: any;
	public auxmes10: any;
	public idpension: any = 0;

	public auxvalordeposito = 0;
	public checkfecha: any;

	public valor: number = 1;

	public valorigualdocumento: number = 0;
	public indexpen = -1;

	public pago: any = {};
	public auxpago: any = {};
	public pension: any = {};

	public dpago: Array<any> = [];

	public total_pagar = 0;
	public auxtotalpago: any = 0.0;
	public envio_input = 0;
	public neto_pagar = 0;
	public filtro_documento = '';
	public descuento = 0;
	public yo = 0;
	public btnnuevodocumento = document.getElementById('btnnuevodocumento');
	selec_est: any;
	anio_lentivo: any;
	constructor(
		private _adminService: AdminService,
		private _estudianteService: EstudianteService,
		private _router: Router
	) {}

	ngOnInit(): void {
		let aux = localStorage.getItem('identity');
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			//console.log(response);
			this.rol = response.data.rol;
			if (response.data.email == 'samuel.arevalo@espoch.edu.ec') {
				this.yo = 1;
			}
			//////console.log(this.yo);
		});
		$('#btnbuscardocumento').attr('disabled', true);
		$('#btnnuevodocumento').attr('disabled', true);
		$('#btnAgregar').attr('disabled', true);
		this.init_estudiante();
		this.init_documentos();
		this._adminService.obtener_config_admin(this.token).subscribe((response) => {
			//console.log(response);
			this.config = response.data[0];
			this.num_pagos = this.config.numpension;
			this.valores_pensiones = parseFloat(this.config.pension.toFixed(2));
			this.aux_valor_pension = parseFloat(this.config.pension.toFixed(2));
			this.valor_matricula = parseFloat(this.config.matricula.toFixed(2));
			this.mes = this.config.anio_lectivo;

			//console.log(this.mes);

			this.auxmes = this.config.anio_lectivo;
		});
	}

	init_estudiante() {
		this.load_estudiantes = true;
		this._adminService.listar_estudiantes_tienda(this.token).subscribe(
			(response) => {
				//console.log(response);
				this.estudiantes = response.data;
				this.estudiantes_const = this.estudiantes;
				this.load_estudiantes = false;
			},
			(error) => {
				////////console.log(error);
			}
		);
	}

	func_filtro_estudiante() {
		if (this.filtro_estudiante) {
			var term = new RegExp(this.filtro_estudiante.toString().trim(), 'i');
			this.estudiantes = this.estudiantes_const.filter(
				(item) =>
					term.test(item.nombres) ||
					term.test(item.nombres + ' ' + item.apellidos) ||
					term.test(item.apellidos) ||
					term.test(item.email) ||
					term.test(item.dni)
			);
		} else {
			this.estudiantes = this.estudiantes_const;
		}
	}

	func_filtro_documento() {
		if (this.filtro_documento) {
			var term = new RegExp(this.filtro_documento.toString().trim(), 'i');
			this.documento = this.documento_const.filter((item) => term.test(item.documento));
		} else {
			this.documento = this.documento_const;
		}
	}

	select_estudiante(item: any) {
		this.idpension = false;
		this.pago.estudiante = item._id;
		this.selec_est = item;
		//this.fecha2=[];
		this._estudianteService.obtener_pension_estudiante_guest(item._id, this.token).subscribe((response) => {
			//console.log(response);
			this.pension = Object.assign(response.data);
			//console.log(this.pension);
			$('#modalEstudiante').modal('hide');
			$('#input-estudiante').val(item.nombres + ' ' + item.apellidos);

			$('#btnbuscardocumento').attr('disabled', false);
			$('#btnnuevodocumento').attr('disabled', false);
		});
	}
public idp=-1
public arr_rubro=[];
public arr_rubro_const=[];
	selecct_pension(){
		this.arr_rubro=[];
		var i=this.idp;
		//console.log("I",i);
		//console.log(this.pension[i]);
		if (this.pension[i].meses < 9 || (this.pension[i].matricula != 1 && this.pension[i].paga_mat == 0)||((this.pension[i].extrapagos==undefined&&this.pension[i].idanio_lectivo.extrapagos!=undefined)||(JSON.parse(this.pension[i].idanio_lectivo.extrapagos).length!=JSON.parse(this.pension[i].extrapagos).length))) {
			if(this.pension[i].idanio_lectivo.extrapagos){

				//console.log(this.pension[i].idanio_lectivo.extrapagos)
				//console.log(JSON.parse(this.pension[i].idanio_lectivo.extrapagos));
				//console.log(this.pension[i].extrapagos);
				//this.pension[i].extrapagos=this.pension[i].idanio_lectivo.extrapagos
				this.arr_rubro_const=JSON.parse(this.pension[i].idanio_lectivo.extrapagos);
				this.arr_rubro=JSON.parse(this.pension[i].idanio_lectivo.extrapagos);
				if(this.pension[i].extrapagos){
					var auxrubro=JSON.parse(this.pension[i].extrapagos);
					//console.log(auxrubro);
					auxrubro.forEach((item:any) => {
						//console.log(item);
						this.arr_rubro.forEach((element,key) => {
							//console.log(element.idrubro==item.idrubro);
							if(element.idrubro==item.idrubro){
								this.arr_rubro.splice(key,1);
								this.arr_rubro_const.splice(key,1);
							}
						});
					});
					
				}
				//console.log(this.arr_rubro );
			}

			this.valores_pensiones = this.aux_valor_pension;
			this.idpension = this.pension[i]._id;
			this.matricula_pago = this.pension[i].matricula;
			this.num_pagado = this.pension[i].meses;
			this.tok = this.num_pagado;
			this.auxmes = this.pension[i].anio_lectivo;
			this.indexpen = i;
			this.anio_lentivo = this.pension[i].idanio_lectivo;
			this.config = this.pension[i].idanio_lectivo;
			this.num_pagos = this.pension[i].idanio_lectivo.numpension;
			//this.valores_pensiones = parseFloat(this.pension[i].idanio_lectivo.pension.toFixed(2));
			this.aux_valor_pension = parseFloat(this.pension[i].idanio_lectivo.pension.toFixed(2));
			this.valor_matricula = parseFloat(this.pension[i].idanio_lectivo.matricula.toFixed(2));

			this.num_pagos = this.pension[i].idanio_lectivo.numpension;
			this.valores_pensiones = parseFloat(this.pension[i].idanio_lectivo.pension.toFixed(2));
			this.valor_matricula = parseFloat(this.pension[i].idanio_lectivo.matricula.toFixed(2));
			this.mes = this.pension[i].idanio_lectivo.anio_lectivo;
			this.auxmes = this.pension[i].idanio_lectivo.anio_lectivo;

			if (this.pension[i].condicion_beca == 'Si') {
				this.valores_pensiones = this.pension[i].val_beca;
				this.meses_beca = this.pension[i].num_mes_res;
				//i = this.pension.length;
			}
			this.fecha2 = [];
			for (let j = 0; j < 10; j++) {
				this.fecha2.push({
					date: new Date(this.pension[i].anio_lectivo).setMonth(
						new Date(this.pension[i].anio_lectivo).getMonth() + j
					),
				});
			}
			//console.log(this.fecha2);
			this.actualizar_valor();
			if (this.fecha.length > 0) {
				i = -1;
			}


			
		}
		if (this.idpension == false) {
			iziToast.show({
				title: 'ERROR',
				titleColor: '#FF0000',
				color: '#FFF',
				class: 'text-danger',
				position: 'topRight',
				message: 'Este estudiante no tiene más pagos por cobrar',
			});
			this.pago.estudiante = '';
		}
	}
	actualizar_valor() {
		////console.log(this.pension);

		this._adminService
			.obtener_detalles_ordenes_estudiante_abono(this.idpension, this.token)
			.subscribe((response) => {
				//console.log(response);
				this.fecha = [];
				var becas = response?.becas;
				var auxmeses;
				if (
					this.selec_est.f_desac != undefined &&
					this.selec_est.estado == 'Desactivado' &&
					this.selec_est.anio_desac == this.pension[this.indexpen].anio_lectivo
				) {
					let mes =
						(new Date(this.selec_est.f_desac).getFullYear() -
							new Date(this.pension[this.indexpen].anio_lectivo).getFullYear()) *
						12;
					mes -= new Date(this.pension[this.indexpen].anio_lectivo).getMonth();
					mes += new Date(this.selec_est.f_desac).getMonth();
					if (mes > 10) {
						auxmeses = 10;
					} else {
						auxmeses = mes + 1;
					}
				} else {
					auxmeses = 10;
				}
				for (let j = 0; j < auxmeses; j++) {
					this.fecha.push({
						date: new Date(this.pension[this.indexpen].anio_lectivo).setMonth(
							new Date(this.pension[this.indexpen].anio_lectivo).getMonth() + j
						),
						beca: 0,
					});
				}
				//console.log(this.fecha2);
				if (becas != undefined) {
					becas.forEach((element: any) => {
						this.fecha.find((elme) => {
							if (new Date(elme.date).getTime() == new Date(element.titulo).getTime()) {
								elme.beca = 1;
							}
						});
						this.fecha2.find((elme1) => {
							if (new Date(elme1.date).getTime() == new Date(element.titulo).getTime()) {
								elme1.beca = 1;
							}
						});
					});
				}

				if (
					new Date(this.pension[this.indexpen].anio_lectivo).getFullYear() ==
					new Date().getFullYear()
				) {
					this.checkfecha = true;
				} else {
					this.checkfecha = false;
				}

				if (response.abonos != undefined) {
					////console.log(response.abonos);
					let data = response.abonos;
					for (var a of data) {
						let auxa = a.estado;
						////////console.log('Auxiliar A',auxa,'Tipo:',a.tipo);
						if (this.fecha[a.tipo - 1]&&auxa == 'Pago atrasado' || auxa == 'Pago a tiempo' || auxa == 'Pago anticipado') {
							this.fecha[a.tipo - 1] = '';
						}
					}
				}
				////console.log(this.dpago);
				for (var y of this.dpago) {
					var axu = y.estado;
					var aux1 = axu.includes('Abono');
					if (aux1 == false&&this.fecha[y.tipo - 1]) {
						this.fecha[y.tipo - 1] = '';
					}
				}
				//////console.log(this.fecha);
				if (this.selec_est.estado == 'Desactivado') {
					var con = 0;
					this.fecha.forEach((element) => {
						if (element != '') {
							con++;
						}
					});
					//////console.log(con);
					if (con == 1) {
						/*
						iziToast.show({
							title: 'ERROR',
							titleColor: '#FF0000',
							color: '#FFF',
							class: 'text-danger',
							position: 'topRight',
							message: 'Este estudiante no tiene más pagos por cobrar',
						});*/
						if (this.dpago.length == 0) {
							this.pago.estudiante = '';
						}
					}
				}
				//console.log("FECHAS: ",this.fecha);
			});
	}

	registro(registroForm: any) {
		if (registroForm.valid) {
			this.load_btn = true;
			this.documentocreate.valor = parseFloat(this.documentocreate.valor);
			this._adminService.registro_documento_admin(this.documentocreate, this.token).subscribe(
				(response) => {
					//console.log(response);
					if (response.data == undefined) {
						iziToast.show({
							title: 'ERROR',
							titleColor: '#FF0000',
							color: '#FFF',
							class: 'text-danger',
							position: 'topRight',
							message: response.message,
						});
						this.load_btn = false;
					} else {
						let auxdocumento = response.data;
						iziToast.show({
							title: 'SUCCESS',
							titleColor: '#1DC74C',
							color: '#FFF',
							class: 'text-success',
							position: 'topRight',
							message: 'Se registro correctamente el nuevo documento.',
						});
						this.documentocreate = [];
						this.load_btn = false;

						this.documento_select = auxdocumento;
						////////console.log(this.documento_select);
						this.auxvalordeposito = this.documento_select.valor;
						this.init_documentos();

						$('#modalNuevoDocumento').modal('hide');
						$('#input-documento').val(auxdocumento.documento);

						$('#btnbuscardocumento').attr('disabled', false);
						$('#btnnuevodocumento').attr('disabled', false);
						$('#btnAgregar').attr('disabled', false);
					}
				},
				(error) => {
					this.load_btn = false;
				}
			);

			this.load_btn = false;
		} else {
			iziToast.show({
				title: 'ERROR',
				titleColor: '#FF0000',
				color: '#FFF',
				class: 'text-danger',
				position: 'topRight',
				message: 'Los datos del formulario no son validos',
			});
			this.load_btn = false;
		}
	}

	init_documentos() {
		this.load_documento = true;
		this._adminService.listar_documentos_admin(this.token).subscribe(
			(response) => {
				//console.log(response);
				this.documento = response.data;
				this.documento_const = this.documento;
				this.load_documento = false;
			},
			(error) => {
				////////console.log(error);
			}
		);
	}

	select_documento(item: any) {
		this.documento_select = item;
		////////console.log(this.documento_select);
		this.auxvalordeposito = this.documento_select.valor;
		$('#modalDocumento').modal('hide');
		$('#input-documento').val(item.documento);
		$('#btnbuscardocumento').attr('disabled', false);
		$('#btnnuevodocumento').attr('disabled', false);
		$('#btnAgregar').attr('disabled', false);
	}

	addDocumento() {
		this.valor = 0;
		this.valorigualdocumento = 0;

		if (this.documento_select != undefined) {
			this.tipo = parseFloat(this.tipo.toString());

			if (this.tipo == 0) {
				this.valor = this.valor_matricula;

				this.addDocumento2(this.valor_matricula);
			} else {
				if (this.tipo > 0 && this.tipo <= 10) {
					this.actualizar_valor();
					//console.log("Pago auxiliar",this.aux_valor_pension);
					//console.log("Pago Valor Pension",this.valores_pensiones);
					//console.log("Año lectivo",this.anio_lentivo);
					////console.log("Mes",new Date(this.fecha[this.tipo].date).getMonth(),"Es igual ",new Date(new Date(this.fecha[this.tipo-1].date).setMonth(12)).getMonth(), "Tiene:",this.meses_beca);
					if (this.anio_lentivo.mescompleto!=null&&
						new Date(this.fecha[this.tipo - 1].date).getMonth() ==
						new Date(this.anio_lentivo.mescompleto).getMonth()
					) {
						//console.log("Beca:",this.fecha[this.tipo-1].beca==1);
						this.valor = this.aux_valor_pension;
						////////console.log(this.aux_valor_pension);
						////////console.log(this.valores_pensiones);
						this.addDocumento2(this.aux_valor_pension);
					} else {
						//console.log("Beca:",this.fecha[this.tipo-1].beca==1);
						if (this.fecha[this.tipo - 1].beca == 1) {
							this.valor = this.valores_pensiones;

							this.addDocumento2(this.valores_pensiones);
						} else {
							this.valor = this.aux_valor_pension;

							this.addDocumento2(this.aux_valor_pension);
						}
						/*
						if (this.meses_beca > 0) {
							this.valor = this.valores_pensiones;

							this.addDocumento2(this.valores_pensiones);
						} else {
							this.valor = this.aux_valor_pension;

							this.addDocumento2(this.aux_valor_pension);
						}*/
					}
				} else {
					this.actualizar();
					if(this.arr_rubro.find(element=>element.idrubro==this.tipo)!=undefined){
						var auxpago=this.arr_rubro.find(element=>element.idrubro==this.tipo);
						this.valor=auxpago.valor;
						this.addDocumento2(auxpago.valor);
					}else{
						iziToast.show({
							title: 'ERROR',
							titleColor: '#FF0000',
							color: '#FFF',
							class: 'text-danger',
							position: 'topRight',
							message: 'Error no selecciono valor',
						});
					}
					
					
				}
			}
		} else {
			iziToast.show({
				title: 'ERROR',
				titleColor: '#FF0000',
				color: '#FFF',
				class: 'text-danger',
				position: 'topRight',
				message: 'Seleccione el documento',
			});
		}
	}
	actualizar() {
		this.valorigualdocumento = 0;
		this.dpago.forEach((element: any) => {
			if (this.documento_select.documento == element.titulo_documento) {
				this.valorigualdocumento = parseFloat(element.valor) + this.valorigualdocumento;
			}
		});
	}

	addDocumento2(debe: any) {
		let ab = 0;
		let est = 'NaN';
		//console.log(this.valor);
		if (this.valor >= 0.001) {
			this.actualizar();

			//console.log("VALOR:",this.valor);
			//console.log("VALOR DE DOCUMENTO",this.valorigualdocumento);
			//console.log("VALOR DE DOCUMETNO SELECCIONADO",parseFloat(this.documento_select.valor));
			if (parseFloat((parseFloat(this.documento_select.valor) - this.valorigualdocumento).toFixed(2)) > 0) {
				this._adminService
					.obtener_detalles_ordenes_estudiante_abono(this.idpension, this.token)
					.subscribe((response) => {
						//console.log(response);
						//console.log(this.checkfecha);
						if (this.checkfecha) {
							////console.log(this.num_pagado);

							////console.log(this.num_pagos);
							//console.log(this.tipo >= this.num_pagos-1,this.tipo,this.num_pagos-1);
							if ( this.tipo < this.num_pagos&&this.tipo!=0) {
								est = 'Pago atrasado';
							} else {
								if (this.tipo == this.num_pagos&&this.tipo!=0) {
									est = 'Pago a tiempo';
								} else if(this.tipo!=0 && this.arr_rubro.find(element=>element.idrubro==this.tipo)==undefined){
									est = 'Pago anticipado';
								}else if(this.tipo==0 && this.tipo >= this.num_pagos-1){
									est = 'Pago a tiempo';
								}else if(this.arr_rubro.find(element=>element.idrubro==this.tipo)!=undefined){
									est = '';
								}else{
									est = 'Pago atrasado';
								}
							}
						} else {
							est = 'Pago atrasado';
						}
						//console.log(est);
						this.auxabono = response.abonos;
						////////console.log(this.auxabono);
						let auxb = 0;
						if (this.auxabono != undefined) {
							for (var x of this.auxabono) {
								if (x.tipo == this.tipo) {
									auxb = x.valor + auxb;
								}
							}
						}

						let auxc = 0;
						for (var y of this.dpago) {
							if (y.tipo == this.tipo) {
								auxc = auxc + y.valor;
							}
						}

						////////console.log('Auxb',auxb,'Auxc',auxc,'Debe',debe,(debe-(auxb+auxc)));
						if (
							parseFloat((parseFloat(this.documento_select.valor) - this.valorigualdocumento).toFixed(2)) >
								0 &&
							debe - (auxb + auxc) > 0
						) {
							////console.log("1",debe - (auxb + auxc));
							////console.log("2",parseFloat((parseFloat(this.documento_select.valor) - this.valorigualdocumento).toFixed(2)));
							if (
								debe - (auxb + auxc) <=
								parseFloat((parseFloat(this.documento_select.valor) - this.valorigualdocumento).toFixed(2))
							) {
								this.valor = parseFloat((debe - (auxb + auxc)).toFixed(2));

								if (this.valor != debe) {
									iziToast.info({
										title: 'INFO',
										class: 'text-info',
										position: 'topRight',
										message: 'Tenía un abono dado',
									});
								}
							} else {
								iziToast.info({
									title: 'INFO',

									class: 'text-info',
									position: 'topRight',
									message: 'Se da como abono',
								});
								est = est + ' ' + 'Abono';
								ab = 1;

								this.valor = parseFloat(
									(parseFloat(this.documento_select.valor) - this.valorigualdocumento).toFixed(2)
								);
								$('#btnbuscardocumento').attr('disabled', true);
								$('#btnnuevodocumento').attr('disabled', true);
								$('#btnAgregar').attr('disabled', true);
							}
						}
						$('#btnBuscarEstudiante').attr('disabled', true);
						////////console.log(this.valor);

						this.valor = parseFloat(this.valor.toFixed(2));
						let descripcion='';
						if(this.tipo>=0&&this.tipo<11){

						}else{
							var rubro = this.arr_rubro.find(element=>element.idrubro==this.tipo);
							//console.log(rubro);
							descripcion=rubro.descripcion;
							this.arr_rubro.forEach((element,key) => {
								if(rubro.idrubro==element.idrubro){
									this.arr_rubro.splice(key,1);
								}
							});
							
						}
						this.dpago.push({
							idpension: this.idpension,
							documento: this.documento_select._id,
							titulo_documento: this.documento_select.documento,
							descripcion:descripcion,
							valor: this.valor,
							tipo: this.tipo,
							estado: est,
							abono: ab,
						});
						//console.log(this.dpago);
						this.actualizar_valor();
						//$("#btnbuscardocumento").attr("disabled", false);
						//$("#btnnuevodocumento").attr("disabled", false);
						//$("#btnAgregar").attr("disabled", false);
						//$("#btnBuscarEstudiante").attr("disabled", true);
						this.valorigualdocumento += this.valor;

						if (this.meses_beca > 0 && this.tipo != 0) {
							this.meses_beca = this.meses_beca - 1;
						} else {
							if (this.tipo == 0) {
								this.matricula_pago = 1;
							}
						}

						this.total_pagar = parseFloat(this.valor.toString()) + parseFloat(this.auxtotalpago.toString());
						this.auxtotalpago = this.total_pagar.toFixed(2);

						if (this.tipo != 0) {
							this.num_pagado = this.num_pagado + 1;
						}
						this.tipo = -1;
					});
			} else {
				iziToast.warning({
					title: 'ERROR',
					class: 'text-info',
					position: 'topRight',
					message: 'Sin fondos',
				});

				this.valorigualdocumento = 0;
				this.dpago.forEach((element: any) => {
					if (this.documento_select.documento == element.titulo_documento) {
						this.valorigualdocumento = parseFloat(element.valor) + this.valorigualdocumento;
					}
				});
			}
		} else {
			iziToast.show({
				title: 'ERROR',
				titleColor: '#FF0000',
				color: '#FFF',
				class: 'text-danger',
				position: 'topRight',
				message: 'Valor no valido',
			});
		}
	}

	quitar(id: any, valor: any, tipo: any) {
		this.dpago.splice(id, 1);
		//console.log(tipo);
		if (tipo == 0) {
			this.matricula_pago = 0;
		} else {
			if (tipo > 0 && tipo <= 10) {
				if (this.meses_beca != -1) {
					this.meses_beca = this.meses_beca + 1;
				}
				this.num_pagado = this.num_pagado - 1;
			}else{
				var aux=this.arr_rubro_const.find(element=>
					
					element.idrubro==tipo);
				//console.log(aux);
				this.arr_rubro.push(aux);
				//console.log(this.arr_rubro);
			}
		}
		this.actualizar_valor();
		$('#btnAgregar').attr('disabled', false);
		$('#btnbuscardocumento').attr('disabled', false);
		$('#btnnuevodocumento').attr('disabled', false);
		if (this.dpago.length == 0) {
			$('#btnBuscarEstudiante').attr('disabled', false);
		}
		this.actualizar();

		this.total_pagar = parseFloat(this.auxtotalpago.toString()) - parseFloat(valor.toString());
		this.auxtotalpago = this.total_pagar.toFixed(2);
	}

	registrar_pago() {
		let aux = localStorage.getItem('identity');
		this._adminService.obtener_admin(aux, this.token).subscribe((response) => {
			//console.log(response);
			this.rol = response.data;
			this.rol.email = undefined;
			//this.rol.password = undefined;
			this.rol.dni = undefined;

			if (this.rol == undefined || this.rol.estado == 'Fuera' || this.rol.estado == 'deshabilitado') {
				iziToast.show({
					title: 'ERROR',
					titleColor: '#FF0000',
					color: '#FFF',
					class: 'text-danger',
					position: 'topRight',
					message: 'No puedes crear pagos',
				});
			} else {
				this.pago.encargado = this.rol;
				this.pago.total_pagar = this.total_pagar;
				this.pago.transaccion = 'PAGOMANUAL';

				this.pago.detalles = this.dpago;

				if (!this.pago.estudiante) {
					iziToast.show({
						title: 'ERROR',
						titleColor: '#FF0000',
						color: '#FFF',
						class: 'text-danger',
						position: 'topRight',
						message: 'Debe seleccionar al estudiante.',
					});
				} else if (this.dpago.length == 0) {
					iziToast.show({
						title: 'ERROR',
						titleColor: '#FF0000',
						color: '#FFF',
						class: 'text-danger',
						position: 'topRight',
						message: 'Debe agregar al menos un documento al pago.',
					});
				} else {
					this.load_btn = true;
					////console.log(this.pago);
					//this.load_btn = false;
					////console.log(this.selec_est);
					this.pago.nombres_factura = this.selec_est.nombres_factura;
					this.pago.dni_factura = this.selec_est.dni_factura;
					this.pago.tipo_producto = 'S';
					this.pago.tipo_tarifa = 0;
					this.pago.config=this.config;

					console.log(this.pago);
					
					this._adminService
						.registro_compra_manual_estudiante(this.pago, this.token)
						.subscribe((response) => {
							console.log(response);
							this.load_btn = false;

							this._router.navigate(['/pagos/' + response.pago._id]);
						});
				}
			}
		});
	}
}
