import { LOCALE_ID, NgModule,NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { routing } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxTinymceModule } from 'ngx-tinymce';

import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/cuenta/registro/registro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { SidebarLogComponent } from './components/cuenta/sidebar-log/sidebar-log.component';

import { IndexEstudiantesComponent } from './components/estudiantes/index-estudiantes/index-estudiantes.component';
import { IndexDocumentoComponent } from './components/documentos/index-documento/index-documento.component';
import { CreateDocumentoComponent } from './components/documentos/create-documento/create-documento.component';
import { EditDocumentoComponent } from './components/documentos/edit-documento/edit-documento.component';

import { ConfigComponent } from './components/config/config.component';
import { IndexPagosComponent } from './components/pagos/index-pagos/index-pagos.component';
import { ShowPagosComponent } from './components/pagos/show-pagos/show-pagos.component';
import { CreatePagosComponent } from './components/pagos/create-pagos/create-pagos.component';

import { EditEstudianteComponent } from './components/estudiantes/edit-estudiante/edit-estudiante.component';
import { DetalleEstudianteComponent } from './components/estudiantes/detalle-estudiante/detalle-estudiante.component';
import { CreateEstudianteComponent } from './components/estudiantes/create-estudiante/create-estudiante.component';

import { CreateAdminComponent } from './components/administrativo/create-administrativo/create-administrativo.component';
import { EditAdminComponent } from './components/administrativo/edit-administrativo/edit-administrativo.component';
import { IndexAdminComponent } from './components/administrativo/index-administrativo/index-administrativo.component';

import { ForgotPasswordComponent } from './components/cuenta/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './components/cuenta/new-password/new-password.component';

//import { FlatfileAdapterModule } from '@flatfile/angular';

import { MatTableExporterModule } from 'mat-table-exporter';
import { MatLegacyTableModule as MatTableModule } from '@angular/material/legacy-table';

import localeES from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeES, 'es');
import { A11yModule } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PortalModule } from '@angular/cdk/portal';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { CdkTableModule } from '@angular/cdk/table';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatLegacyAutocompleteModule as MatAutocompleteModule } from '@angular/material/legacy-autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyCheckboxModule as MatCheckboxModule } from '@angular/material/legacy-checkbox';
import { MatLegacyChipsModule as MatChipsModule } from '@angular/material/legacy-chips';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatLegacyDialogModule as MatDialogModule } from '@angular/material/legacy-dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyInputModule as MatInputModule } from '@angular/material/legacy-input';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatLegacyPaginatorModule as MatPaginatorModule } from '@angular/material/legacy-paginator';
import { MatLegacyProgressBarModule as MatProgressBarModule } from '@angular/material/legacy-progress-bar';
import { MatLegacyProgressSpinnerModule as MatProgressSpinnerModule } from '@angular/material/legacy-progress-spinner';
import { MatLegacyRadioModule as MatRadioModule } from '@angular/material/legacy-radio';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatLegacySliderModule as MatSliderModule } from '@angular/material/legacy-slider';
import { MatLegacySlideToggleModule as MatSlideToggleModule } from '@angular/material/legacy-slide-toggle';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatLegacyTabsModule as MatTabsModule } from '@angular/material/legacy-tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { NgxFileDropModule } from 'ngx-file-drop';
import './polyfills';

//mport {HttpClientModule} from '@angular/common/http';
//import {NgModule} from '@angular/core';
//import {FormsModule, ReactiveFormsModule} from '@angular/forms';
//import {MatNativeDateModule} from '@angular/material/core';
//import {BrowserModule} from '@angular/platform-browser';
//import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ControlComponent } from './components/cuenta/control/control.component';
import { EgresosComponent } from './components/egresos/egresos.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';

//import {TableBasicExample} from './app/components/dashboard/dashboard.component';

@NgModule({
	exports: [
		A11yModule,
		CdkStepperModule,
		CdkTableModule,
		CdkTreeModule,
		DragDropModule,
		MatAutocompleteModule,
		MatBadgeModule,
		MatBottomSheetModule,
		MatButtonModule,
		MatButtonToggleModule,
		MatCardModule,
		MatCheckboxModule,
		MatChipsModule,
		MatStepperModule,
		MatDatepickerModule,
		MatDialogModule,
		MatDividerModule,
		MatExpansionModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatMenuModule,
		MatNativeDateModule,
		MatPaginatorModule,
		MatProgressBarModule,
		MatProgressSpinnerModule,
		MatRadioModule,
		MatRippleModule,
		MatSelectModule,
		MatSidenavModule,
		MatSliderModule,
		MatSlideToggleModule,
		MatSnackBarModule,
		MatSortModule,
		MatTableModule,
		MatTabsModule,
		MatToolbarModule,
		MatTooltipModule,
		MatTreeModule,
		PortalModule,
		ScrollingModule,
		BrowserAnimationsModule,
	],
	declarations: [
		AppComponent,
		LoginComponent,
		RegistroComponent,
		DashboardComponent,
		SidebarComponent,
		SidebarLogComponent,
		TopnavComponent,
		IndexEstudiantesComponent,
		IndexDocumentoComponent,
		CreateDocumentoComponent,
		EditDocumentoComponent,
		CreateAdminComponent,
		EditAdminComponent,
		IndexAdminComponent,
		ConfigComponent,
		IndexPagosComponent,
		ShowPagosComponent,
		CreatePagosComponent,
		EditEstudianteComponent,
		DetalleEstudianteComponent,
		CreateEstudianteComponent,
		ForgotPasswordComponent,
		NewPasswordComponent,
		ControlComponent,
		EgresosComponent,
		ProveedoresComponent,
	],

	imports: [
		NgbModule,
		CommonModule,
		NgxFileDropModule,
		BrowserModule,
		AppRoutingModule,
		routing,
		FormsModule,
		HttpClientModule,
		NgbPaginationModule,
		MatTableModule,
		MatTableExporterModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		MatNativeDateModule,
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		HttpClientModule,

		MatNativeDateModule,
		ReactiveFormsModule,

		NgxTinymceModule.forRoot({
			//baseURL: '../../../assets/tinymce/',
			baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/5.7.1/',
		}),
	],schemas: [NO_ERRORS_SCHEMA],
	providers: [{ provide: LOCALE_ID, useValue: 'es' }],
	bootstrap: [AppComponent],
})
export class AppModule {}
