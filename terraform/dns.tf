resource "cloudflare_dns_record" "terraform_managed_resource_86664d35d9144cbded65d18d6b6946b6_0" {
  content  = "185.199.111.153"
  name     = "jessekela.com"
  proxied  = true
  tags     = []
  ttl      = 1
  type     = "A"
  zone_id  = var.zone_id
  settings = {}
}

resource "cloudflare_dns_record" "terraform_managed_resource_59cfb8b17b9237c3c2f98889d923a562_1" {
  content  = "185.199.110.153"
  name     = "jessekela.com"
  proxied  = true
  tags     = []
  ttl      = 1
  type     = "A"
  zone_id  = var.zone_id
  settings = {}
}

resource "cloudflare_dns_record" "terraform_managed_resource_0dccb16876d76d7bb9e6e0d6e4bb87bc_2" {
  content  = "185.199.109.153"
  name     = "jessekela.com"
  proxied  = true
  tags     = []
  ttl      = 1
  type     = "A"
  zone_id  = var.zone_id
  settings = {}
}

resource "cloudflare_dns_record" "terraform_managed_resource_f00d20a692e78c434e8e31d5a96e8a9a_3" {
  content  = "185.199.108.153"
  name     = "jessekela.com"
  proxied  = true
  tags     = []
  ttl      = 1
  type     = "A"
  zone_id  = var.zone_id
  settings = {}
}

resource "cloudflare_dns_record" "terraform_managed_resource_32e80777b54640f6f3dc353520612011_4" {
  content  = "185.199.108.153"
  name     = "www.jessekela.com"
  proxied  = true
  tags     = []
  ttl      = 1
  type     = "A"
  zone_id  = var.zone_id
  settings = {}
}

resource "cloudflare_dns_record" "terraform_managed_resource_9da42370c11f3c9ec9de274f4c906a8c_5" {
  content  = "185.199.109.153"
  name     = "www.jessekela.com"
  proxied  = true
  tags     = []
  ttl      = 1
  type     = "A"
  zone_id  = var.zone_id
  settings = {}
}

resource "cloudflare_dns_record" "terraform_managed_resource_2771ef590b2c9030904c2d985d640299_6" {
  content  = "185.199.110.153"
  name     = "www.jessekela.com"
  proxied  = true
  tags     = []
  ttl      = 1
  type     = "A"
  zone_id  = var.zone_id
  settings = {}
}

resource "cloudflare_dns_record" "terraform_managed_resource_fc94029ae53aad80b9354a93a669faad_7" {
  content  = "185.199.111.153"
  name     = "www.jessekela.com"
  proxied  = true
  tags     = []
  ttl      = 1
  type     = "A"
  zone_id  = var.zone_id
  settings = {}
}

resource "cloudflare_dns_record" "terraform_managed_resource_1e0077c0a76ac384de8f0fa569c59c90_8" {
  content  = "v=DMARC1; p=reject; sp=reject; adkim=s; aspf=s;"
  name     = "_dmarc.jessekela.com"
  proxied  = false
  tags     = []
  ttl      = 1
  type     = "TXT"
  zone_id  = var.zone_id
  settings = {}
}

resource "cloudflare_dns_record" "terraform_managed_resource_021510f101ba65d2f66c0f355c5edf4f_9" {
  content  = "v=DKIM1; p="
  name     = "*._domainkey.jessekela.com"
  proxied  = false
  tags     = []
  ttl      = 1
  type     = "TXT"
  zone_id  = var.zone_id
  settings = {}
}

resource "cloudflare_dns_record" "terraform_managed_resource_93f6eb52f7b787b4ad9e72ff43be74ff_10" {
  content  = "990b645e618bca02df4a2d6fa35b3f"
  name     = "_github-pages-challenge-tsingis.jessekela.com"
  proxied  = false
  tags     = []
  ttl      = 1
  type     = "TXT"
  zone_id  = var.zone_id
  settings = {}
}

resource "cloudflare_dns_record" "terraform_managed_resource_4621b55a482c9740d78195069296f99c_11" {
  content  = "v=spf1 -all"
  name     = "jessekela.com"
  proxied  = false
  tags     = []
  ttl      = 1
  type     = "TXT"
  zone_id  = var.zone_id
  settings = {}
}

