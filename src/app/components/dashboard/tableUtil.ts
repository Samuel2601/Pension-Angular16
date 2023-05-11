export class TableUtil {
	static exportToPdf(
		tableId: string,
		name: string,
		tipo: string,
		direc: string,
		del: string,
		admin: string,
		fecha: string,
		imagen: string,
    admtitulo:string,
    genero:{}
	) {
		let printContents, popupWin;
		printContents = document.getElementById(tableId).innerHTML;
		popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
		popupWin.document.open();
		popupWin.document.write(
			`
    <html>
      <head>
        <title>` +
				tipo +
				` ` +
				name +
				`(` +
				fecha +
				`)</title>
       <style>
      
      td {
        border:  1px solid;
      }
      tr {
        border:  1px solid;
      }
      th {
        border:  1px solid;
      }
      thead.th {
        border:  1px solid;
      }
       </style>
      </head>
        <body onload="window.print();window.close()">
        <div style="margin-right: auto;
       margin-left: auto;  >
           <div style="margin-top: 70px; margin-left:5% ;">
           <img _ngcontent-twf-c49="" src=` +
				imagen +
				` alt="..." 
               class="navbar-brand-img mx-auto" style="max-height: 4rem !important;" style="">
           </div>

           <div style="margin-top: -70px ; margin-left:-10%;text-align:center;">
           <h2><b>
           EGB FISCOMISIONAL "CRISTO REY"</b>
           <h4 style=" text-align:center;">
           Dirección: Sucre y 24 de mayo<br>

           Teléfono: 062712968<br>

           Año lectivo ` +
				name +
				`
           </h4>

           </h2>
           
           </div>
          <div>
          <b>` +
				tipo +
				`</b>
         <br>
         <b>Masculino:</b>`+genero[0]+` <b>Femenino:</b>`+genero[1]+` <b>n/a:</b>`+genero[2]+`
          </div>
           <div style="margin-top: -150px; margin-left:80% ;">
           <img _ngcontent-twf-c49="" src="https://i.postimg.cc/ThvxfG15/nuevo-logo-Mineduc.jpg" alt="..." 
               class="navbar-brand-img mx-auto" style="max-height: 4rem !important;" style=""><br>
               <img _ngcontent-twf-c49="" src="https://i.postimg.cc/ZYBybc0J/Politics-of-Ecuador-Guillermo-Lasso-Administration-logo-svg.png" alt="..." 
               class="navbar-brand-img mx-auto" style="max-height: 4rem !important;" style="">
           </div>

           
       </div>
       
     
     
      <table style="border-collapse: collapse;text-align:center; margin-top: 7%;margin-right: auto;
      margin-left: auto; width: 100%;"  class="table table-bordered">
        ${printContents}
       </table>
            
        </body>
        <footer style="margin-top: 25%;margin-right: auto%;margin-left: auto%;">
        <div style="margin-right: auto;margin-left: auto;">
                           <table id="detalleeconomico" class="table table-sm table-nowrap card-table" style="width: 100%" >
                             
                               <thead style="border:0">
                                 <th style="border:0">_______________________</th>
                                 <th style="border:0">&nbsp&nbsp</th>
                                 <th style="border:0">_______________________</th>
                                 <th style="border:0">&nbsp&nbsp</th>
                                 <th style="border:0">  _______________________</th>
                               </thead>
                               <tbody>
                                 <tr style="border:0">
                                   <th style="border:0"><p> ` +
				direc +
				`</p><p>Director(a)</p></th>
                                   <th style="border:0"></th>
                                   <th style="border:0"><p> ` +
				del +
				`</p><p>Delegado del Obispo</p></th>
                                   <th style="border:0"></th>
                                   <th style="border:0"><p> ` +
				admin +
				`</p><p>  ` +admtitulo +`</p></th>
                                 </tr>
                               
                               </tbody>
                            
                           </table>                          
       </div>
 
 
 
       </footer>
    </html>`
		);
		popupWin.document.close();
	}

	static exportToPdftotal(
		tableId: string,
		name: string,
		direc: string,
		del: string,
		admin: string,
		fecha: string,
		imagen: string,
    admtitulo:string,
	) {
		let printContents, popupWin;
		printContents = document.getElementById(tableId).innerHTML;
		//console.log(printContents)
		popupWin = window.open('', '_blank', 'top=0,left=0,height=auto,width=auto');
		popupWin.document.open();
		popupWin.document.write(
			`
   <html>
     <head>
       <title>DETALLE ECONOMICO DE PENSIONES ` +
				name +
				`(` +
				fecha +
				`)</title>
       <style>
      
      td {
        border:  1px solid;
      }
      tr {
        border:  1px solid;
      }
      th {
        border:  1px solid;
      }
      thead.th {
        border:  1px solid;
      }
    
       </style>
     </head>
       <body onload="window.print();window.close()">
       <div style="margin-right: auto;
       margin-left: auto;  >
           <div style="margin-top: 70px; margin-left:5% ;">
           <img _ngcontent-twf-c49="" src=` +
				imagen +
				` width="100" height="100px" alt="..." 
               class="navbar-brand-img mx-auto" style="max-height: 4rem !important;" style="">
           </div>

           <div style="margin-top: -70px ; margin-left:-10%;text-align:center;">
           <h2><b>
           EGB FISCOMISIONAL "CRISTO REY"</b>
           <h4 style=" margin-top: -2% ;text-align:center;">
           Dirección: Sucre y 24 de mayo<br>

           Teléfono: 062712968<br>

           Año lectivo ` +
				name +
				`
           </h4>

           </h2>
           
           </div>

           <div style="margin-top: -120px; margin-left:80% ;">
           <img _ngcontent-twf-c49="" src="https://i.postimg.cc/ThvxfG15/nuevo-logo-Mineduc.jpg" alt="..." 
               class="navbar-brand-img mx-auto" style="max-height: 4rem !important;" style=""><br>
               <img _ngcontent-twf-c49="" src="https://i.postimg.cc/ZYBybc0J/Politics-of-Ecuador-Guillermo-Lasso-Administration-logo-svg.png" alt="..." 
               class="navbar-brand-img mx-auto" style="max-height: 4rem !important;" style="">
           </div>

           
       </div>
      
    
       <div style="border-collapse: collapse;margin-top: 7%;margin-bottom: 50px;" >
       
       ${printContents}
      
       </div>
      
       
           
       </body>
       <footer style="margin-top: 10%;margin-right: auto%;margin-left: auto%;">
       <div style="margin-right: auto;margin-left: auto;">
                          <table id="detalleeconomico" class="table table-sm table-nowrap card-table" style="width: 100%" >
                            
                              <thead style="border:0">
                                <th style="border:0">_______________________</th>
                                <th style="border:0">&nbsp&nbsp</th>
                                <th style="border:0">_______________________</th>
                                <th style="border:0">&nbsp&nbsp</th>
                                <th style="border:0">  _______________________</th>
                              </thead>
                              <tbody>
                                <tr style="border:0">
                                  <th style="border:0"><p> ` +
				direc +
				`</p><p>Director(a)</p></th>
                                  <th style="border:0"></th>
                                  <th style="border:0"><p> ` +
				del +
				`</p><p>Delegado del Obispo</p></th>
                                  <th style="border:0"></th>
                                  <th style="border:0"><p> ` +
                                  admin +
                                  `</p><p>  ` +admtitulo +`</p></th>
                                                           </tr>
                                                         
                                                         </tbody>
                           
                          </table>                          
      </div>



      </footer>
   </html>`
		);
		popupWin.document.close();
	}
}
