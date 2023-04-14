USE [PROYECTOS]
GO
/****** Object:  StoredProcedure [dbo].[PA_PRY_ProvDiesel]    Script Date: 14/02/2023 11:47:13 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Autor:		Christian Acosta
-- Nombre:		PA_PRY_ProveedorDiesel
-- Create date: 20/ene/2023
-- Description:	Sive para las operaciones de PRY_ProveedorDiesel.
-- Opciones:
--		'CT'  --> Consulta la tabla PRY_ProveedorDiesel
--		'C'   --> Consulta registros activos de la tabla PRY_ProveedorDiesel
--		'CI'  --> Consulta un registro de la tabla PRY_ProveedorDiesel por Id.
--		'G'   --> Guarda y modifica registros de la tabla PRY_ProveedorDiesel
--	    'CPA' --> Consulta las agencias por Id de proveedor
-- Log Modificaciones:
-- |	Fecha	|	Usuario		| Cambio												|
-- |------------------------------------------------------------------------------------|
-- |			|				|														|
-- |			|				|														|
-- |------------------------------------------------------------------------------------|
-- =============================================
ALTER PROCEDURE [dbo].[PA_PRY_ProvDiesel]
	@xmlParametrosP as Xml
AS
Begin
	SET NOCOUNT ON;

	-- Parametros
	Declare	@strOpcion			VarChar(3),
			@strUsuario			VarChar(30),
			@strPrograma		VarChar(50),
			@blnActivo			Bit,
			@blnHistorico		Bit,
			@intId				bigint,
			@intSemana			bigint,
			@strJustificacion	VarChar(255),
			@strActividades		VarChar(Max),
			@strObservaciones	VarChar(Max),
			@pass				VarBinary(MAX),
			@maxProveedor	    Bigint,
			@strEstatus			Varchar(30)

	-- Variables Internas
	Declare	@xmlParametros	Xml,
			@xmlAnterior	Xml,
			@strClaveModulo		Varchar(10) = 'PRY',
			@strTabla			Varchar(150) = 'PRY_ProvDiesel',
			@strAccion			Varchar(150),
			@ErrorMessage		NVARCHAR(4000),
			@ErrorSeverity		INT,
			@ErrorState			INT,
			@intFolio			BigInt,
			@intIdProyecto		BigInt,
			@strUsuarioAsignado Varchar(100),
			@strCorreo			Varchar(100),
			@strCopia			Varchar(100),
			@strAsuntoCorreo	Varchar(150),
			@strCuerpoCorreo	Varchar(Max)

	Declare	@dttEstatus Table
			(
				IdEstatus		BigInt,
				ClaveEstatus	VarChar(10),
				NomEstatus		VarChar(150)
			)
	--Leer parametros 
	set @xmlParametros = @xmlParametrosP
	Select	@strOpcion	= M.Item.query('./Opcion').value('.', 'varchar(3)'),
				@strUsuario	= M.Item.query('./Usuario').value('.', 'varchar(30)'),
				@strPrograma= M.Item.query('./Programa').value('.', 'VarChar(50)'),
				@blnActivo = M.Item.query('./clsPRY_ProveedorDiesel/Activo').value('.', 'bit')
				,@intId = M.Item.query('./clsPRY_ProveedorDiesel/Id').value('.', 'bigint'),
				@maxProveedor = M.Item.query('./clsPRY_ProveedorDiesel/Segmento_Prov').value('.', 'bigint'),
				@strEstatus	= M.Item.query('./clsPRY_ProveedorDiesel/Estatus').value('.', 'varchar(30)')
		From	@xmlParametros.nodes('clsParametros') M(Item)


	If @strOpcion = 'C' -- CONSULTA PROVEEDORES ACTIVOS
	Begin
		Select PROV_Id As Id,
			   PROV_NombreVendedor As NombreVendedor,
			   PROV_Proveedor As Nombre,
			   PROV_Proveedor As Proveedor,
			   PROV_Telefono As Telefono,
			   PROV_Correo As Correo,
			   ---CAT_FormaDePago As FormaDePago,
			   PROV_Fecha As Fecha,
			   PROV_UsuarioCreacion As UsuarioCreacion,
			   --FormaDePago.Nombre As FormaPagoText,
			   PROV_Activo As Activo,
			   ISNULL((
					select top 1 STUFF((select ', ' + Catalogo.Nombre
							From PRY_CatalogosProv Agencia
							Left Join vwCatalogos Catalogo
							On Catalogo.Id = Agencia.Id_CatAgencia
							Where Agencia.Id_Prov = PRY_ProvDiesel.PROV_Id
							for xml path('')),1,2,'')
					From PRY_CatalogosProv Agencia
					Left Join vwCatalogos Catalogo
					On Catalogo.Id = Agencia.Id_CatAgencia
					Where Agencia.Id_Prov = PRY_ProvDiesel.PROV_Id
				   ), '') As PresenciaAgencia,
				ISNULL((
					select top 1 STUFF((select ', ' + Catalogo.Nombre
							From PRY_CatalogosProv Agencia
							Left Join vwCatalogos Catalogo
							On Catalogo.Id = Agencia.Id__CatFormaDePago
							Where Agencia.Id_Prov = PRY_ProvDiesel.PROV_Id
							for xml path('')),1,2,'')
					From PRY_CatalogosProv Agencia
					Left Join vwCatalogos Catalogo
					On Catalogo.Id = Agencia.Id__CatFormaDePago
					Where Agencia.Id_Prov = PRY_ProvDiesel.PROV_Id
				   ), '') As FormaDePago
		From PRY_ProveedoresDiesel PRY_ProvDiesel With(NoLock)
		--	Left Join vwCatalogos FormaDePago With(NoLock) 
		--	on FormaDePago.Id = PRY_ProvDiesel.CAT_FormaDePago
		Where PROV_Activo = 1
		Order By PROV_Id Desc
	Return
	End

	If @strOpcion = 'CPS' -- TRAER PROVEEDORES POR SEGMENTACION DE LA LICITACION
	Begin
		Select Top (@maxProveedor) PROV_Proveedor,
			LTS_Trc As Lts_Torreon	
		From PRY_ProveedoresDiesel
		--Join para traer los costos de la licitacion
		left join PRY_LicitacionDieselDetalle licDetalle
		on PROV_Id = licDetalle.Id_Prov
		--Where LTS_Trc < 1000
	    --Condicion para traer el del precio mas economico
	Return
	End

	If @strOpcion = 'CDP' -- CONSULTA PROVEEDORES CON DETALLE DE PRECIO DE PUJA 
	Begin
		Select PROV_Id As Id,
			   PROV_NombreVendedor As NombreVendedor,
			   PROV_Proveedor As Nombre,
			   PROV_Proveedor As Proveedor,
			   PRE_Trc As PrecioTrc,
			   PRE_Mty As PrecioMty,
			   PRE_Qrt As PrecioQrt,
			   PRE_Manz As PrecioManz,
			   PRE_NvoLaredo As PrecioNvoLaredo
	    From PRY_ProveedoresDiesel With(NoLock)
			Left Join PRY_LicitacionDieselDetalle LicitacionDetalle
			On PROV_Id = LicitacionDetalle.Id_Prov
		Where PROV_Id = LicitacionDetalle.Id_Prov And PROV_Estatus = 'Pujando'
		--Where PROV_Id = LicitacionDetalle.Id_Prov And LicitacionDetalle.LIC_Estatus = 'Pujando'
	Return
	End

	If @strOpcion = 'CI' -- CONSULTA PROVEEDORES POR ID
	Begin
		Select PROV_Id As Id,
			   PROV_NombreVendedor As NombreVendedor,
			   PROV_Proveedor As Nombre,
			   PROV_Proveedor As Proveedor,
			   PROV_Telefono As Telefono,
			   PROV_Correo As Correo,
			   --CAT_FormaDePago As FormaDePago,
			   PROV_Fecha As Fecha,
			   PROV_UsuarioCreacion As UsuarioCreacion,
			   --FormaDePago.Nombre As FormaPagoText,
			   PROV_Activo As Activo,
			   UsuarioWeb.USU_Password As PasswordReset,
			   UsuarioWeb.USU_Usuario As UsuarioReset,
			   isnull((
				select top 1  stuff((select ', ' + Catalogo.Nombre
						from PRY_ProveedoresAgencia Agencia
						left join vwCatalogos Catalogo
							on Catalogo.Id = Agencia.CAT_PresenciaAgencia
						where Agencia.PROV_IdAge = PRY_ProvDiesel.PROV_Id
						for xml path('')),1,2,'') 
				from PRY_ProveedoresAgencia Agencia
				-- ID 
				left join vwCatalogos Catalogo
					on Catalogo.Id = Agencia.CAT_PresenciaAgencia
						where Agencia.PROV_IdAge = PRY_ProvDiesel.PROV_Id
				),'') as PresenciaAgencia
		From PRY_ProveedoresDiesel PRY_ProvDiesel With(NoLock)
			Left Join CORE_WEB..CORE_WEB_Usuarios UsuarioWeb With(NoLock)
			on UsuarioWeb.USU_IdProveedorDiesel = PRY_ProvDiesel.PROV_Id
		Where PROV_Id = @intId
	Return
	End


	If @strOpcion = 'CT' -- CONSULTA TODOS LOS PROVEEDORES
	Begin
		Select PROV_Id As Id,
			   PROV_NombreVendedor As NombreVendedor,
			   PROV_Proveedor As Nombre,
			   PROV_Proveedor As Proveedor,
			   PROV_Telefono As Telefono,
			   PROV_Correo As Correo,
			  -- CAT_FormaDePago As FormaDePago,
			   PROV_Fecha As Fecha,
			   PROV_UsuarioCreacion As UsuarioCreacion,
			  -- FormaDePago.Nombre As FormaPagoText,
			   PROV_Activo As Activo,
			   isnull((
				select top 1  stuff((select ', ' + Catalogo.Nombre
						from PRY_ProveedoresAgencia Agencia
						left join vwCatalogos Catalogo
							on Catalogo.Id = Agencia.CAT_PresenciaAgencia
						where Agencia.PROV_IdAge = PRY_ProvDiesel.PROV_Id
						for xml path('')),1,2,'') 
				from PRY_ProveedoresAgencia Agencia
				left join vwCatalogos Catalogo
					on Catalogo.Id = Agencia.CAT_PresenciaAgencia
						where Agencia.PROV_IdAge = PRY_ProvDiesel.PROV_Id
				),'') as PresenciaAgencia
		From PRY_ProveedoresDiesel PRY_ProvDiesel With(NoLock)
	    Order By PROV_Id Desc
	Return
	End

	If @strOpcion = 'CPA' --CONSULTA PRESENCIA AGENCIA POR ID DE PROVEEDOR 
	Begin
		Select Catalogo.Id As Id,
			   Catalogo.Clave As Clave,
			   Catalogo.Nombre As Nombre,
			   Catalogo.Descripcion As Descripcion
		From vwCatalogos Catalogo
		Left Join PRY_CatalogosProv As Agencia
			on Agencia.Id_CatAgencia = Catalogo.Id
		Where Agencia.Id_Prov = @intId
	Return
	End

	If @strOpcion = 'CPP' --CONSULTA TIPO DE PAGO POR ID DE PROVEEDOR 
	Begin
		Select Catalogo.Id As Id,
			   Catalogo.Clave As Clave,
			   Catalogo.Nombre As Nombre,
			   Catalogo.Descripcion As Descripcion
		From vwCatalogos Catalogo
		Left Join PRY_CatalogosProv As Pago
			on Pago.Id__CatFormaDePago = Catalogo.Id
		Where Pago.Id_Prov = @intId
	Return
	End

	If @strOpcion = 'CPU' -- TRAER ID PROVEEDOR POR USUARIO
	Begin
		Select PROV_Id As Id,
			   --CAT_FormaDePago As FormaDePago,
				ISNULL((
					select top 1 STUFF((select ', ' + Catalogo.Nombre
							From PRY_CatalogosProv Agencia
							Left Join vwCatalogos Catalogo
							On Catalogo.Id = Agencia.Id_CatAgencia
							Where Agencia.Id_Prov = PRY_ProvDiesel.PROV_Id
							for xml path('')),1,2,'')
					From PRY_CatalogosProv Agencia
					Left Join vwCatalogos Catalogo
					On Catalogo.Id = Agencia.Id_CatAgencia
					Where Agencia.Id_Prov = PRY_ProvDiesel.PROV_Id
				   ), '') As PresenciaAgencia,
				   ISNULL((
					select top 1 STUFF((select ', ' + cast(Catalogo.Id as varchar)
							From PRY_CatalogosProv Agencia
							Left Join vwCatalogos Catalogo
							On Catalogo.Id = Agencia.Id_CatAgencia
							Where Agencia.Id_Prov = PRY_ProvDiesel.PROV_Id
							for xml path('')),1,2,'')
					From PRY_CatalogosProv Agencia
					Left Join vwCatalogos Catalogo
					On Catalogo.Id = Agencia.Id_CatAgencia
					Where Agencia.Id_Prov = PRY_ProvDiesel.PROV_Id
				   ), '') As IdAgencia,
				   ISNULL((
					select top 1 STUFF((select ', ' + Catalogo.Nombre
							From PRY_CatalogosProv Agencia
							Left Join vwCatalogos Catalogo
							On Catalogo.Id = Agencia.Id__CatFormaDePago
							Where Agencia.Id_Prov = PRY_ProvDiesel.PROV_Id
							for xml path('')),1,2,'')
					From PRY_CatalogosProv Agencia
					Left Join vwCatalogos Catalogo
					On Catalogo.Id = Agencia.Id__CatFormaDePago
					Where Agencia.Id_Prov = PRY_ProvDiesel.PROV_Id
				   ), '') As FormaDePago
			From PRY_ProveedoresDiesel PRY_ProvDiesel With(NoLock)
		Left Join CORE_WEB..CORE_WEB_Usuarios Usuario
		 on PROV_Id = Usuario.USU_IdProveedorDiesel
		where Usuario.USU_Usuario = @strUsuario
	Return
	End

	If @strOpcion = 'VPW' -- TRAER ID PROVEEDOR PARA MANDARLO POR POST
	Begin
		Select USU_IdProveedorDiesel As IdProv
		From CORE_WEB..CORE_WEB_Usuarios
		Where USU_Usuario = @strUsuario
	Return
	End

	If @strOpcion = 'AEP' -- ACTUALIZAR ESTATUS DEL PROVVEDOR POR ID
	Begin
		Update PRY_ProveedoresDiesel
		Set PROV_Estatus = @strEstatus
		Where PROV_Id = @intId
	Return
	End


	--TEST 
	--If @strOpcion = 'T' 
	-- Begin 
	--	Select --INFO PROVEEDOR
	--		   --Id_Prov,
	--		   PROV_Id As IdProv,
	--		   PROV_NombreVendedor As Vendedor,
	--		   PROV_Telefono As Telefono,
	--		   PROV_Correo As Correo,
	--		   PROV_Fecha As Fecha,
	--		   PROV_UsuarioCreacion As UsuarioCrea,
	--		   PROV_Proveedor As Proveedor,
	--		   PROV_Activo As Activo,
	--		   PROV_Estatus As Estatus,
	--		   -- TIPO DE PAGO
	--		   MAX([68925]) As AmeExpress,
	--		   MAX([68922]) As Contado,
	--		   MAX([68926]) As Credi4,
	--		   MAX([68923]) As Credi7,
	--		   MAX([68924]) As Prepago,
	--		   --PRESENCIA AGENCIA
	--		   --MAX([68932]) AS Manzanillo,
	--		   --MAX([68929]) As Monterrey,
	--		   --MAX([69830]) As NuevoLaredo,
	--		   --MAX([68931]) As Queretaro,
	--		  -- MAX([68928]) As Torreon
	--		  -- LICITACION DETALLE
	--			PREContado_Trc,
	--			IVAContado_Trc,
	--			PREPrepago_Trc,
	--			IVAPrepago_Trc,
	--			PRECredito4_Trc,
	--			IVACredito4_Trc,
	--			PRECredito7_Trc,
	--			IVACredito7_Trc,
	--			PREAme_Trc,
	--			IVAAme_Trc,
	--			PREContado_Mty,
	--			IVAContado_Mty,
	--			PREPrepago_Mty,
	--			IVAPrepago_Mty,
	--			PRECredito4_Mty,
	--			IVACredito4_Mty,
	--			PRECredito7_Mty,
	--			IVACredito7_Mty,
	--			PREAme_Mty,
	--			IVAAme_Mty,
	--			PREContado_Qrt,
	--			IVAContado_Qrt,
	--			PREPrepago_Qrt,
	--			IVAPrepago_Qrt,
	--			PRECredito4_Qrt,
	--			IVACredito4_Qrt,
	--			PRECredito7_Qrt,
	--			IVACredito7_Qrt,
	--			PREAme_Qrt,
	--			IVAAme_Qrt,
	--			PREContado_Manz,
	--			IVAContado_Manz,
	--			PREPrepago_Manz,
	--			IVAPrepago_Manz,
	--			PRECredito4_Manz,
	--			IVACredito4_Manz,
	--			PRECredito7_Manz,
	--			IVACredito7_Manz,
	--			PREAme_Manz,
	--			IVAAme_Manz,
	--			PREContado_NvoLaredo,
	--			IVAContado_NvoLaredo,
	--			PREPrepago_NvoLaredo,
	--			IVAPrepago_NvoLaredo,
	--			PRECredito4_NvoLaredo,
	--			IVACredito4_NvoLaredo,
	--			PRECredito7_NvoLaredo,
	--			IVACredito7_NvoLaredo,
	--			PREAme_NvoLaredo,
	--			IVAAme_NvoLaredo, 
	--			PRE_SinIVATrc As PrecSinIVATrc, 
	--			PRE_SinIVAMty As PrecSinIVAMty,
	--			PRE_SinIVAQrt As PrecSinIVAQrt,
	--			PRE_SinIVAManz As PrecSinIVAManz,
	--			PRE_SinIVANvoLaredo As PrecSinIVANvoLaredo
	--	From(
	--		Select PROV_Id, Id__CatFormaDePago, Id_CatAgencia, PROV_NombreVendedor, PROV_Telefono, PROV_Correo, PROV_Fecha, 
	--			   PROV_UsuarioCreacion, PROV_Proveedor, PROV_Activo, PROV_Estatus,
	--			   PREContado_Trc,
	--			   IVAContado_Trc,  PREPrepago_Trc, IVAPrepago_Trc, PRECredito4_Trc, IVACredito4_Trc, PRECredito7_Trc, IVACredito7_Trc,
	--			   PREAme_Trc, IVAAme_Trc,	PREContado_Mty,	IVAContado_Mty,	PREPrepago_Mty, IVAPrepago_Mty,	PRECredito4_Mty,IVACredito4_Mty,
	--			   PRECredito7_Mty, IVACredito7_Mty, PREAme_Mty,IVAAme_Mty, PREContado_Qrt, IVAContado_Qrt,PREPrepago_Qrt, IVAPrepago_Qrt,
	--			   PRECredito4_Qrt, IVACredito4_Qrt, PRECredito7_Qrt, IVACredito7_Qrt, PREAme_Qrt,	IVAAme_Qrt, PREContado_Manz, IVAContado_Manz, PREPrepago_Manz,
	--			   IVAPrepago_Manz, PRECredito4_Manz, IVACredito4_Manz, PRECredito7_Manz, IVACredito7_Manz,PREAme_Manz, IVAAme_Manz, PREContado_NvoLaredo,	IVAContado_NvoLaredo,
	--			   PREPrepago_NvoLaredo, IVAPrepago_NvoLaredo,	PRECredito4_NvoLaredo, IVACredito4_NvoLaredo, PRECredito7_NvoLaredo, IVACredito7_NvoLaredo, PREAme_NvoLaredo,
	--			   IVAAme_NvoLaredo, PRE_SinIVATrc, PRE_SinIVAMty, PRE_SinIVAQrt, PRE_SinIVAManz, PRE_SinIVANvoLaredo
	--			   --From PRY_ProveedoresDiesel As Proveedores With(NoLock)
	--			   --Join PRY_CatalogosProv As Catalogo
	--			   --On Catalogo.Id_Prov = Proveedores.PROV_Id
	--			   --Join PRY_LicitacionDetPuja As Puja 
	--			   --On Puja.Id_Prov = Proveedores.PROV_Id
	--			   From PRY_CatalogosProv as Catalogo With(NoLock)
	--			   Left Join PRY_ProveedoresDiesel as Proveedor 
	--			   On Catalogo.Id_Prov = Proveedor.PROV_Id
	--			   Left Join PRY_LicitacionDetPuja As Puja
	--			   On Catalogo.Id_Prov = Puja.Id_Prov
	--			   Where Proveedor.PROV_Activo = 1
	--			   --Where Proveedor.PROV_Estatus != 'Nuevo'
	--	     ) as Detalle
	--			   Pivot(MAX(Id__CatFormaDePago) for Id__CatFormaDePago In ([68925],[68922],[68926], [68923],[68924])) as pivotePago
	--			   --Pivot(MAX(Id_CatAgencia) for Id_CatAgencia In ([68932],[68929],[69830],[68931],[68928])) as pivoteAgencia
	--			   --Where PRY_ProveedoresDiesel.PROV_Id = @intId
	--		Group By PROV_Id, PROV_NombreVendedor, PROV_Telefono, PROV_Correo, PROV_Fecha, PROV_UsuarioCreacion, PROV_Proveedor, PROV_Activo, PROV_Estatus, PREContado_Trc,
	--				IVAContado_Trc,  PREPrepago_Trc, IVAPrepago_Trc, PRECredito4_Trc, IVACredito4_Trc, PRECredito7_Trc, IVACredito7_Trc,
	--				PREAme_Trc, IVAAme_Trc,	PREContado_Mty,	IVAContado_Mty,	PREPrepago_Mty, IVAPrepago_Mty,	PRECredito4_Mty,IVACredito4_Mty,
	--				PRECredito7_Mty, IVACredito7_Mty, PREAme_Mty,IVAAme_Mty, PREContado_Qrt, IVAContado_Qrt,PREPrepago_Qrt, IVAPrepago_Qrt,
	--				PRECredito4_Qrt, IVACredito4_Qrt, PRECredito7_Qrt, IVACredito7_Qrt, PREAme_Qrt,	IVAAme_Qrt, PREContado_Manz, IVAContado_Manz, PREPrepago_Manz,
	--				IVAPrepago_Manz, PRECredito4_Manz, IVACredito4_Manz, PRECredito7_Manz, IVACredito7_Manz,PREAme_Manz, IVAAme_Manz, PREContado_NvoLaredo,	IVAContado_NvoLaredo,
	--				PREPrepago_NvoLaredo, IVAPrepago_NvoLaredo,	PRECredito4_NvoLaredo, IVACredito4_NvoLaredo, PRECredito7_NvoLaredo, IVACredito7_NvoLaredo, PREAme_NvoLaredo,
	--				IVAAme_NvoLaredo, PRE_SinIVATrc, PRE_SinIVAMty, PRE_SinIVAQrt, PRE_SinIVAManz, PRE_SinIVANvoLaredo
	--	Return
	--End

	
	If @strOpcion = 'G'
	Begin

		BEGIN TRY

			BEGIN TRANSACTION

		    If @intId = 0
		    Begin
			    Set @strAccion = 'Creación'

					--Insert Proveedor 
					Insert into PRY_ProveedoresDiesel (
						PROV_NombreVendedor,
						PROV_Proveedor,
						PROV_Telefono,
						PROV_Correo,
						--CAT_FormaDePago,
						PROV_Fecha,
						PROV_UsuarioCreacion,
						PROV_Activo,
						PROV_Estatus
					)
					Select 
						   M.Item.query('./NombreVendedor').value('.', 'varchar(100)'),
						   M.Item.query('./Proveedor').value('.', 'varchar(100)'),
						   M.Item.query('./Telefono').value('.', 'varchar(100)'),
						   M.Item.query('./Correo').value('.', 'varchar(100)'),
						   --M.Item.query('./FormaPago').value('.', 'bigint'),
						   GETDATE(),
						   @strUsuario,
						   M.Item.query('./Activo').value('.', 'bigint'),
						   'Nuevo'
					From @xmlParametros.nodes('clsParametros/clsPRY_ProveedorDiesel') M(item)
						Select @intId = SCOPE_IDENTITY()

				---- INSERTAR ID DE PROVEEDOR A TABLA DE USUARIOS WEB
					Insert Into CORE_WEB..CORE_WEB_Usuarios
					(
						USU_Usuario,
						USU_Password,
						USU_Nombres,
						PER_Id,
						CTE_Id,
						EST_Id,
						USU_Activo,
						USU_TokenTimeExpire,
						USU_FechaCreacion,
						USU_UsuarioCrea,
						USU_FechaModifica,
						USU_IdProveedorDiesel
					)
					Select 
						'PROVEEDOR' + CAST(@intId As varchar),
						ENCRYPTBYPASSPHRASE('123', '123'),
						'PROVEEDOR' + CAST(@intId As varchar),
						1,
						0,
						1,
						1,
						4200,
						GETDATE(),
						@strUsuario,
						GETDATE(),
						@intId
					From @xmlParametros.nodes('clsParametros/clsPRY_ProveedorDiesel') M(item)
						Select USU_IdProveedorDiesel = SCOPE_IDENTITY() -- MANDO EL ID DEL PROVEEDOR PARA BUSCARLO EN EL CATALOGO DE AGENCIAS 
     
	                -- INSERT ID FORMA DE PAGO POR PROVEEDOR
					Insert into PRY_CatalogosProv (
						Id_Prov,
						Id_CatAgencia
					)
					Select @intId,
						   M.Item.query('./idCatAgencia').value('.', 'bigint')
					FROM @xmlParametros.nodes('clsParametros/clsPRY_ProveedorDiesel/agencia/clsPresenciaAgencia') M(item)
					
					---- INSERT ID FORMA DE PAGO POR PROVEEDOR
					Insert into PRY_CatalogosProv (
						Id_Prov,
						Id__CatFormaDePago
					)
					Select @intId,
						   M.Item.query('./idCatPago').value('.', 'bigint')
					FROM @xmlParametros.nodes('clsParametros/clsPRY_ProveedorDiesel/pago/clsFormaDePago') M(item)
					
					--Select @intId = SCOPE_IDENTITY()
		    End
			    Else
		    Begin

			    If @blnActivo = 1
				    Set @strAccion = 'Modificación'
			    Else
				    Set @strAccion = 'Baja'
			    Set	@xmlAnterior =
					    (
						    Select	*
						    From	PRY_ProveedoresDiesel clsPRY_ProveedoresDiesel With(NoLock)
						    Where	clsPRY_ProveedoresDiesel.PROV_Id = @intId
						    FOR XML AUTO, Elements
					    )

			    Update clsPRY_ProvDiesel
					Set	   PROV_NombreVendedor = M.Item.query('./NombreVendedor').value('.', 'varchar(100)'),
						   PROV_Proveedor = M.Item.query('./Proveedor').value('.', 'varchar(100)'),
						   PROV_Telefono = M.Item.query('./Telefono').value('.', 'varchar(100)'),
						   PROV_Correo = M.Item.query('./Correo').value('.', 'varchar(100)'),
						   --CAT_FormaDePago = M.Item.query('./FormaPago').value('.', 'bigint'),
						   PROV_Activo = M.Item.query('./Activo').value('.', 'bigint')
					From   PRY_ProveedoresDiesel clsPRY_ProvDiesel 
				    Join @xmlParametros.nodes('clsParametros/clsPRY_ProveedorDiesel') M(Item)
				     On clsPRY_ProvDiesel.PROV_Id = M.Item.query('./Id').value('.', 'bigint')
			    
				--ELIMINAR AGENCIAS ANTIGUAS Y METER LAS NUEVAS O MODIFICACIONES
				Delete PRY_CatalogosProv 
				Where Id_Prov = @intId
				-- INSERT ID FORMA DE PAGO POR PROVEEDOR
					Insert into PRY_CatalogosProv (
						Id_Prov,
						Id_CatAgencia
					)
					Select @intId,
						   M.Item.query('./idCatAgencia').value('.', 'bigint')
					FROM @xmlParametros.nodes('clsParametros/clsPRY_ProveedorDiesel/agencia/clsPresenciaAgencia') M(item)
					
					---- INSERT ID FORMA DE PAGO POR PROVEEDOR
					Insert into PRY_CatalogosProv (
						Id_Prov,
						Id__CatFormaDePago
					)
					Select @intId,
						   M.Item.query('./idCatPago').value('.', 'bigint')
					FROM @xmlParametros.nodes('clsParametros/clsPRY_ProveedorDiesel/pago/clsFormaDePago') M(item)
		    End
		    Select @intId As Id
			
			COMMIT

		    -- Generar bitacora de acciones
		    Exec PA_GeneraBitacoraAcciones @strClaveModulo,@strPrograma,@strTabla,@intId,@strUsuario,@xmlAnterior,@xmlParametros,@strAccion,''

        END TRY  
        BEGIN CATCH  

			IF @@TRANCOUNT > 0 ROLLBACK

            Set @ErrorMessage	 = ERROR_MESSAGE()
			Set @ErrorSeverity	 = ERROR_SEVERITY()
			Set @ErrorState		 = ERROR_STATE()

	        If @strAccion is null 
		        Set @strAccion = ''
	        Else
		        Set @strAccion = 'Error/' + IsNull(@strAccion, '')

            If @intId is null Set @intId = 0

	        Exec PA_GeneraBitacoraAcciones @strClaveModulo,@strPrograma,@strTabla,@intId,@strUsuario,@xmlAnterior,@xmlParametros,@strAccion,@ErrorMessage

            RAISERROR (@ErrorMessage,@ErrorSeverity,@ErrorState);  

        END CATCH

	Return
	End

End



		