import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { NgxFileDropEntry, FileSystemFileEntry } from 'ngx-file-drop';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as XLSX from 'xlsx';
import * as XlsxPopulate from 'xlsx-populate';

import * as Papa from 'papaparse';
import { ModalVincularEncabezadoComponent } from '../modal-vincular-encabezado/modal-vincular-encabezado.component';
declare var $: any;
declare var iziToast: any;
export interface Proveedor {
  id: number;
  nombre: string;
  direccion: string;
  telefono: string;
  email: string;
}
@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css'],
})

export class ProveedoresComponent implements OnInit {
  public proveedor:any={}
  public proveedor_arr: Proveedor[] = [];
  public proveedores: Array<any> = [];
  public proveedores_erro:any=[]
  public encabezados:any={};
  public valid:any=[];
  public page = 1;
	public pageSize:number = 8;
  public selectedPageSize=8;
  public collectionSize=0;
  public token = localStorage.getItem('token');
  constructor(private _adminService: AdminService,private modalService: NgbModal) { 
   
  }

  ngOnInit(): void {
  }
  guardarProveedor(){
    $('#modalGuardar').modal('hide');
    $('#modalEsperar').modal('show');
    this._adminService.agregar_proveedor(this.token,this.proveedores).subscribe(response=>{
      if(response.message){
        $('#modalEsperar').modal('hide');
        iziToast.show({
          title: 'Respuesta',
          titleColor: '#20DE4F',
          color: '#ADE6BB',
          class: 'text-info',
          position: 'topRight',
          message: response.message,
        });

      }
    });
  }

  onPageSizeChange(): void {
    this.pageSize=Number(this.selectedPageSize);
    this.page = 1; // resetea el número de página actual
  }
  abrirVentana(parsedData) {
   // $('#modalAddProvMasivo').modal('hide');
    const modalRef = this.modalService.open(ModalVincularEncabezadoComponent, {container: '#modalAddProvMasivo', backdrop:false ,size: 'xl', centered: true,fullscreen:'lg'});
      const proveedor=[
        {'nombre':'ruc','label':'Cedula',"validacion": /^[0-9]{10}$|^[0-9]{13}$/},
        {'nombre':'nombre','label':'Nombres',"validacion": /^[a-zA-ZñÑ\s]+$/},
        {'nombre':'apellido','label':'Apellidos',"validacion": /^[a-zA-ZñÑ\s]+$/},
        {'nombre':'direccion','label':'Dirección'},
        {"nombre": "telefono","label": "Teléfono","validacion": /^[0-9]+$/},
        {'nombre':'email','label':'Email',"validacion":/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/}]
      
      modalRef.componentInstance.proveedores=proveedor ;
      modalRef.componentInstance.encabezados=this.encabezados;

      modalRef.result.then((result) => {
        this.valid=result;
        //console.log('Modal closed:', this.valid);
        this.valid2(parsedData);
       
      }, (reason) => {
        console.log('Modal dismissed:', reason);
        
      });
  }
  onFileDrop(files: NgxFileDropEntry[]) {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          // Here you can handle the file
          this.validacion(file);
          console.log(file);
        });
      }
    }
  }
 
  validacion(file: File){
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = () => {
      const csvData = reader.result;
      const parsedData = Papa.parse(csvData.toString(), { header: true });
      
      console.log(parsedData);
      this.encabezados=parsedData.meta.fields;
      console.log(this.encabezados)
      this.abrirVentana(parsedData);
      
    };
  }
  valid2(parsedData){
    this.proveedores_erro=[];
    this.proveedores=[];
    parsedData.data.forEach((row:any, index:any) => {
      const proveedor={};
      let save=true;
      for (const key in this.valid) {
        if (Object.prototype.hasOwnProperty.call(this.valid, key)) {   
          const campo = this.valid[key];
          if(row[campo.encabezado]){
            const valor = row[campo.encabezado];
            if (campo.validacion && !campo.validacion.test(valor)) {
              // el valor no cumple con las reglas de validación
              save = false;
              this.proveedores_erro.push(row);
            } else {
              // el valor cumple con las reglas de validación
              proveedor[campo.nombre] = valor;
            }
          } else {
            save=false;
            this.proveedores_erro.push(row);
          }       
        }
      }
      if(save){
        this.proveedores.push(proveedor)
      }
    });
   
    $('#modalAddProvMasivo').modal('hide');
    this.collectionSize=this.proveedores.length;
    if(this.proveedores_erro.length>0){
      $('#modalErrados').modal('show');
    }else{
      $('#modalGuardar').modal('show');
    }
    console.log("Validos",this.proveedores);
    console.log("Erroneos",this.proveedores_erro);
  }
  descargar_correccion(){
    const worksheet = XLSX.utils.json_to_sheet(this.proveedores_erro);
      XLSX.writeFile({ SheetNames: ['Corregir'], Sheets: { 'Corregir': worksheet } }, 'datos.xlsx');
  }
  seleccionarArchivo() {
    document.getElementById('fileInput').click();
  }

  onFileChange(event:any) {
    if (event && event.target && event.target.files) {
      const file = event.target.files[0];
      this.validacion(file);
    }
    
  }
}
