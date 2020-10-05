CREATE PROCEDURE [dbo].[prc_GetWithdrawalToSubmit]  
 @prCurrentPage INT,  
 @prPageSize INT,  
 @prSortColumn VARCHAR(50),  
 @prSortInAsc BIT,  
 @prAgent VARCHAR(25),  
 @prSearchKeyword VARCHAR(150),  
 @prSubmittedFrom SMALLDATETIME = NULL,  
 @prSubmittedTo SMALLDATETIME = NULL,  
 @oTotalRecord INT OUTPUT,  
 @oTotalIncentives DECIMAL(12,2) OUTPUT,  
 @oTotalDeduction DECIMAL(12,2) OUTPUT  
AS 
BEGIN  
	IF OBJECT_ID('tempdb..#temp_Table') IS NOT NULL DROP TABLE ##temp_Table  

	DECLARE @vStoreProcName VARCHAR(50) = OBJECT_NAME(@@PROCID),  
			@vSelectQuery NVARCHAR(MAX)  
  
	CREATE TABLE ##temp_Table (  
		  ApplicationId INT,  
		  ClaimCommId INT,  
		  TransactionDetails VARCHAR(250),  
		  PackageName VARCHAR(150),  
		  CreatedOn SMALLDATETIME,  
		  PackageComm MONEY,  
		  AgentComm SMALLINT,  
		  ClaimAmount MONEY,  
		  DeductAmount MONEY,  
		  TransactionType VARCHAR(50),   
		  Selected BIT  
	 )  
  
	 DECLARE @var_Table TABLE(  
		 ApplicationId INT,  
		  ClaimCommId INT,  
		  TransactionDetails VARCHAR(250),  
		  PackageName VARCHAR(150),  
		  CreatedOn SMALLDATETIME,  
		  PackageComm MONEY,  
		  AgentComm SMALLINT,  
		  ClaimAmount MONEY,  
		  DeductAmount MONEY,  
		  TransactionType VARCHAR(50),   
		  Selected BIT,  
		  RowNum INT  
	 )  
  
	 BEGIN TRY  
		  SET @prSortColumn = CASE WHEN @prSortColumn IS NULL THEN 'Selected DESC, CreatedOn' ELSE @prSortColumn END  
  
		  -- get row from and row to based on current page  
		  SELECT @vSelectQuery = dbo.fn_GenerateDynamicQuery(@prCurrentPage, @prPageSize, @prSortColumn, @prSortInAsc)  
  
		  INSERT INTO ##temp_Table  
		  -- AGENT CHARGES
		  SELECT ApplicationId = NULL,  
				ClaimCommId = NULL,          
				TransactionDetails = ap.Description,   
				PackageName = NULL,   
				ap.CreatedOn,   
				PackageComm = NULL,  
				AgentComm = NULL,   
				ClaimAmount = CASE WHEN ap.Flow = 'In' THEN ISNULL(ap.Amount,0) ELSE 0 END,   
				DeductAmount = CASE WHEN ap.Flow = 'Out' THEN ISNULL(ap.Amount,0) ELSE 0 END,  
				TransactionType = CASE WHEN ap.Flow = 'Out' Then 'Charges' ELSE 'Incentives' END,  
				Selected = CAST (1 AS BIT)  
		  FROM AgentPocket ap  
		  WHERE ap.Agent = @prAgent  
		  AND ISNULL(Cancelled, 0) = 0  
		  AND ap.WithdrawalId IS NULL  
		  UNION ALL  
		  -- CLAWBACK
		  SELECT   
			   ca.ApplicationId,  
			   cc.ClaimCommId,  
			   TransactionDetails = ca.CustomerName,  
			   pp.PackageName,  
			   ca.CreatedOn ,  
			   PackageComm = cc.PackageCommOnDate,  
			   AgentComm = cc.AgentCommOnDate,  
			   ClaimAmount =  0, --CAST(ROUND((cc.PackageCommOnDate * cc.AgentCommOnDate) * 1.0 / 100, 2) AS MONEY) ,  
			   DeductAmount = CASE WHEN NOT c.ClawbackId IS NULL AND cc.DeductedWithdrawalId IS NULL THEN CAST(ROUND((cc.PackageCommOnDate * cc.AgentCommOnDate) * 1.0 / 100, 2) AS MONEY) ELSE 0 END,  
			   TransactionType = CASE WHEN NOT c.ClawbackId IS NULL AND cc.DeductedWithdrawalId IS NULL THEN 'Clawback'  END,  
			   Selected = CAST(CASE WHEN NOT c.ClawbackId IS NULL AND cc.DeductedWithdrawalId IS NULL THEN 1 ELSE 0 END AS BIT) -- Make this record selected by default  
		  FROM ClaimableCommission cc  
		  INNER JOIN Agent a ON cc.AgentId = a.AgentId  
		  INNER JOIN CustomerApplication ca ON ca.ApplicationId = cc.ApplicationId  
		  INNER JOIN ApplicationStatus s ON s.AppStatusId = ca.AppStatusId  
		  INNER JOIN ProductPackage pp ON ca.ProdPkgId = pp.ProdPkgId  
		  INNER JOIN Clawback c ON c.ApplicationId = ca.ApplicationId  
		  LEFT JOIN Withdrawal w ON cc.ClaimWithdrawalId = w.WithdrawalId  
		  WHERE a.UserLogin = @prAgent  
		  AND ca.DocumentCompleted = 1  
		  AND 1 =  CASE WHEN s.Status = 'Post Complete' THEN 1  
						WHEN s.Status = 'Cancel' AND  NOT cc.ClaimWithdrawalId IS NULL THEN 1  
						ELSE 0  
					END  
		  AND 1 = CASE WHEN cc.ClaimWithdrawalId IS NULL AND cc.DeductedWithdrawalId IS NULL THEN 1  
					   WHEN NOT cc.ClaimWithdrawalId IS NULL AND w.Status = 'Terminated' THEN 1  
					   WHEN NOT c.ClawbackId IS NULL AND (cc.DeductedWithdrawalId IS NULL OR w.Status = 'Terminated') THEN 1  
					   ELSE 0  
					END  
		   AND 1 = CASE WHEN ISNULL(@prSubmittedFrom,'') = '' AND ISNULL(@prSubmittedTo,'') = '' THEN 1  
						WHEN ca.CreatedOn  BETWEEN @prSubmittedFrom AND @prSubmittedTo THEN 1  
						ELSE 0  
					END  
		   AND 1 = CASE WHEN ISNULL(@prSearchKeyword,'') = '' THEN 1  
						WHEN ca.CustomerName LIKE '%' + @prSearchKeyword + '%' THEN 1  
						WHEN CAST(ca.OrderNo AS VARCHAR(150)) LIKE '%' + @prSearchKeyword + '%' THEN 1  
						ELSE 0  
					END  
		  UNION ALL
		  -- AGENT COMMISSION
		  SELECT   
			   ca.ApplicationId,  
			   cc.ClaimCommId,  
			   TransactionDetails = ca.CustomerName,  
			   pp.PackageName,  
			   ca.CreatedOn ,  
			   PackageComm = cc.PackageCommOnDate,  
			   AgentComm = cc.AgentCommOnDate,  
			   ClaimAmount =  CAST(ROUND((cc.PackageCommOnDate * cc.AgentCommOnDate) * 1.0 / 100, 2) AS MONEY) ,  
			   DeductAmount = 0, --CASE WHEN NOT c.ClawbackId IS NULL AND cc.DeductedWithdrawalId IS NULL THEN CAST(ROUND((cc.PackageCommOnDate * cc.AgentCommOnDate) * 1.0 / 100, 2) AS MONEY) ELSE 0 END,  
			   TransactionType = CASE WHEN cc.IsOverride = 1  THEN 'Override'   ELSE 'Own Sales'  END,  
			   Selected = 0 -- CAST(CASE WHEN NOT c.ClawbackId IS NULL AND cc.DeductedWithdrawalId IS NULL THEN 1 ELSE 0 END AS BIT) -- Make this record selected by default  
		  FROM ClaimableCommission cc  
		  INNER JOIN Agent a ON cc.AgentId = a.AgentId  
		  INNER JOIN CustomerApplication ca ON ca.ApplicationId = cc.ApplicationId  
		  INNER JOIN ApplicationStatus s ON s.AppStatusId = ca.AppStatusId  
		  INNER JOIN ProductPackage pp ON ca.ProdPkgId = pp.ProdPkgId  
		  --LEFT JOIN Clawback c ON c.ApplicationId = ca.ApplicationId  
		  LEFT JOIN Withdrawal w ON cc.ClaimWithdrawalId = w.WithdrawalId  
		  WHERE a.UserLogin = @prAgent  
		  AND ca.DocumentCompleted = 1  
		  --AND s.Status = 'Post Complete'  
		  AND 1 =  CASE WHEN s.Status = 'Post Complete' THEN 1  
						WHEN s.Status = 'Cancel' AND  NOT  cc.ClaimWithdrawalId IS NULL THEN 1  
			   ELSE 0  
			 END  
		  AND 1 = CASE  --WHEN NOT c.ClawbackId IS NULL  AND cc.ClaimWithdrawalId IS NULL THEN 0
					  WHEN cc.ClaimWithdrawalId IS NULL AND cc.DeductedWithdrawalId IS NULL THEN 1  
						  WHEN NOT cc.ClaimWithdrawalId IS NULL AND w.Status = 'Terminated' THEN 1  
						  --WHEN NOT c.ClawbackId IS NULL AND (cc.DeductedWithdrawalId IS NULL OR w.Status = 'Terminated') THEN 1  
						  ELSE 0  
						END  
		   AND 1 = CASE WHEN ISNULL(@prSubmittedFrom,'') = '' AND ISNULL(@prSubmittedTo,'') = '' THEN 1  
						WHEN ca.CreatedOn  BETWEEN @prSubmittedFrom AND @prSubmittedTo THEN 1  
						ELSE 0  
					END  
		   AND 1 = CASE WHEN ISNULL(@prSearchKeyword,'') = '' THEN 1  
						WHEN ca.CustomerName LIKE '%' + @prSearchKeyword + '%' THEN 1  
						WHEN CAST(ca.OrderNo AS VARCHAR(150)) LIKE '%' + @prSearchKeyword + '%' THEN 1  
						ELSE 0  
					END  
  
		  print @vSelectQuery  
  
		  -- insert the dynamic query results into temp table  
		  INSERT INTO @var_Table  
		  EXEC SP_ExecuteSQL @vSelectQuery  
  
		  SELECT ClaimCommId,  
				ApplicationId,  
				TransactionDetails,  
				PackageName,  
				TransactionDate = FORMAT(CreatedOn, 'MM/dd/yyyy'),  
				PackageComm,  
				AgentComm,  
				ClaimAmount = ISNULL(ClaimAmount,0),  
				DeductAmount = ISNULL(DeductAmount,0),  
				TransactionType,  
				Selected  
		  FROM @var_Table  
		  ORDER BY TransactionDetails  
  
		  SELECT @oTotalRecord = COUNT(ClaimCommId) FROM ##temp_Table  
		  SELECT @oTotalDeduction = SUM(ROUND(DeductAmount, 2, 1)) FROM ##temp_Table   
		  SELECT @oTotalIncentives = SUM(ROUND(ClaimAmount, 2, 1)) FROM ##temp_Table WHERE TransactionType = 'Incentives'  
  
		  IF @oTotalDeduction IS NULL SET @oTotalDeduction = 0  
		  IF @oTotalIncentives IS NULL SET @oTotalIncentives = 0  
	   --SET @oTotalIncentives = 0    
  
		 DROP TABLE  ##temp_Table  
	 END TRY   
	 BEGIN CATCH  
	  EXECUTE prc_LogError @vStoreProcName;  
	 END CATCH;   
END