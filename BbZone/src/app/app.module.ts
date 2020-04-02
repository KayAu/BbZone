import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { Home } from './pages/home/home';
import { CreateOrder } from './pages/create-order/create-order';
import { PageHeader } from './components/page-header';
import { ViewOrder } from "./pages/view-order/view-order";
import { AgentCommissionTable } from "./components/agent-commission-table/agent-commission-table";
import { DataService } from './services/data.service';
import { LoaderService } from './loader/loader.service';
import { BroadcastService } from './services/broadcast.service';
import { CascadeService } from './services/cascade.service';
import { Pagination } from './components/pagination/pagination';
import { SortCellDirective } from './directives/sort-cell.directive';
import { SortableDirective } from './directives/sortable.directive';
import { APP_BASE_HREF } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';
import { EditOrder } from './pages/edit-order/edit-order';
import { AgentComission } from './pages/agent-comission/agent-comission';
import { ViewCommission } from './pages/view-commission/view-commission';
import { ViewWithdrawal } from './pages/view-withdrawal/view-withdrawal';
import { ManageProduct } from './pages/manage-product/manage-product';
import { ManagePackage } from './pages/manage-packages/manage-packages';
import { ManageCategory } from './pages/manage-category/manage-category';
import { AgentRegistration } from './pages/agent-registration/agent-registration';
import { AgentRegistrationView } from './pages/agent-registration-view/agent-registration-view';
import { AgentRegistrationList } from './pages/agent-registration-list/agent-registration-list';
import { AgentProfile } from './pages/agent-profile/agent-profile';
import { AgentMaintenance } from './pages/agent-maintenance/agent-maintenance';
import { TableRowButtons } from './components/tablerow-buttons/tablerow-buttons';
import { EditModeDirective } from './directives/editmode-directive';
import { EditableDropdown } from './components/editable-dropdown/editable-dropdown';
import { DropdownAction } from './components/dropdown-action/dropdown-action';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { DataControl } from './components/data-control/data-control';
import { DataField } from './components/data-field/data-field';
import { LoaderComponent } from './components/loader/loader';
import { LoaderInterceptor } from './loader/loader.interceptor';
import { ProductOptions } from './components/product-options/product-options';
import { FileUploader } from './components/file-uploader/file-uploader';
import { ToastrModule } from 'ngx-toastr';
import { Login } from './pages/login/login';
import { UserAuthGuard } from './guard/user-auth.guard';
import { UserIdleModule } from 'angular-user-idle';
import { BackButton } from './components/back-button/back-button'
import { EnumToArrayPipe } from './pipes/enum-to-array';
import { SuperiorField } from './components/superior-field/superior-field';
import { MultipleCheckboxes } from './components/multiple-checkbox/multiple-checkbox';
import { Gridview } from './components/gridview/gridview';
import { TeamSubmission } from './components/dashboard/team-submission/team-submission';
import { CreateAnnouncement } from './pages/create-announcement/create-announcement';
import { EditAnnouncement } from './pages/edit-announcement/edit-announcement';
import { ViewAnnouncement } from './pages/view-announcement/view-announcement';
import { Announcement } from './components/announcement/announcement';
import { UserCommunication } from './components/user-communication/user-communication';
import { LessThanValidator } from './directives/less-than-validator.directive';
import { SubmissionStatusCount } from './components/dashboard/submission-status-count/submission-status-count';
import { MonthlyApplicationDashboard } from './components/dashboard/monthly-applications/monthly-applications';
import { CreateWithdrawal } from './pages/create-withdrawal/create-withdrawal';
import { EditWithdrawal } from './pages/edit-withdrawal/edit-withdrawal';
import { AgentChanges } from './pages/agent-charges/agent-charges';
import { CustomerFinder } from './components/customer-finder/customer-finder';
import { ManageClawback } from './pages/manage-clawback/manage-clawback';
import { UploadIncentives } from './pages/upload-incentives/upload-incentives';
import { ViewIncentives } from './pages/view-incentives/view-incentives';
import { AdminAccess } from './pages/admin-access/admin-access';
import { ManageLoginBanner } from './pages/manage-login-banner/manage-login-banner';
import { Role } from './enums/role';

@NgModule({
  declarations: [
        AppComponent,
        NavMenuComponent,
        Home,
        CreateOrder,
        PageHeader,
        ViewOrder,
        AgentCommissionTable,
        Pagination,
        SortCellDirective,
        SortableDirective,
        EditOrder,
        AgentComission,
        ViewCommission,
        ViewWithdrawal,
        ManageProduct,
        ManagePackage,
        ManageCategory,
        AgentRegistration,
        AgentRegistrationView,
        AgentRegistrationList,
        AgentProfile,
        AgentMaintenance,
        TableRowButtons,
        EditModeDirective,
        EditableDropdown,
        DropdownAction,
        DataControl,
        DataField,
        LoaderComponent,
        ProductOptions,
        FileUploader,
        Login,
        BackButton,
        EnumToArrayPipe,
        SuperiorField,
        MultipleCheckboxes,
        Gridview,
        TeamSubmission,
        CreateAnnouncement,
        EditAnnouncement,
        ViewAnnouncement,
        Announcement,
        UserCommunication,
        LessThanValidator,
        SubmissionStatusCount,
        CreateWithdrawal,
        EditWithdrawal,
        AgentChanges,
        CustomerFinder,
        ManageClawback,
        UploadIncentives,
        ViewIncentives,
        AdminAccess,
        MonthlyApplicationDashboard,
        ManageLoginBanner
  ],
    imports: [
        BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        BrowserAnimationsModule,
        NgxDaterangepickerMd.forRoot(),
        UserIdleModule.forRoot({ idle: 1200, timeout: 60, ping: 60 }),
        ToastrModule.forRoot({
            maxOpened: 1,
            preventDuplicates: true,
        }),
        RouterModule.forRoot([
            { path: '', component: Login }, 
            { path: 'home', component: Home, pathMatch: 'full', canActivate: [UserAuthGuard]},
            { path: 'create-order', component: CreateOrder },
            { path: 'view-order', component: ViewOrder },
            { path: 'edit-order/:id', component: EditOrder },
            { path: 'agent-comission', component: AgentComission },
            { path: 'view-commission', component: ViewCommission },
            { path: 'view-withdrawal', component: ViewWithdrawal },
            { path: 'manage-product', component: ManageProduct, canActivate: [UserAuthGuard], data: { roles: [Role.Admin, Role.SuperAdmin] }},
            { path: 'manage-packages', component: ManagePackage, canActivate: [UserAuthGuard], data: { roles: [Role.Admin, Role.SuperAdmin] }},
            { path: 'manage-category', component: ManageCategory, canActivate: [UserAuthGuard], data: { roles: [Role.Admin, Role.SuperAdmin] }},
            { path: 'agent-registration', component: AgentRegistration},
            { path: 'agent-registration-view/:id', component: AgentRegistrationView, canActivate: [UserAuthGuard], data: { roles: [Role.Admin, Role.SuperAdmin] }},
            { path: 'agent-registration-list', component: AgentRegistrationList, canActivate: [UserAuthGuard], data: { roles: [Role.Admin, Role.SuperAdmin] }},
            { path: 'agent-profile/:id', component: AgentProfile },
            { path: 'agent-maintenance', component: AgentMaintenance, canActivate: [UserAuthGuard], data: { roles: [Role.Admin, Role.SuperAdmin] }},
            { path: 'create-announcement', component: CreateAnnouncement, canActivate: [UserAuthGuard], data: { roles: [Role.Admin, Role.SuperAdmin] }},
            { path: 'edit-announcement/:id', component: EditAnnouncement, canActivate: [UserAuthGuard], data: { roles: [Role.Admin, Role.SuperAdmin] }},
            { path: 'view-announcement', component: ViewAnnouncement },
            { path: 'create-withdrawal', component: CreateWithdrawal },
            { path: 'edit-withdrawal/:id', component: EditWithdrawal },
            { path: 'agent-charges', component: AgentChanges, canActivate: [UserAuthGuard], data: { roles: [Role.Admin, Role.SuperAdmin] }},
            { path: 'manage-clawback', component: ManageClawback, canActivate: [UserAuthGuard], data: { roles: [Role.Admin, Role.SuperAdmin] }},
            { path: 'upload-incentives', component: UploadIncentives, canActivate: [UserAuthGuard], data: { roles: [Role.Admin, Role.SuperAdmin] }},
            { path: 'view-incentives', component: ViewIncentives, canActivate: [UserAuthGuard], data: { roles: [Role.Admin, Role.SuperAdmin] }},
            { path: 'admin-access', component: AdminAccess, canActivate: [UserAuthGuard], data: { roles: [ Role.SuperAdmin] } },
            { path: 'manage-login-banner', component: ManageLoginBanner, canActivate: [UserAuthGuard], data: { roles: [Role.Admin, Role.SuperAdmin] }},
    ])
  ],
  providers: [
    DataService,
    BroadcastService,
    CascadeService,
    LoaderService,
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptor,
        multi: true
    },
    { provide: APP_BASE_HREF, useValue: '/' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 
}
