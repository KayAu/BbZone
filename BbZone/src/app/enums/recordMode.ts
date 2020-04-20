export enum RecordMode {
    New = "New",
    Edit = "Edit",
    View = "View"
}

export enum ApprovalMode {
    All = 0,
    Pending = 1,
    Approved = 2,
    Rejected = 3
}

export enum OrderFilter {
    None = 0,
    IncomingMessage = 1,
    NoCommissionSetup = 2
}