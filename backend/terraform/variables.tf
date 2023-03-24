variable "subscription_id" {
  type = string
  sensitive   = true
}

variable "resource_group_name" {
  type = string
}

variable "resource_group_location" {
  type = string
  default = "uksouth"
}

variable "project_name" {
  type = string
}

variable "project_pi" {
  type = string
}

variable "project_contributors" {
  type = string
}

variable "image_name" {
  type = string
}

variable "host" {
  type        = string
}

variable "port" {
  type        = string
}

variable "app_keys" {
  type        = string
  sensitive   = true
}

variable "admin_jwt_secret" {
  type        = string
  sensitive   = true
}

variable "api_token_salt" {
  type        = string
  sensitive   = true
}

variable "database_username" {
  type        = string
  sensitive   = true
}

variable "database_password" {
  type        = string
  sensitive   = true
}

variable "sentry_dsn" {
  type        = string
  sensitive   = true
}