# variables.tf
variable "resource_group_name" {
  default = "devops-rg"
}

variable "location" {
  default = "East US"
}

variable "acr_prefix" {
  default = "devopsacr"
}

variable "aks_name" {
  default = "devops-aks"
}
