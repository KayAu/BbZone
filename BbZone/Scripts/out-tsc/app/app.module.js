"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var nav_menu_component_1 = require("./nav-menu/nav-menu.component");
var home_1 = require("./pages/home/home");
var create_order_1 = require("./pages/create-order/create-order");
var page_header_1 = require("./components/page-header");
var view_order_1 = require("./pages/view-order/view-order");
var agent_commission_table_1 = require("./components/agent-commission-table/agent-commission-table");
var data_service_1 = require("./services/data.service");
var loader_service_1 = require("./loader/loader.service");
var broadcast_service_1 = require("./services/broadcast.service");
var cascade_service_1 = require("./services/cascade.service");
var router_service_1 = require("./services/router.service");
var pagination_1 = require("./components/pagination/pagination");
var sort_cell_directive_1 = require("./directives/sort-cell.directive");
var sortable_directive_1 = require("./directives/sortable.directive");
var common_1 = require("@angular/common");
var http_2 = require("@angular/common/http");
var ngx_daterangepicker_material_1 = require("ngx-daterangepicker-material");
var edit_order_1 = require("./pages/edit-order/edit-order");
var agent_comission_1 = require("./pages/agent-comission/agent-comission");
var view_commission_1 = require("./pages/view-commission/view-commission");
var view_withdrawal_1 = require("./pages/view-withdrawal/view-withdrawal");
var manage_product_1 = require("./pages/manage-product/manage-product");
var manage_packages_1 = require("./pages/manage-packages/manage-packages");
var manage_category_1 = require("./pages/manage-category/manage-category");
var agent_registration_1 = require("./pages/agent-registration/agent-registration");
var agent_registration_view_1 = require("./pages/agent-registration-view/agent-registration-view");
var agent_registration_list_1 = require("./pages/agent-registration-list/agent-registration-list");
var agent_profile_1 = require("./pages/agent-profile/agent-profile");
var agent_maintenance_1 = require("./pages/agent-maintenance/agent-maintenance");
var tablerow_buttons_1 = require("./components/tablerow-buttons/tablerow-buttons");
var editmode_directive_1 = require("./directives/editmode-directive");
var editable_dropdown_1 = require("./components/editable-dropdown/editable-dropdown");
var dropdown_action_1 = require("./components/dropdown-action/dropdown-action");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("./material");
var data_control_1 = require("./components/data-control/data-control");
var data_field_1 = require("./components/data-field/data-field");
var loader_1 = require("./components/loader/loader");
var loader_interceptor_1 = require("./loader/loader.interceptor");
var product_options_1 = require("./components/product-options/product-options");
var file_uploader_1 = require("./components/file-uploader/file-uploader");
var ngx_toastr_1 = require("ngx-toastr");
var login_1 = require("./pages/login/login");
var user_auth_guard_1 = require("./guard/user-auth.guard");
var angular_user_idle_1 = require("angular-user-idle");
var back_button_1 = require("./components/back-button/back-button");
var enum_to_array_1 = require("./pipes/enum-to-array");
var superior_field_1 = require("./components/superior-field/superior-field");
var multiple_checkbox_1 = require("./components/multiple-checkbox/multiple-checkbox");
var gridview_1 = require("./components/gridview/gridview");
var team_submission_1 = require("./components/dashboard/team-submission/team-submission");
var create_announcement_1 = require("./pages/create-announcement/create-announcement");
var edit_announcement_1 = require("./pages/edit-announcement/edit-announcement");
var view_announcement_1 = require("./pages/view-announcement/view-announcement");
var announcement_1 = require("./components/announcement/announcement");
var user_communication_1 = require("./components/user-communication/user-communication");
var less_than_validator_directive_1 = require("./directives/less-than-validator.directive");
var submission_status_count_1 = require("./components/dashboard/submission-status-count/submission-status-count");
var monthly_applications_1 = require("./components/dashboard/monthly-applications/monthly-applications");
var create_withdrawal_1 = require("./pages/create-withdrawal/create-withdrawal");
var edit_withdrawal_1 = require("./pages/edit-withdrawal/edit-withdrawal");
var agent_pocket_1 = require("./pages/agent-pocket/agent-pocket");
var customer_finder_1 = require("./components/customer-finder/customer-finder");
var manage_clawback_1 = require("./pages/manage-clawback/manage-clawback");
var upload_incentives_1 = require("./pages/upload-incentives/upload-incentives");
var view_incentives_1 = require("./pages/view-incentives/view-incentives");
var admin_access_1 = require("./pages/admin-access/admin-access");
var manage_login_banner_1 = require("./pages/manage-login-banner/manage-login-banner");
var role_1 = require("./enums/role");
var min_validator_1 = require("./directives/min-validator");
var agent_view_1 = require("./pages/agent-view/agent-view");
var view_complete_app_1 = require("./pages/view-complete-app/view-complete-app");
var equal_validator_directive_1 = require("./directives/equal-validator.directive");
var mandatory_directive_1 = require("./directives/mandatory.directive");
var edit_password_1 = require("./pages/edit-password/edit-password");
var reset_agent_password_1 = require("./pages/reset-agent-password/reset-agent-password");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                nav_menu_component_1.NavMenuComponent,
                home_1.Home,
                create_order_1.CreateOrder,
                page_header_1.PageHeader,
                view_order_1.ViewOrder,
                agent_commission_table_1.AgentCommissionTable,
                pagination_1.Pagination,
                sort_cell_directive_1.SortCellDirective,
                sortable_directive_1.SortableDirective,
                edit_order_1.EditOrder,
                agent_comission_1.AgentComission,
                view_commission_1.ViewCommission,
                view_withdrawal_1.ViewWithdrawal,
                manage_product_1.ManageProduct,
                manage_packages_1.ManagePackage,
                manage_category_1.ManageCategory,
                agent_registration_1.AgentRegistration,
                agent_registration_view_1.AgentRegistrationView,
                agent_registration_list_1.AgentRegistrationList,
                agent_profile_1.AgentProfile,
                agent_maintenance_1.AgentMaintenance,
                tablerow_buttons_1.TableRowButtons,
                editmode_directive_1.EditModeDirective,
                editable_dropdown_1.EditableDropdown,
                dropdown_action_1.DropdownAction,
                data_control_1.DataControl,
                data_field_1.DataField,
                loader_1.LoaderComponent,
                product_options_1.ProductOptions,
                file_uploader_1.FileUploader,
                login_1.Login,
                back_button_1.BackButton,
                enum_to_array_1.EnumToArrayPipe,
                superior_field_1.SuperiorField,
                multiple_checkbox_1.MultipleCheckboxes,
                gridview_1.Gridview,
                team_submission_1.TeamSubmission,
                create_announcement_1.CreateAnnouncement,
                edit_announcement_1.EditAnnouncement,
                view_announcement_1.ViewAnnouncement,
                announcement_1.Announcement,
                user_communication_1.UserCommunication,
                less_than_validator_directive_1.LessThanValidator,
                submission_status_count_1.SubmissionStatusCount,
                create_withdrawal_1.CreateWithdrawal,
                edit_withdrawal_1.EditWithdrawal,
                agent_pocket_1.AgentPocket,
                customer_finder_1.CustomerFinder,
                manage_clawback_1.ManageClawback,
                upload_incentives_1.UploadIncentives,
                view_incentives_1.ViewIncentives,
                admin_access_1.AdminAccess,
                monthly_applications_1.MonthlyApplicationDashboard,
                manage_login_banner_1.ManageLoginBanner,
                min_validator_1.MinDirective,
                agent_view_1.AgentView,
                view_complete_app_1.ViewCompletedApp,
                edit_password_1.EditPassword,
                equal_validator_directive_1.EqualValidator,
                mandatory_directive_1.MandatoryValidator,
                reset_agent_password_1.ResetAgentPassword
            ],
            imports: [
                platform_browser_1.BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
                http_1.HttpClientModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                material_1.MaterialModule,
                animations_1.BrowserAnimationsModule,
                ngx_daterangepicker_material_1.NgxDaterangepickerMd.forRoot(),
                angular_user_idle_1.UserIdleModule.forRoot({ idle: 3600, timeout: 3600, ping: 900 }),
                ngx_toastr_1.ToastrModule.forRoot({
                    maxOpened: 1,
                    preventDuplicates: true,
                }),
                router_1.RouterModule.forRoot([
                    { path: '', component: login_1.Login },
                    { path: 'home', component: home_1.Home, pathMatch: 'full', canActivate: [user_auth_guard_1.UserAuthGuard] },
                    { path: 'agent-profile/:id', component: agent_profile_1.AgentProfile },
                    { path: 'edit-password', component: edit_password_1.EditPassword },
                    { path: 'create-order', component: create_order_1.CreateOrder },
                    { path: 'view-order', component: view_order_1.ViewOrder },
                    { path: 'edit-order/:id', component: edit_order_1.EditOrder },
                    { path: 'view-complete-app', component: view_complete_app_1.ViewCompletedApp, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin, role_1.Role.Agent] } },
                    { path: 'agent-registration', component: agent_registration_1.AgentRegistration },
                    { path: 'agent-registration-list', component: agent_registration_list_1.AgentRegistrationList, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'agent-registration-view/:id', component: agent_registration_view_1.AgentRegistrationView, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'agent-maintenance', component: agent_maintenance_1.AgentMaintenance, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'agent-view/:id', component: agent_view_1.AgentView, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'agent-comission', component: agent_comission_1.AgentComission, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin, role_1.Role.Agent] } },
                    { path: 'view-commission', component: view_commission_1.ViewCommission, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin, role_1.Role.Agent] } },
                    { path: 'view-withdrawal', component: view_withdrawal_1.ViewWithdrawal, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin, role_1.Role.Agent] } },
                    { path: 'edit-withdrawal/:id', component: edit_withdrawal_1.EditWithdrawal, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin, role_1.Role.Agent] } },
                    { path: 'create-withdrawal', component: create_withdrawal_1.CreateWithdrawal, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin, role_1.Role.Agent] } },
                    { path: 'agent-pocket', component: agent_pocket_1.AgentPocket, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'manage-clawback', component: manage_clawback_1.ManageClawback, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin, role_1.Role.Agent] } },
                    { path: 'upload-incentives', component: upload_incentives_1.UploadIncentives, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'view-incentives', component: view_incentives_1.ViewIncentives, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'admin-access', component: admin_access_1.AdminAccess, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'manage-category', component: manage_category_1.ManageCategory, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'manage-product', component: manage_product_1.ManageProduct, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'manage-packages', component: manage_packages_1.ManagePackage, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'create-announcement', component: create_announcement_1.CreateAnnouncement, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'view-announcement', component: view_announcement_1.ViewAnnouncement },
                    { path: 'edit-announcement/:id', component: edit_announcement_1.EditAnnouncement, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'manage-login-banner', component: manage_login_banner_1.ManageLoginBanner, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } },
                    { path: 'reset-agent-password', component: reset_agent_password_1.ResetAgentPassword, canActivate: [user_auth_guard_1.UserAuthGuard], data: { roles: [role_1.Role.SuperAdmin] } }
                ])
            ],
            providers: [
                data_service_1.DataService,
                broadcast_service_1.BroadcastService,
                cascade_service_1.CascadeService,
                router_service_1.RouterService,
                loader_service_1.LoaderService,
                {
                    provide: http_2.HTTP_INTERCEPTORS,
                    useClass: loader_interceptor_1.LoaderInterceptor,
                    multi: true
                },
                { provide: common_1.APP_BASE_HREF, useValue: '/' },
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map