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
import { Gridview } from "./components/gridview/gridview";
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
import { ManageWithdrawal } from './pages/manage-withdrawal/manage-withdrawal';
import { ManageProduct } from './pages/manage-product/manage-product';
import { ManagePackage } from './pages/manage-packages/manage-packages';
import { ManageCategory } from './pages/manage-category/manage-category';
import { AgentRegistration } from './pages/agent-registration/agent-registration';
import { AgentRegistrationView } from './pages/agent-registration-view/agent-registration-view';
import { AgentRegistrationList } from './pages/agent-registration-list/agent-registration-list';
import { AgentProfile } from './pages/agent-profile/agent-profile';
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

@NgModule({
  declarations: [
        AppComponent,
        NavMenuComponent,
        Home,
        CreateOrder,
        PageHeader,
        ViewOrder,
        Gridview,
        Pagination,
        SortCellDirective,
        SortableDirective,
        EditOrder,
        AgentComission,
        ViewCommission,
        ManageWithdrawal,
        ManageProduct,
        ManagePackage,
        ManageCategory,
        AgentRegistration,
        AgentRegistrationView,
        AgentRegistrationList,
        AgentProfile,
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
        SuperiorField
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
            { path: 'manage-withdrawal', component: ManageWithdrawal },
            { path: 'manage-product', component: ManageProduct },
            { path: 'manage-packages', component: ManagePackage },
            { path: 'manage-category', component: ManageCategory },
            //{ path: 'agent-registration', component: AgentRegistration },
            { path: 'agent-registration', component: AgentRegistration},
            { path: 'agent-registration-view/:id', component: AgentRegistrationView },
            { path: 'agent-registration-list', component: AgentRegistrationList },
            { path: 'agent-profile', component: AgentProfile }
           
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
