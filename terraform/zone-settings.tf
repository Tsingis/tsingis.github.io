resource "cloudflare_zone_setting" "always_use_https" {
  zone_id    = var.zone_id
  setting_id = "always_use_https"
  value      = "on"
}

resource "cloudflare_zone_setting" "min_tls_version" {
  zone_id    = var.zone_id
  setting_id = "min_tls_version"
  value      = "1.2"
}

resource "cloudflare_zone_setting" "tls_1_3" {
  zone_id    = var.zone_id
  setting_id = "tls_1_3"
  value      = "zrt"
}

resource "cloudflare_zone_setting" "opportunistic_encryption" {
  zone_id    = var.zone_id
  setting_id = "opportunistic_encryption"
  value      = "on"
}

resource "cloudflare_zone_setting" "automatic_https_rewrites" {
  zone_id    = var.zone_id
  setting_id = "automatic_https_rewrites"
  value      = "on"
}

resource "cloudflare_zone_setting" "http2_to_origin" {
  zone_id    = var.zone_id
  setting_id = "http2"
  value      = "on"
}

resource "cloudflare_zone_setting" "http3" {
  zone_id    = var.zone_id
  setting_id = "http3"
  value      = "on"
}

resource "cloudflare_zone_setting" "zero_rtt" {
  zone_id    = var.zone_id
  setting_id = "0rtt"
  value      = "on"
}

resource "cloudflare_zone_setting" "cache_level" {
  zone_id    = var.zone_id
  setting_id = "cache_level"
  value      = "aggressive"
}

resource "cloudflare_zone_setting" "browser_cache_ttl" {
  zone_id    = var.zone_id
  setting_id = "browser_cache_ttl"
  value      = 31536000
}
