# We strongly recommend using the required_providers block to set the
# Azure Provider source and version being used
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "=3.27.0"
    }
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
  subscription_id = var.subscription_id
}

resource "azurerm_resource_group" "rg" {
  name = var.resource_group_name
  location = var.resource_group_location

  tags = {
    Name          = var.project_name
    PI            = var.project_pi
    Contributors  = var.project_contributors
  }
}

resource "azurerm_storage_account" "storage" {
  name                      = var.resource_group_name
  resource_group_name       = azurerm_resource_group.rg.name
  location                  = azurerm_resource_group.rg.location
  account_tier              = "Standard"
  account_replication_type  = "LRS"
  enable_https_traffic_only = true

  static_website {
    index_document     = "index.html"
    error_404_document = "index.html"
  }
}

resource "azurerm_container_registry" "acr" {
  name                = var.resource_group_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Standard"
  admin_enabled       = true

  tags = {
    Name          = var.project_name
    PI            = var.project_pi
    Contributors  = var.project_contributors
  }
}

resource "azurerm_mysql_flexible_server" "mysql" {
  name                   = var.resource_group_name
  resource_group_name    = azurerm_resource_group.rg.name
  location               = azurerm_resource_group.rg.location
  administrator_login    = var.database_username
  administrator_password = var.database_password
  backup_retention_days  = 7
  sku_name               = "B_Standard_B1s"

  tags = {
    Name          = var.project_name
    PI            = var.project_pi
    Contributors  = var.project_contributors
  }
}

resource "azurerm_mysql_flexible_database" "database" {
  name                = azurerm_resource_group.rg.name
  resource_group_name = azurerm_resource_group.rg.name
  server_name         = azurerm_mysql_flexible_server.mysql.name
  charset             = "utf8"
  collation           = "utf8_unicode_ci"
}

resource "azurerm_service_plan" "asp" {
  name                = var.resource_group_name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  os_type             = "Linux"
  sku_name            = "B1"

  tags = {
    Name          = var.project_name
    PI            = var.project_pi
    Contributors  = var.project_contributors
  }
}

resource "azurerm_linux_web_app" "as" {
  name                = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  service_plan_id     = azurerm_service_plan.asp.id
  https_only          = "true"

  site_config {
    application_stack {
      docker_image      = "${azurerm_container_registry.acr.login_server}/${var.image_name}"
      docker_image_tag  = "latest"
    }
  }

  storage_account {
    access_key    = azurerm_storage_account.storage.primary_access_key
    account_name  = azurerm_storage_account.storage.name
    name          = azurerm_storage_account.storage.name
    share_name    = "uploads"
    type          = "AzureBlob"
    mount_path    = "/usr/local/src/public/uploads"
  }

  identity {
    type = "SystemAssigned"
  }

  app_settings = {
    # Server
    HOST              = var.host
    PORT              = var.port
    URL               = "https://${azurerm_resource_group.rg.name}.azurewebsites.net"
    PUBLIC_URL        = "https://${azurerm_resource_group.rg.name}.azurewebsites.net"
    PUBLIC_ADMIN_URL  = "https://${azurerm_resource_group.rg.name}.azurewebsites.net/dashboard"
    # Database Connection
    DATABASE_HOST     = azurerm_mysql_flexible_server.mysql.fqdn
    DATABASE_PORT     = "3306"
    DATABASE_SSL      = true
    DATABASE_NAME     = azurerm_resource_group.rg.name
    DATABASE_USERNAME = var.database_username
    DATABASE_PASSWORD = var.database_password
    # API Security
    APP_KEYS          = var.app_keys
    API_TOKEN_SALT    = var.api_token_salt
    ADMIN_JWT_SECRET  = var.admin_jwt_secret
    # Sentry
    SENTRY_DSN = var.sentry_dsn
    # Azure Services
    WEBSITES_ENABLE_APP_SERVICE_STORAGE = "true"
    DOCKER_REGISTRY_SERVER_USERNAME     = azurerm_container_registry.acr.admin_username
    DOCKER_REGISTRY_SERVER_PASSWORD     = azurerm_container_registry.acr.admin_password
    DOCKER_REGISTRY_SERVER_URL          = azurerm_container_registry.acr.login_server
  }

  tags = {
    Name          = var.project_name
    PI            = var.project_pi
    Contributors  = var.project_contributors
  }
}