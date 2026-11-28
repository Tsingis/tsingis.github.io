resource "cloudflare_page_rule" "terraform_managed_resource_403b386be7fca84391d0ab0b59043be1_0" {
  priority = 1
  status   = "active"
  target   = "http://*jessekela.com/*"
  zone_id  = var.zone_id
  actions = {
    always_use_https = true
  }
}

