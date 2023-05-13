import { Component,OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
declare var $: any;
@Component({
  selector: 'app-modal-vincular-encabezado',
  templateUrl: './modal-vincular-encabezado.component.html',
  styleUrls: ['./modal-vincular-encabezado.component.css']
})
export class ModalVincularEncabezadoComponent implements OnInit {
  public proveedores:any={}
  public encabezados:any={}

  constructor(public activeModal: NgbActiveModal) { }
  ngOnInit(): void {
    console.log(this.proveedores);
    console.log(this.encabezados);
  }
  cerrarVentana(){
    console.log('CERRAR');
    this.activeModal.close()
    
  }
  guardar(){
    this.activeModal.close(this.proveedores)
    console.log('GUARDAR');
  }
}
