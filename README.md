# Import products using Shopify API - Product Feed Management Import
This is the improvement feature import feed via Shopify API

# Development demo
http://dev1.social-gear.jp/tinh/facebookSMB/catalog/product/product_catalog_id/137212396870784

# Development repository
`branch-shopify`

## What's new

### 1. Setting Import by Shopify API
* Setting platform source
* Add filter set
* Edit filter set
* Delete filter set
* Remove Checking New/Edit/Delete Products in Filter Set
* Change to Review product list display

### 2. Adding option Import via Shopify API
- Improvement UI
- Process Data in Frontend/Backend
- Process Data Background in Schedule Upload 


## Set Up

### 1. Admin-script
— Alter Schedule Upload Table: ----
```
ALTER TABLE `analytics_smb_main`.`sg_catalog_schedule_upload` 
ADD COLUMN `source_type` ENUM('api', 'url') NULL AFTER `is_ignore_error`,
ADD COLUMN `platform_id_api` INT(11) NULL AFTER `source_type`,
ADD COLUMN `filter_set_shopify_id` INT(11) NULL AFTER `platform_id_api`,
ADD INDEX `shopfi_fiter_id_idx` (`filter_set_shopify_id` ASC);
ALTER TABLE `analytics_smb_main`.`sg_catalog_schedule_upload` 
ADD CONSTRAINT `shopfi_fiter_id`
FOREIGN KEY (`filter_set_shopify_id`)
REFERENCES `analytics_smb_main`.`sg_catalog_shopify_filter` (`id`)
ON DELETE CASCADE
ON UPDATE NO ACTION;
```
Or Run command `php yiic migrate-smb-main`
```
Total 1 new migration to be applied:
    core: m180717_030758_alter_schedule_upload_table
```
	
### 2. Command Background for Data Process

Set up Cronjob to run Schedule Upload with Shopify Api (leave it if existed)

```
php yiic productfeed checkScheduleUpload
```
## Ticket Reference
https://social-gear.atlassian.net/browse/SGSG-293
