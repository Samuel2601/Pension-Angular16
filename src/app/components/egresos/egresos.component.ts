import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
declare var $: any;
declare var iziToast: any;
export interface CuentaContable {
  codigo: string;
  nombre: string;
  subcuentas?: CuentaContable[];
}  
@Component({
  selector: 'app-egresos',
  templateUrl: './egresos.component.html',
  styleUrls: ['./egresos.component.css']
})

export class EgresosComponent implements OnInit {
  
  public egreso:any={}
  public egresos:any={}
  public proveedores:any={}
  public opcion=false;
  public auxnomc='';
  public linea:any={
    codigo: '',
    nombre: ''
  };
  
  constructor(private _adminService: AdminService) { }

  planContable: CuentaContable[] = [
    {
      codigo: '1',
      nombre: 'Activos',
      subcuentas: [
        {
          codigo: '1.1',
          nombre: 'Activos Corrientes',
          subcuentas: [
            { codigo: '1.1.1', nombre: 'Caja' },
            { codigo: '1.1.2', nombre: 'Bancos' },
            { codigo: '1.1.3', nombre: 'Cuentas por Cobrar' }
          ]
        },
        {
          codigo: '1.2',
          nombre: 'Activos No Corrientes',
          subcuentas: [
            { codigo: '1.2.1', nombre: 'Propiedades' },
            { codigo: '1.2.2', nombre: 'Equipos' },
            { codigo: '1.2.3', nombre: 'Inversiones' }
          ]
        }
      ]
    },
    {
      codigo: '2',
      nombre: 'Pasivos',
      subcuentas: [
        {
          codigo: '2.1',
          nombre: 'Pasivos Corrientes',
          subcuentas: [
            { codigo: '2.1.1', nombre: 'Cuentas por Pagar' },
            { codigo: '2.1.2', nombre: 'Préstamos' }
          ]
        },
        {
          codigo: '2.2',
          nombre: 'Pasivos No Corrientes',
          subcuentas: [
            { codigo: '2.2.1', nombre: 'Deudas a Largo Plazo' },
            { codigo: '2.2.2', nombre: 'Obligaciones Financieras' }
          ]
        }
      ]
    },
    {
      codigo: '3',
      nombre: 'Patrimonio',
      subcuentas: [
        { codigo: '3.1', nombre: 'Capital' },
        { codigo: '3.2', nombre: 'Reservas' }
      ]
    },
    {
      codigo: '4',
      nombre: 'Ingresos',
      subcuentas: [
        { codigo: '4.1', nombre: 'Ventas' },
        { codigo: '4.2', nombre: 'Intereses' }
      ]
    },
    {
      codigo: '5',
      nombre: 'Gastos',
      subcuentas: [
        { codigo: '5.1', nombre: 'Gastos Operativos' },
        { codigo: '5.2', nombre: 'Gastos Financieros' }
      ]
    }
  ];

  nuevaCuenta: CuentaContable = {
    codigo: '',
    nombre: ''
  };

  agregarCuenta() {
    if (this.linea.codigo === '') {
      if (this.nuevaCuenta.codigo && this.nuevaCuenta.nombre && this.planContable.find((element:any)=>element.codigo==this.nuevaCuenta.codigo)==undefined) {
        this.planContable.push(this.nuevaCuenta);
        this.nuevaCuenta = { codigo: '', nombre: '', subcuentas: [] };
      }else{
        iziToast.show({
          title: 'ERROR',
          class: 'iziToast-danger',
          position: 'topRight',
          message: 'Ya existe',
        });
        this.nuevaCuenta.codigo='';
      }
    } else {
      const cuentaPadre = this.buscarCuentaPorCodigo(this.linea.codigo, this.planContable);
      if (cuentaPadre ) {
        if(!cuentaPadre.subcuentas || !cuentaPadre.subcuentas.length ){
          cuentaPadre.subcuentas=[];
        }
        console.log(cuentaPadre.subcuentas);
        this.nuevaCuenta.codigo=cuentaPadre.codigo+'.'+(cuentaPadre.subcuentas.length +1).toString()
        cuentaPadre.subcuentas.push(this.nuevaCuenta);
        this.nuevaCuenta = { codigo: '', nombre: '', subcuentas: [] };
      }
    }
  }
  opciones(){
    if(this.opcion){
      this.opcion=false
    }else{
      this.opcion=true;
    }
  }

  buscarCuentaPorCodigo(codigo: string, cuentas: any[]): any {
    for (const cuenta of cuentas) {
      if (cuenta.codigo === codigo) {
        return cuenta;
      } else if (cuenta.subcuentas && cuenta.subcuentas.length > 0) {
        const subcuentaEncontrada = this.buscarCuentaPorCodigo(codigo, cuenta.subcuentas);
        if (subcuentaEncontrada) {
          return subcuentaEncontrada;
        }
      }
    }
    return null;
  }

  pasar(cuenta?:CuentaContable,subcuenta?:CuentaContable){
    this.linea= { codigo: '', nombre: ''};
    if(subcuenta){
      this.linea=subcuenta;
    }else if(cuenta){
      this.linea=cuenta;
    }
    console.log(this.linea);
  }
  mostrareditarCuenta(cuenta: CuentaContable){
    this.auxnomc=cuenta.nombre;
    this.opciones();
    document.getElementById((cuenta.codigo).toString()+'-i').style.display = '';
    document.getElementById((cuenta.codigo).toString()+'-l').style.display = 'none';
    document.getElementById((cuenta.codigo).toString()+'-b').style.display = 'none';
  }
  editarCuenta(cuenta: CuentaContable) {
    this.editarCuentaRecursiva(this.planContable, cuenta);
  }
  
  editarCuentaRecursiva(arr: CuentaContable[], cuenta: CuentaContable) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === cuenta) {
        cuenta.nombre=this.auxnomc;
        arr[i] = cuenta; // Actualizar cuenta actual
        this.opciones();
        document.getElementById((cuenta.codigo).toString()+'-i').style.display = 'none';
        document.getElementById((cuenta.codigo).toString()+'-l').style.display = '';
        document.getElementById((cuenta.codigo).toString()+'-b').style.display = '';
        return;
      }
      if (arr[i].subcuentas) {
        this.editarCuentaRecursiva(arr[i].subcuentas, cuenta); // Llamada recursiva para subcuentas
      }
    }
  }
  descareditarCuenta(cuenta: CuentaContable){
    this.auxnomc='';
    this.opciones();
    document.getElementById((cuenta.codigo).toString()+'-i').style.display = 'none';
        document.getElementById((cuenta.codigo).toString()+'-l').style.display = '';
        document.getElementById((cuenta.codigo).toString()+'-b').style.display = '';
  }
  

  eliminarCuenta(cuenta: CuentaContable) {
    this.planContable = this.eliminarCuentaRecursiva(this.planContable, cuenta);
  }
  
  eliminarCuentaRecursiva(arr: CuentaContable[], cuenta: CuentaContable): CuentaContable[] {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === cuenta) {
        arr.splice(i, 1); // Eliminar cuenta actual
        return arr;
      }
      if (arr[i].subcuentas) {
        arr[i].subcuentas = this.eliminarCuentaRecursiva(arr[i].subcuentas, cuenta); // Llamada recursiva para subcuentas
        if (arr[i].subcuentas.length === 0) {
          delete arr[i].subcuentas; // Eliminar propiedad subcuentas si no quedan subcuentas
        }
      }
    }
    return arr;
  }


  ngOnInit(): void {
    $('#modalPlanContable').modal('show');
  }
  
  guardarEgreso(){
    
  }

}
