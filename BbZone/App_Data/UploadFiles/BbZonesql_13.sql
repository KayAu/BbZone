USE  [BbZone]
GO
SET IDENTITY_INSERT [dbo].[ApplicationStatus] ON 
GO
INSERT [dbo].[ApplicationStatus] ([AppStatusId], [Status]) VALUES (1, N'Pending')
GO
INSERT [dbo].[ApplicationStatus] ([AppStatusId], [Status]) VALUES (2, N'Waiting List')
GO
INSERT [dbo].[ApplicationStatus] ([AppStatusId], [Status]) VALUES (3, N'Early Stage')
GO
INSERT [dbo].[ApplicationStatus] ([AppStatusId], [Status]) VALUES (4, N'Post Complete')
GO
INSERT [dbo].[ApplicationStatus] ([AppStatusId], [Status]) VALUES (5, N'Cancel')
GO
INSERT [dbo].[ApplicationStatus] ([AppStatusId], [Status]) VALUES (6, N'KIV')
GO
INSERT [dbo].[ApplicationStatus] ([AppStatusId], [Status]) VALUES (7, N'New Area')
GO
SET IDENTITY_INSERT [dbo].[ApplicationStatus] OFF
GO
SET IDENTITY_INSERT [dbo].[Product] ON 
GO
INSERT [dbo].[Product] ([ProductId], [ProductName], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (1, N'TM', 1, CAST(N'2020-02-23T11:17:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-23T11:17:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[Product] ([ProductId], [ProductName], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (2, N'Astro', 1, CAST(N'2020-02-23T13:25:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-23T13:25:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[Product] ([ProductId], [ProductName], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (3, N'TIME', 1, CAST(N'2020-02-23T00:00:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-23T13:41:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[Product] ([ProductId], [ProductName], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (4, N'Maxis', 1, CAST(N'2020-02-23T00:00:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-23T13:51:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[Product] ([ProductId], [ProductName], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (5, N'Unifi', 1, CAST(N'2020-02-23T13:59:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-23T13:59:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[Product] ([ProductId], [ProductName], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (6, N'Nex.Life', 1, CAST(N'2020-02-23T13:59:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-23T13:59:00' AS SmallDateTime), N'Kaye')
GO
SET IDENTITY_INSERT [dbo].[Product] OFF
GO
SET IDENTITY_INSERT [dbo].[ProductCategory] ON 
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (1, 1, N'tmhomenew', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (2, 1, N'tmhomem2u', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (3, 4, N'maxishome', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (4, 4, N'maxisbiz', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (5, 1, N'tmbiznew', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (6, 1, N'tmbizm2u', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (7, 3, N'timeeasy', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (8, 3, N'timehome1gb2y', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (9, 3, N'timehomestd2y', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (10, 3, N'timehome1002y', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (11, 3, N'timebiz', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (12, 3, N'timehome1001y', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (13, 1, N'unifimobile', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (14, NULL, N'nexlife', 100.0000, 1, CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T11:28:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (15, 2, N'astro', 150.0000, 1, CAST(N'2020-02-18T00:00:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-23T16:29:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (16, NULL, N'Testing', 100.0000, 0, CAST(N'2020-02-18T00:00:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T23:00:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (17, NULL, N'Testing 2', 150.0000, 1, CAST(N'2020-02-18T00:00:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:08:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (18, NULL, N'Testing 3', 200.0000, 0, CAST(N'2020-02-18T00:00:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-22T14:33:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (19, NULL, N'Testing 4', 300.0000, NULL, CAST(N'2020-02-18T23:40:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T23:40:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (1016, NULL, N'Testing 33', 100.0000, 1, CAST(N'2020-02-22T14:34:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-22T14:34:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductCategory] ([CategoryId], [ProductId], [Category], [DefaultCommission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (1017, 6, N'Testing 1', 100.0000, 0, CAST(N'2020-02-23T17:35:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-23T19:29:00' AS SmallDateTime), N'Kaye')
GO
SET IDENTITY_INSERT [dbo].[ProductCategory] OFF
GO
SET IDENTITY_INSERT [dbo].[ProductPackage] ON 
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (1, 1, N'unifi 100Mbps - (RM129)newnew', N'unifi lite 100Mbps + unifi TV Pack + unifi playTV Lite + Free Voice (RM129 MONTHLY)(NEW NEW)', 129.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (2, 1, N'unifi 100Mbps (STB) Ultimate BEST (NEWNEW)', N'unifi 100Mbps (STB) Ultimate BEST+ Ultimate Pack + unifi playTV + Free Voice (RM159 MONTHLY)(NEW NEW)', 159.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (3, 2, N'unifi 100Mbps -(RM129)M2U', N'unifi lite 100Mbps me + unifi TV Pack + unifi Play TV Lite + Free STD20 + Discount RM30(M2U)', 129.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (4, 2, N'unifi 100Mbps (STB) Ultimate BEST (M2U)', N'unifi 100Mbps (STB) Ultimate BEST+ Ultimate Pack + unifi playTV + Free Voice (RM159 MONTHLY)(MIGRATE TO UNIFI)', 159.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (5, 1, N'UniFi Advance 30Mbps - Bonanza(NEWNEW)', N'UniFi Advance 30Mbps - Bonanza Campaign-RM139 (NEW NEW)', 109.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (6, 2, N'UniFi Advance 30Mbps - Bonanza(M2U)', N'UniFi Advance 30Mbps - Bonanza Campaign-RM139 (MIGRATE TO UNIFI)', 109.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (7, 3, N'MAXISHOME 30MB RM89', N'MAXIS ONEHOME 30MB (RM89+NO FREE CALL)', 89.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (8, 3, N'MAXISHOME 100MB RM129', N'MAXIS ONEHOME 100MB (RM129+unlimited CALL)', 129.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (9, 4, N'OneBusiness Fiber 30MB', N'OneBusiness Fiber 30MB (RM99-NO FREE CALL)', 99.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (10, 4, N'Maxis OneBusiness Fiber 100MB', N'OneBusiness Fiber 100MB (RM139-FREE CALL)', 139.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (11, 1, N'8MB STREAMYZER', N'Streamyx 8Mbps - RM140 (Streamyzer campaign)', 115.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (12, 1, N'4MB STREAMYZER', N'Streamyx 4Mbps - RM130 (Streamyzer campaign)', 105.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (13, 1, N'2MB STREAMYZER', N'Streamyx 2Mbps - RM120 (Streamyzer campaign)', 95.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (14, 1, N'1MB STREAMYZER', N'Streamyx 1Mbps - RM110 (Streamyzer campaign)', 85.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (15, 5, N'ebiz package 10Mbps - RM179(NEWNEW)', N'UniFi Biz Lite 10Mbps+ SVP30 (Free 24 months) + Discount RM20 (24 months) 179(NEWNEW)', 179.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (16, 5, N'ebiz package 30Mbps - RM249(NEWNEW)', N'UniFi ebiz package 30Mbps+ SVP50 (Free 24 months) + Discount RM50 (24 months) 249(NEWNEW)', 249.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (17, 5, N'ebiz package 50Mbps - RM299(NEWNEW)', N'UniFi ebiz package 50Mbps + SVP50 (Free 24 months) + Discount RM50 (24 months) 299(NEWNEW)', 299.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (18, 6, N'ebiz package 10Mbps - RM179(M2U)', N'UniFi Biz Lite 10Mbps+ SVP30 (Free 24 months) + Discount RM20 (24 months) 179(M2U)', 179.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (19, 6, N'ebiz package 30Mbps - RM249(M2U)', N'UniFi ebiz package 30Mbps+ SVP50 (Free 24 months) + Discount RM50 (24 months) 249(M2U)', 249.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (20, 6, N'ebiz package 50Mbps - RM299(M2U)', N'UniFi ebiz package 50Mbps + SVP50 (Free 24 months) + Discount RM50 (24 months) 299(M2U)', 299.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (21, 6, N'ebiz package 100Mbps - RM349(M2U)', N'UniFi Biz Pro 100Mbps + SVP70 (Free 24 months) + Discount RM50 (24 months)RM349(M2U)', 349.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (22, 5, N'ebiz package 100Mbps - RM349(NEWNEW)', N'UniFi Biz Pro 100Mbps + SVP70 (Free 24 months) + Discount RM50 (24 months)RM349(NEWNEW)', 349.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (23, 5, N'Streamyx started pack 1.0m', N'Streamyx started pack 1.0M (RM99)', 99.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (24, 7, N'Time Fiber 100MB RM149 (Easy switch)', N'Time Fiber UNLIMITED broadband -(100MB RM149)-2 YEAR CONTRACT INSTALLATION FREE (Easy Switch)', 149.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (25, 7, N'Time Fiber 1GB RM199 (Easy switch)', N'Time Fiber UNLIMITED broadband -(1gB RM199)-2 YEAR CONTRACT INSTALLATION FREE (Easy Switch)', 199.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (26, 7, N'Time Fiber 500MB RM139 (Easy switch)', N'Time Fiber UNLIMITED broadband -(500MB RM139)-2 YEAR CONTRACT INSTALLATION FREE (Easy Switch)', 139.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (27, 7, N'Time Fiber 100MB RM149 (1 Year))', N'Time Fiber -(100MB RM149)-1 YEAR CONTRACT(ONE TIME CHARGE RM300) (COMMISSION 100%)', 149.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (28, 8, N'Time Fiber 1GB RM199 (1 Year)', N'Time Fiber -(1GB RM199)-1 YEAR CONTRACT(ONE TIME CHARGE RM300) (COMMISSION 100%)', 199.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (29, 8, N'Time Fiber 500MB RM139 (1 Year)', N'Time Fiber -(500MB RM139)-1 YEAR CONTRACT(ONE TIME CHARGE RM300) (COMMISSION 100%)', 139.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (30, 9, N'Time Fiber 500MB RM139', N'Time Fiber UNLIMITED broadband -(500MB RM139)-2 YEAR CONTRACT INSTALLATION FREE', 139.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (31, 8, N'Time Fiber 1GB RM199', N'Time Fiber UNLIMITED broadband -(1GB RM199)-2 YEAR CONTRACT INSTALLATION FREE', 199.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (32, 10, N'Time Fiber 100MB RM149', N'Time Fiber UNLIMITED broadband -(100MB RM149)-2 YEAR CONTRACT INSTALLATION FREE', 149.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (33, 11, N'TIME biz 100mbps RM398', N'TIME Business FTTO 100mbps (RM398)', 398.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (34, 11, N'TIME biz 50mbps RM338', N'TIME Business FTTO 50mbps (RM338)', 338.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (35, 11, N'TIME biz 20mbps RM188 (Mall Edition)', N'TIME biz 20mbps RM188 (Mall Edition) - 1 SLP + 100 mins free calls /month', 188.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (36, 11, N'TIME biz 20mbps RM188 (Office Promo)', N'TIME biz 20mbps RM188 (Office Promo) - 2 SLP & no free call', 188.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (37, 3, N'MAXISHOME 30MB RM99', N'MAXIS ONEHOME 30MB (RM99)-free unlimited call and dect phone', 99.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (38, 4, N'OneBusiness Fiber 30MB-1FIX IP', N'OneBusiness Fiber 30MB (RM299-1 fix ip)', 299.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (39, 4, N'OneBusiness Fiber 100MB-1fix ip', N'OneBusiness Fiber 100MB (RM339-1 FIx IP)', 339.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (40, 5, N'Streamyx 1.0M SME(RM198)', N'Streamyx 1.0 SME- RM198', 198.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (41, 5, N'Streamyx 2.0M SME(RM228)', N'Streamyx 2.0 SME- RM228', 218.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (42, 5, N'Streamyx 4.0M SME(RM228)', N'Streamyx 4.0 SME- RM248', 228.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (43, 5, N'Streamyx 8.0M SME(RM268)', N'Streamyx 8.0 SME- RM268', 238.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (44, 10, N'Time Fiber 100MB RM99 (2 Year)', N'Time Fiber UNLIMITED broadband -(100MB RM99)-2 YEAR CONTRACT INSTALLATION FREE', 99.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (45, 12, N'Time Fiber 100MB RM99 (1 Year)', N'Time Fiber UNLIMITED broadband -(100MB RM99)-1 YEAR CONTRACT', 99.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (46, 9, N'Time Fiber 100MB RM149 (2Year)', N'Time Fiber UNLIMITED broadband -(100MB RM149)-2 YEAR CONTRACT', 149.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (47, 1, N'unifi Basic 30Mbps (NEWNEW)', N'unifi basic 30Mbps-RM79 (QUOTA 60GB) (NEWNEW)', 79.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (48, 2, N'unifi Basic 30Mbps (M2U)', N'unifi basic 30Mbps-RM79 (QUOTA 60GB) (MIGGRATE TO UNIFI)', 79.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (49, 11, N'TIME biz 20mbps RM138', N'TIME biz 20mbps RM138 (RM100 off for 24months)', 138.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (50, 11, N'TIME biz 50mbps RM218', N'TIME Business FTTO 50mbps (RM218)-RM120 off for 24 months', 218.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (51, 11, N'TIME biz 100mbps RM248', N'TIME Business FTTO 100mbps (RM248) (RM100 off for 24months)', 248.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (52, 13, N'unifi Mobile 99', N'unifi Mobile? 99 (Non-stop data, calls and SMS)+10GB LTE hotspot', 60.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (53, 13, N'unifi Mobile? 59', N'unifi Mobile? 59 (data9GB LTE+1GB-3g=10GB, 100min call+25 sms', 30.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (54, 13, N'unifi Mobile? 39', N'unifi Mobile? 39 (data4GB LTE+1GB-3g=5GB, 50min call+25 sms', 20.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (55, 13, N'unifi Mobile? 29', N'unifi Mobile? 29 (data2GB LTE+1GB-3g=3GB, 50min call+25 sms', 15.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (56, 1, N'UniFi Lite 10Mbps(SUBB)', N'unifi lite 10Mbps (SUBB)(HyppTV) RM129', 129.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (57, 6, N'CNY 100Mbps - RM329(M2U)', N'CNY 100Mbps - RM329(M2U)', 329.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (58, 5, N'CNY 100Mbps - RM329(NEWNEW)', N'CNY 100Mbps - RM329(NEWNEW)', 329.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (59, 13, N'unifi Mobile? 19', N'unifi Mobile? 19 (data1GB LTE+1GB-3g=1GB, 10min call+25 sms', 7.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (60, 5, N'unifi Biz 100Mbps - Super Treats (NEWNEW)', N'unifi biz lite 100Mbps + SVP30 + Discount RM90 (RM139) Super Treats(NEWNEW)', 139.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (61, 2, N'unifi 300Mbps - unifi Plus Box 2020(M2U) RM199', N'unifi 300Mbps me + Ultimate Pack + unifi Plus Box + Free STD20 + Discount RM60(RM199)', 199.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (62, 1, N'unifi 300Mbps - unifi Plus Box 2020(NEW) RM199', N'unifi 300Mbps me + Ultimate Pack + unifi Plus Box + Free STD20 + Discount RM60(RM199)', 199.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (63, 3, N'MAXISHOME 300MB RM149', N'MAXISHOME 300MB(+FREE LOCAL VOICE CALL) RM149', 149.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (64, 3, N'MAXISHOME 500MB RM219', N'MAXISHOME 500MB(+FREE LOCAL VOICE CALL+2 MESH WIFI) RM219', 219.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (65, 3, N'MAXISHOME 800MB RM299', N'MAXISHOME 800MB(+FREE LOCAL VOICE CALL+2 MESH WIFI) RM299', 299.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (66, 4, N'Maxis OneBusiness Fiber 300MB', N'OneBusiness Fiber 300MB (RM199-FREE CALL+MESH WIFIX2+ONLINE SECURITY)', 199.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (67, 4, N'Maxis OneBusiness Fiber 500MB', N'OneBusiness Fiber 500MB (RM269-FREE CALL+MESH WIFIX2+ONLINE SECURITY)', 269.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (68, 4, N'Maxis OneBusiness Fiber 800MB', N'OneBusiness Fiber 800MB (RM349-FREE CALL+MESH WIFIX2+ONLINE SECURITY)', 349.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (69, 11, N'TIME biz 500mbps RM298', N'TIME Business FTTO 500MB (RM298)', 298.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (70, 14, N'NEXLIFE RM100', N'NEXLIFE RM100 (30MB+UNLIMTED 4G INTERNET)', 100.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (71, 1, N'Jimat Hebat 1Mbps RM68', N'Streamyx Pakej Jimat Hebat 1Mbps 2019 (RM68)', 68.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (72, 1, N'Jimat Hebat 2Mbps RM83', N'Streamyx Pakej Jimat Hebat 2Mbps 2019 (RM83)', 83.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (73, 1, N'Jimat Hebat 4Mbps RM88', N'Streamyx Pakej Jimat Hebat 4Mbps 2019 (RM83)', 88.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (74, 1, N'unifi 30Mbps - Upsizing Promo(NEWNEW)', N'unifi 30Mbps - Upsizing Promo-RM89(NEWNEW)', 89.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (75, 1, N'unifi 50Mbps - Upsizing Promo(NEWNEW)', N'unifi 50Mbps - Upsizing Promo-RM99 (NEWNEW)', 99.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (76, 2, N'unifi 30Mbps - Upsizing Promo(M2U)', N'unifi 30Mbps - Upsizing Promo-RM89 (M2U)', 89.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (77, 2, N'unifi 50Mbps - Upsizing Promo(M2U)', N'unifi 50Mbps - Upsizing Promo-RM99(M2U)', 99.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (78, 15, N'Njoi', N'Njoi', 30.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (79, 1, N'Unifi lite 4&8mb-RM69', N'unifi Lite (Mega Value 8mb and 4mb)', 69.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (80, 15, N'Family Pack + Broadband 30 (RM99)', N'IPTV Family Pack + Broadband 30mbps (RM99)', 99.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (81, 15, N'Starter Pack + Broadband 100 (RM159)', N'IPTV Starter Pack (60+ channels) + Broadband 100mbps(RM159)', 159.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (82, 6, N'unifi Biz 100Mbps - Super Treats (m2u)', N'unifi biz lite 100Mbps + SVP30 + Discount RM90 (RM139) Super Treats (m2u)', 139.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (83, 13, N'unifi Mobile RM59(12 months)', N'unifi Mobile RM59 (unlimited data+sms+call)12months contract)', 20.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (84, 5, N'unifi Biz 30Mbps - VDSL RM139 NEWNEW', N'unifi Biz 30Mbps - High-Rise YEP 2019 RM139', 139.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (85, 6, N'unifi Biz 30Mbps - VDSL RM139 (M2U)', N'unifi Biz 30Mbps - High-Rise YEP 2019 RM139', 139.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (86, 5, N'Streamyx Biz 2.0M', N'Streamyx Biz 2.0M - Super Saver 2019-RM198', 198.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (87, 5, N'Streamyx Biz 4.0M', N'Streamyx Biz 4.0M - Super Saver 2019-RM208', 208.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (88, 5, N'Streamyx Biz 8.0M', N'Streamyx Biz 8.0M - Super Saver 2019-RM248', 248.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (89, 15, N'Family Pack + Broadband 30 RM119', N'IPTV Starter Pack + Broadband 30mbps RM119', 119.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (90, 1, N'unifi Lite commercial RM89', N'unifi Lite commercial RM89 (STREAMYX HOME)', 89.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (91, 1, N'unifi 30Mbps - VDSL-RM139 NEWNEW', N'unifi 30Mbps vdsl + Ultimate Pack + unifi Play TV + Free STD 20 + Discount RM10 + unifiTV VOD Voucher-rm139', 139.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (92, 2, N'unifi 30Mbps - VDSL-RM139 M2U', N'unifi 30Mbps Vdsl + Ultimate Pack + unifi Play TV + Free STD 20 + Discount RM10 + unifiTV VOD Voucher-rm139', 139.0000, 0, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (93, 1, N'unifi 30Mbps - unifi Plus Box 2020(RM149)', N'unifi 30Mbps me + Ultimate Pack + unifi Plus Box (RM149)', 149.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (94, 2, N'unifi 30Mbps - unifi Plus Box 2020(RM149) (m2u)', N'unifi 30Mbps me + Ultimate Pack + unifi Plus Box (RM149)', 149.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (95, 1, N'unifi 100Mbps - unifi Plus Box 2020(RM189)NEWNEW', N'unifi lite 100Mbps me + Ultimate Pack + unifi Plus Box + Free STD20(189)', 189.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (96, 2, N'unifi 100Mbps - unifi Plus Box 2020(RM189)M2U', N'unifi lite 100Mbps me + Ultimate Pack + unifi Plus Box + Free STD20(189)', 189.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (97, 2, N'unifi 100Mbps - 2020(RM129)M2U', N'unifi lite 100Mbps me + unifi TV Pack + unifi Play TV Lite + Free STD20 + RM129(M2U)', 129.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (98, 1, N'unifi 100Mbps - 2020(RM129)newnew', N'unifi lite 100Mbps me + unifi TV Pack + unifi Play TV Lite + Free STD20 (RM129)', 129.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (99, 5, N'BIZ 100MB-TURBO RM289(NEWNEW)', N'unifi Biz 100Mbps - Super Treats 2020 (Turbo)-auto upgrade to 800mb-RM289', 289.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (100, 6, N'BIZ 100MB-TURBO RM289(M2U)', N'unifi Biz 100Mbps - Super Treats 2020 (Turbo)-auto upgrade to 800mb-RM289', 289.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (101, 5, N'unifi Biz 300Mbps - 2020 (MESH WiFi)(NEWNEW)', N'unifi Biz 300Mbps - 2020 (MESH WiFi)(unifi biz advance 300Mbps me + SVP50 + Discount RM100) RM249', 249.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (102, 6, N'unifi Biz 300Mbps - 2020 (MESH WiFi)(M2U)', N'unifi Biz 300Mbps - 2020 (MESH WiFi)(unifi biz advance 300Mbps me + SVP50 + Discount RM100) RM249', 249.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (103, 5, N'unifi Biz 800Mbps - 2020 (MESH WiFi)(NEWNEW)', N'unifi Biz 800Mbps - 2020 (MESH WiFi)unifi biz pro 800Mbps me + SVP70 + Discount RM120)RM349', 349.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (104, 6, N'unifi Biz 800Mbps - 2020 (MESH WiFi)(M2U)', N'unifi Biz 800Mbps - 2020 (MESH WiFi)unifi biz pro 800Mbps me + SVP70 + Discount RM120)RM349', 349.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (105, 5, N'unifi Biz 500Mbps - 2020 (MESH WiFi)(NEWNEW)', N'unifi Biz 500Mbps - 2020 (MESH WiFi) unifi biz advance plus 500Mbps me + SVP50 + Discount RM100-RM299', 299.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (106, 6, N'unifi Biz 500Mbps - 2020 (MESH WiFi)(M2U)', N'unifi Biz 500Mbps - 2020 (MESH WiFi) unifi biz advance plus 500Mbps me + SVP50 + Discount RM100-RM299', 299.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (107, 5, N'unifi Biz 30Mbps-RM99(NEWNEW)', N'unifi Biz 30Mbps - Super Treats 2020-RM99(TACTICAL PROGRAM)', 99.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (108, 6, N'unifi Biz 30Mbps-RM99(M2U)', N'unifi Biz 30Mbps - Super Treats 2020-RM99(TACTICAL PROGRAM)', 99.0000, 1, CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-18T22:55:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[ProductPackage] ([ProdPkgId], [CategoryId], [PackageName], [Description], [Commission], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (109, 14, N'Testing', N'Testing 123', 285.0000, 0, CAST(N'2020-02-19T00:00:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-23T19:29:00' AS SmallDateTime), N'Kaye')
GO
SET IDENTITY_INSERT [dbo].[ProductPackage] OFF
GO
SET IDENTITY_INSERT [dbo].[CustomerApplication] ON 
GO
INSERT [dbo].[CustomerApplication] ([ApplicationId], [CategoryId], [ProdPkgId], [Agent], [CompanyName], [CompanyRegNo], [CustomerName], [CustomerId], [ResidentialType], [ResidentialName], [CustomerAddr], [City], [Postcode], [State], [ContactNo], [Email], [CustomerRemarks], [AdminRemarks], [AppStatusId], [OrderNo], [SubmitByAgent], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (1, 1, 2, N'Kaye', NULL, NULL, N'Yu Liu', N'4208687878', NULL, NULL, N'2452 Buckhannan Avenue', N'Bayan Lepas', N'11900', N'Pulau Pinang', N'0163154352158', N'YuLiu@jourrapide.com', N'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...', NULL, 1, NULL, NULL, CAST(N'2020-02-21T16:59:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-21T16:59:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[CustomerApplication] ([ApplicationId], [CategoryId], [ProdPkgId], [Agent], [CompanyName], [CompanyRegNo], [CustomerName], [CustomerId], [ResidentialType], [ResidentialName], [CustomerAddr], [City], [Postcode], [State], [ContactNo], [Email], [CustomerRemarks], [AdminRemarks], [AppStatusId], [OrderNo], [SubmitByAgent], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (2, 1, 2, N'Kaye', NULL, NULL, N'Kah Yin Au', N'4208687878', NULL, NULL, N'B1-16-7, Putra Place Condo, Persiaran Bayan Indah, 11900 Bayan L', N'Bayan Lepas', N'11900', N'Pulau Pinang', N'0164763299', N'kayeau80@gmail.com', N'Testing', NULL, 1, NULL, NULL, CAST(N'2020-02-24T17:53:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-24T17:53:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[CustomerApplication] ([ApplicationId], [CategoryId], [ProdPkgId], [Agent], [CompanyName], [CompanyRegNo], [CustomerName], [CustomerId], [ResidentialType], [ResidentialName], [CustomerAddr], [City], [Postcode], [State], [ContactNo], [Email], [CustomerRemarks], [AdminRemarks], [AppStatusId], [OrderNo], [SubmitByAgent], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (3, 1, 2, N'Kaye', NULL, NULL, N'Kah Yin Au', N'4208687878', NULL, NULL, N'B1-16-7, Putra Place Condo, Persiaran Bayan Indah, 11900 Bayan L', N'Bayan Lepas', N'11900', N'Kuala Lumpur', N'0164763299', N'kayeau80@gmail.com', N'hggdjh', NULL, 1, NULL, NULL, CAST(N'2020-02-29T12:50:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-29T12:50:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[CustomerApplication] ([ApplicationId], [CategoryId], [ProdPkgId], [Agent], [CompanyName], [CompanyRegNo], [CustomerName], [CustomerId], [ResidentialType], [ResidentialName], [CustomerAddr], [City], [Postcode], [State], [ContactNo], [Email], [CustomerRemarks], [AdminRemarks], [AppStatusId], [OrderNo], [SubmitByAgent], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (4, 1, 2, N'Kaye', NULL, NULL, N'Kah Yin Au', N'4208687878', NULL, NULL, N'B1-16-7, Putra Place Condo, Persiaran Bayan Indah, 11900 Bayan L', N'Bayan Lepas', N'11900', N'Kuala Lumpur', N'0164763299', N'kayeau80@gmail.com', N'rtytrytr', NULL, 1, NULL, NULL, CAST(N'2020-02-29T13:06:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-29T13:06:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[CustomerApplication] ([ApplicationId], [CategoryId], [ProdPkgId], [Agent], [CompanyName], [CompanyRegNo], [CustomerName], [CustomerId], [ResidentialType], [ResidentialName], [CustomerAddr], [City], [Postcode], [State], [ContactNo], [Email], [CustomerRemarks], [AdminRemarks], [AppStatusId], [OrderNo], [SubmitByAgent], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (5, 1, 2, N'Kaye', NULL, NULL, N'Kah Yin Au', N'3456346436', NULL, NULL, N'B1-16-7, Putra Place Condo, Persiaran Bayan Indah, 11900 Bayan L', N'Bayan Lepas', N'11900', N'Pulau Pinang', N'0164763299', N'kayeau80@gmail.com', N'tyutututy', NULL, 1, NULL, NULL, CAST(N'2020-02-29T13:15:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-29T13:15:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[CustomerApplication] ([ApplicationId], [CategoryId], [ProdPkgId], [Agent], [CompanyName], [CompanyRegNo], [CustomerName], [CustomerId], [ResidentialType], [ResidentialName], [CustomerAddr], [City], [Postcode], [State], [ContactNo], [Email], [CustomerRemarks], [AdminRemarks], [AppStatusId], [OrderNo], [SubmitByAgent], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (6, 1, 2, N'Kaye', NULL, NULL, N'Kah Yin Au', N'4208687878', NULL, NULL, N'B1-16-7, Putra Place Condo, Persiaran Bayan Indah, 11900 Bayan L', N'Bayan Lepas', N'11900', N'Kuala Lumpur', N'0164763299', N'kayeau80@gmail.com', N'gugitiurrurur', NULL, 1, NULL, NULL, CAST(N'2020-02-29T13:19:00' AS SmallDateTime), N'Kaye', CAST(N'2020-02-29T13:19:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[CustomerApplication] ([ApplicationId], [CategoryId], [ProdPkgId], [Agent], [CompanyName], [CompanyRegNo], [CustomerName], [CustomerId], [ResidentialType], [ResidentialName], [CustomerAddr], [City], [Postcode], [State], [ContactNo], [Email], [CustomerRemarks], [AdminRemarks], [AppStatusId], [OrderNo], [SubmitByAgent], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (7, 8, 31, N'Kaye', N'Test 5', N'Test 5', N'Kah Yin Au', N'346436436346346', N'Condo/Apartment/Flat', N'Summerton', N'Jalan Lima', N'Bayan Lepas', N'06454', N'Kuala Lumpur', N'043274582', N'kayeau80@gmail.com', N'werwer3463634', NULL, 1, NULL, NULL, CAST(N'2020-03-01T15:46:00' AS SmallDateTime), N'Kaye', CAST(N'2020-03-01T15:46:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[CustomerApplication] ([ApplicationId], [CategoryId], [ProdPkgId], [Agent], [CompanyName], [CompanyRegNo], [CustomerName], [CustomerId], [ResidentialType], [ResidentialName], [CustomerAddr], [City], [Postcode], [State], [ContactNo], [Email], [CustomerRemarks], [AdminRemarks], [AppStatusId], [OrderNo], [SubmitByAgent], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (8, 3, 8, N'May', N'Testing Co.', N'Test 5', N'Xia Hou', N'4802830525', N'Semi-D', N'East Avenue', N'1592 East Avenue', N'Bayan Lepas', N'85034', N'Pulau Pinang', N'043274582', N'kayeau80@gmail.com', N'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id felis euismod, rutrum dolor nec, finibus dolor. Nullam faucibus lectus ut varius gravida', NULL, 1, NULL, NULL, CAST(N'2020-03-01T16:00:00' AS SmallDateTime), N'Kaye', CAST(N'2020-03-01T21:49:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[CustomerApplication] ([ApplicationId], [CategoryId], [ProdPkgId], [Agent], [CompanyName], [CompanyRegNo], [CustomerName], [CustomerId], [ResidentialType], [ResidentialName], [CustomerAddr], [City], [Postcode], [State], [ContactNo], [Email], [CustomerRemarks], [AdminRemarks], [AppStatusId], [OrderNo], [SubmitByAgent], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (9, 15, 80, N'Daniel', N'Test 5', N'Test 5', N'Sun Chung', N'4208687878', N'Terrace', N'Big Elm Park', N'1413 Big Elm', N'Bayan Lepas', N'06454', N'Kuala Lumpur', N'043274582', N'kayeau80@gmail.com', N'wqewqeqwe', NULL, 1, NULL, NULL, CAST(N'2020-03-01T17:32:00' AS SmallDateTime), N'Kaye', CAST(N'2020-03-01T22:20:00' AS SmallDateTime), N'Kaye')
GO
SET IDENTITY_INSERT [dbo].[CustomerApplication] OFF
GO
SET IDENTITY_INSERT [dbo].[CustomerDocument] ON 
GO
INSERT [dbo].[CustomerDocument] ([DocId], [ApplicationId], [Name], [Size]) VALUES (1, 6, N'..\App_Data\UploadFiles\12309_before_1005.JPG', NULL)
GO
INSERT [dbo].[CustomerDocument] ([DocId], [ApplicationId], [Name], [Size]) VALUES (2, 6, N'..\App_Data\UploadFiles\87145 proxy form_1005.pdf', NULL)
GO
INSERT [dbo].[CustomerDocument] ([DocId], [ApplicationId], [Name], [Size]) VALUES (3, 7, N'../App_Data/UploadFiles/Doc1_7.docx', NULL)
GO
INSERT [dbo].[CustomerDocument] ([DocId], [ApplicationId], [Name], [Size]) VALUES (4, 7, N'../App_Data/UploadFiles/interview written test_7.docx', NULL)
GO
INSERT [dbo].[CustomerDocument] ([DocId], [ApplicationId], [Name], [Size]) VALUES (6, 8, N'/App_Data/UploadFiles/87145 proxy form_8.pdf', NULL)
GO
INSERT [dbo].[CustomerDocument] ([DocId], [ApplicationId], [Name], [Size]) VALUES (7, 8, N'interview written test_8.docx', NULL)
GO
INSERT [dbo].[CustomerDocument] ([DocId], [ApplicationId], [Name], [Size]) VALUES (8, 9, N'interview written test_9.docx', NULL)
GO
INSERT [dbo].[CustomerDocument] ([DocId], [ApplicationId], [Name], [Size]) VALUES (9, 9, N'convertcsv_9.xlsx', NULL)
GO
SET IDENTITY_INSERT [dbo].[CustomerDocument] OFF
GO
SET IDENTITY_INSERT [dbo].[AdminUser] ON 
GO
INSERT [dbo].[AdminUser] ([Id], [Fullname], [UserLogin], [PasswordHash], [HasFullControl], [CreatedOn], [CreatedBy]) VALUES (1, N'Kaye Au', N'Kaye', 0x010000005555479AD9061F6EDD9F499C16C0A8EEFBD2CC8E8379E22D, 1, CAST(N'2020-03-02T18:33:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[AdminUser] ([Id], [Fullname], [UserLogin], [PasswordHash], [HasFullControl], [CreatedOn], [CreatedBy]) VALUES (2, N'May', N'May', 0x0100000085AC7ED077590646812387F44F818ED84B74A7520B8348B8, 1, CAST(N'2020-03-02T18:34:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[AdminUser] ([Id], [Fullname], [UserLogin], [PasswordHash], [HasFullControl], [CreatedOn], [CreatedBy]) VALUES (3, N'Daniel', N'Daniel', 0x010000008855A9F79004D8E9E6BE12F5C802CBD99FDB32196CE8EEB0, 1, CAST(N'2020-03-02T18:34:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[AdminUser] ([Id], [Fullname], [UserLogin], [PasswordHash], [HasFullControl], [CreatedOn], [CreatedBy]) VALUES (4, N'Jasper Chin', N'jasper', 0x0100000044F5ADA6C382B39BDCC19B79309A2A9DC650183530FDED16, 1, CAST(N'2020-03-08T11:36:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[AdminUser] ([Id], [Fullname], [UserLogin], [PasswordHash], [HasFullControl], [CreatedOn], [CreatedBy]) VALUES (1, N'Kaye Au', N'Kaye', 0x010000005555479AD9061F6EDD9F499C16C0A8EEFBD2CC8E8379E22D, 1, CAST(N'2020-03-02T18:33:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[AdminUser] ([Id], [Fullname], [UserLogin], [PasswordHash], [HasFullControl], [CreatedOn], [CreatedBy]) VALUES (2, N'May', N'May', 0x0100000085AC7ED077590646812387F44F818ED84B74A7520B8348B8, 1, CAST(N'2020-03-02T18:34:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[AdminUser] ([Id], [Fullname], [UserLogin], [PasswordHash], [HasFullControl], [CreatedOn], [CreatedBy]) VALUES (3, N'Daniel', N'Daniel', 0x010000008855A9F79004D8E9E6BE12F5C802CBD99FDB32196CE8EEB0, 1, CAST(N'2020-03-02T18:34:00' AS SmallDateTime), N'Kaye')
GO
INSERT [dbo].[AdminUser] ([Id], [Fullname], [UserLogin], [PasswordHash], [HasFullControl], [CreatedOn], [CreatedBy]) VALUES (4, N'Jasper Chin', N'jasper', 0x0100000044F5ADA6C382B39BDCC19B79309A2A9DC650183530FDED16, 1, CAST(N'2020-03-08T11:36:00' AS SmallDateTime), N'Kaye')
GO
SET IDENTITY_INSERT [dbo].[AdminUser] OFF
GO
SET IDENTITY_INSERT [dbo].[Agent] ON 
GO
INSERT [dbo].[Agent] ([AgentId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [BankName], [BankAccNo], [UserLogin], [PasswordHash], [SuperiorId], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (1, N'Kaye', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'kay', 0x01000000AEED4562DB02DFBA6FEBA3795CA848ADDF69C14B15F57A47, NULL, 1, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Agent] ([AgentId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [BankName], [BankAccNo], [UserLogin], [PasswordHash], [SuperiorId], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (2, N'May', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'may', 0x010000003C77C594B557712479EB8627CBDEC06993CFC75393A9F81B, NULL, 1, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Agent] ([AgentId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [BankName], [BankAccNo], [UserLogin], [PasswordHash], [SuperiorId], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (3, N'Daniel', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'daniel', 0x010000005FDA563682A3D1958276A69D5EB593625B2524540ABF9724, NULL, 1, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Agent] ([AgentId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [BankName], [BankAccNo], [UserLogin], [PasswordHash], [SuperiorId], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (1000, N'Xiao Chen Meng', N'XiaoChenMeng@dayrep.com', N'97928807747', N'Plunkett Home Furnishings', N'5906941048', N'2434 Fannie Street', N'Georgetown', N'Pulau Pinang', N'77808     ', N'Malaysia', N'0168888888', NULL, N'Maybank', N'3453536363634', N'xcm123', 0x01000000774737AE39CAE5C390523255532168E8271E2ECB7EC65518, 1, 1, CAST(N'2020-03-05T16:04:00' AS SmallDateTime), N'System', CAST(N'2020-03-07T17:55:00' AS SmallDateTime), N'Xiao Chen Meng')
GO
INSERT [dbo].[Agent] ([AgentId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [BankName], [BankAccNo], [UserLogin], [PasswordHash], [SuperiorId], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (1001, N'Tsui Li Hsieh', N'LiHsieh@dayrep.com', N'5296328547', N'Family Toy', N'2115970673', N'4136 Oakridge Lane', N'Georgetown', N'Pulau Pinang', N'31021     ', N'Malaysia', N'016-275-0643', NULL, NULL, NULL, N'lihsieh1', 0x01000000E908CC23B46B5B5B20461543B3365423A8B16F2871C9DC087D0D2F18A94BAED3, NULL, 1, CAST(N'2020-03-05T19:12:00' AS SmallDateTime), N'System', CAST(N'2020-03-05T19:12:00' AS SmallDateTime), N'System')
GO
INSERT [dbo].[Agent] ([AgentId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [BankName], [BankAccNo], [UserLogin], [PasswordHash], [SuperiorId], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (1005, N'Yang Xin Qian ', N'XinQianYang@jourrapide.co', N'97928807747', N'Stratacard', N'7107818813', N'2712 Prospect Valley Road', N'Georgetown', N'Pulau Pinang', N'90248     ', N'Malaysia', N'01310948739', NULL, NULL, NULL, N'Prahmen', 0x010000004D8F509B596C2A43F94ABEECDFCD4067C55B8B28E731D0CFE8F1FD0984718A12, NULL, 1, CAST(N'2020-03-05T22:03:00' AS SmallDateTime), N'System', CAST(N'2020-03-05T22:03:00' AS SmallDateTime), N'System')
GO
INSERT [dbo].[Agent] ([AgentId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [BankName], [BankAccNo], [UserLogin], [PasswordHash], [SuperiorId], [IsActive], [CreatedOn], [CreatedBy], [ModifiedOn], [ModifiedBy]) VALUES (1009, N'Wei Ku', N'WeiKu@rhyta.com', N'5296328547', NULL, NULL, N'11 North Avenue', N'Bayan Lepas', N'Pulau Pinang', N'11900     ', N'Malaysia', N'0127895620', NULL, NULL, NULL, N'Therstund', 0x010000000B47DEEE329A44340135ACE6054A0D9B8A60AA23C432F93C1507443535395AE4, NULL, 1, CAST(N'2020-03-05T22:18:00' AS SmallDateTime), N'System', CAST(N'2020-03-05T22:18:00' AS SmallDateTime), N'System')
GO
SET IDENTITY_INSERT [dbo].[Agent] OFF
GO
SET IDENTITY_INSERT [dbo].[DropdownItems] ON 
GO
INSERT [dbo].[DropdownItems] ([RecId], [FieldName], [Options]) VALUES (1, N'ResidentialType', N'Bungalow|Semi-D|Terrace|Condo/Apartment/Flat|Shophouse|Office')
GO
SET IDENTITY_INSERT [dbo].[DropdownItems] OFF
GO
SET IDENTITY_INSERT [dbo].[Registration] ON 
GO
INSERT [dbo].[Registration] ([RegId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [UserLogin], [PasswordHash], [SuperiorId], [ActivationCode], [ActivatedOn], [IsApproved], [ApprovalDate], [ApprovedBy], [CreatedOn]) VALUES (1, N'Xiao Chen Meng', N'XiaoChenMeng@dayrep.com', N'97928807747', N'Plunkett Home Furnishings', N'5906941048', N'2434 Fannie Street', N'Georgetown', N'Pulau Pinang', N'77808     ', N'Malaysia', N'0168888888', NULL, N'xcm123', 0x01000000774737AE39CAE5C390523255532168E8271E2ECB7EC65518, NULL, N'A4317D21-B237-4E8B-B1D0-CC8B36A49142', CAST(N'2020-03-05T16:04:00' AS SmallDateTime), 1, CAST(N'2020-03-04T23:35:00' AS SmallDateTime), N'Kaye', NULL)
GO
INSERT [dbo].[Registration] ([RegId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [UserLogin], [PasswordHash], [SuperiorId], [ActivationCode], [ActivatedOn], [IsApproved], [ApprovalDate], [ApprovedBy], [CreatedOn]) VALUES (2, N'Tsui Li Hsieh', N'LiHsieh@dayrep.com', N'5296328547', N'Family Toy', N'2115970673', N'4136 Oakridge Lane', N'Georgetown', N'Pulau Pinang', N'31021     ', N'Malaysia', N'016-275-0643', NULL, N'lihsieh1', 0x01000000E908CC23B46B5B5B20461543B3365423A8B16F2871C9DC087D0D2F18A94BAED3, NULL, N'CA53C2DE-8120-42F3-B6B9-52077B22172C', CAST(N'2020-03-05T19:12:00' AS SmallDateTime), 1, CAST(N'2020-03-05T18:44:00' AS SmallDateTime), N'Kaye', NULL)
GO
INSERT [dbo].[Registration] ([RegId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [UserLogin], [PasswordHash], [SuperiorId], [ActivationCode], [ActivatedOn], [IsApproved], [ApprovalDate], [ApprovedBy], [CreatedOn]) VALUES (3, N'Tsui Li Hsieh', N'LiHsieh@dayrep.com', N'5296328547', N'Family Toy', N'2115970673', N'4136 Oakridge Lane', N'Georgetown', N'Pulau Pinang', N'31021     ', N'Malaysia', N'016-275-0643', NULL, N'lihsieh1', 0x010000005D2ACB1CE44460BE72E5A39A87ABF180A0A73C17CF96B5F10D0462FBF5EE8614, NULL, NULL, NULL, 0, CAST(N'2020-03-05T19:19:00' AS SmallDateTime), N'Kaye', NULL)
GO
INSERT [dbo].[Registration] ([RegId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [UserLogin], [PasswordHash], [SuperiorId], [ActivationCode], [ActivatedOn], [IsApproved], [ApprovalDate], [ApprovedBy], [CreatedOn]) VALUES (4, N'Yang Xin Qian ', N'XinQianYang@jourrapide.co', N'97928807747', N'Stratacard', N'7107818813', N'2712 Prospect Valley Road', N'Georgetown', N'Pulau Pinang', N'90248     ', N'Malaysia', N'01310948739', NULL, N'Prahmen', 0x010000004D8F509B596C2A43F94ABEECDFCD4067C55B8B28E731D0CFE8F1FD0984718A12, NULL, N'F38373F5-B440-480B-95BE-5E720E38A368', CAST(N'2020-03-05T22:03:00' AS SmallDateTime), 1, CAST(N'2020-03-05T21:45:00' AS SmallDateTime), N'Kaye', CAST(N'2020-03-05T21:34:00' AS SmallDateTime))
GO
INSERT [dbo].[Registration] ([RegId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [UserLogin], [PasswordHash], [SuperiorId], [ActivationCode], [ActivatedOn], [IsApproved], [ApprovalDate], [ApprovedBy], [CreatedOn]) VALUES (5, N'Wei Ku', N'WeiKu@rhyta.com', N'5296328547', NULL, NULL, N'11 North Avenue', N'Bayan Lepas', N'Pulau Pinang', N'11900     ', N'Malaysia', N'0127895620', NULL, N'Therstund', 0x010000000B47DEEE329A44340135ACE6054A0D9B8A60AA23C432F93C1507443535395AE4, NULL, N'58D338EF-AA92-490B-A68D-DE5290E2DBA0', CAST(N'2020-03-05T22:18:00' AS SmallDateTime), 1, CAST(N'2020-03-05T22:17:00' AS SmallDateTime), N'Kaye', CAST(N'2020-03-05T21:36:00' AS SmallDateTime))
GO
INSERT [dbo].[Registration] ([RegId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [UserLogin], [PasswordHash], [SuperiorId], [ActivationCode], [ActivatedOn], [IsApproved], [ApprovalDate], [ApprovedBy], [CreatedOn]) VALUES (6, N'Susan Teoh', N'SusanJFinkle@armyspy.com', N'82963285476', NULL, NULL, N'3944 Delaware Avenue', N'Bayan Lepas', N'Pulau Pinang', N'11900     ', N'Malaysia', N'0196548523', NULL, N'Retontook', 0x01000000D24E3A34745904A7469FBC18ACDD9E0187B3F381B01AAF9225445E601D88A847, 1, NULL, NULL, NULL, NULL, NULL, CAST(N'2020-03-05T21:37:00' AS SmallDateTime))
GO
INSERT [dbo].[Registration] ([RegId], [Fullname], [Email], [Nric], [CompanyName], [CompanyRegNo], [Address], [City], [State], [Postcode], [Country], [MobileNo], [TelNo], [UserLogin], [PasswordHash], [SuperiorId], [ActivationCode], [ActivatedOn], [IsApproved], [ApprovalDate], [ApprovedBy], [CreatedOn]) VALUES (7, N'Willie Loh', N'WillieL@armyspy.com', N'87928807747', NULL, NULL, N'1953 Sand Fork Road', N'Bayan Lepas', N'Pulau Pinang', N'11900     ', N'Malaysia', N'0125896357', NULL, N'Fellnisomer', 0x010000005047940D50A2F4F09DD0CBEE0C30723385C0E6AD3FDF2307F0FDF6721601C474, NULL, NULL, NULL, NULL, NULL, NULL, CAST(N'2020-03-05T21:38:00' AS SmallDateTime))
GO
SET IDENTITY_INSERT [dbo].[Registration] OFF
GO
