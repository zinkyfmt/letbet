# Instagram API - Social Gear
This is Instagram Analytics feature via API

# Development Frontend demo
http://dev1.social-gear.jp/tinh/instagram/insights/insightsv1/instagram_business_id/17841405655739329

## Background Crawler
### Development Repository 
`sg_backend_facebook`
### 1. Get Page & Instagram Business Account
```
php yiic instagram pageinfo
```
Description: 
- Get `instagram_business_account` and save instagram page information page by page has `instagram_business_account`.
Database reference
```
* analytics_main.sg_instagram_account
* analytics_prod.sg_instagram_hourly_stat
```
API reference
https://developers.facebook.com/docs/instagram-api/reference/page/

### 2. Get Metric Insights
```
php yiic instagram insights
```
Description: 
- Get metric of reach, impressions, follower by day/week/28_days and save database.
- Collect information of audience_country, audience_age, audience_language.

Database reference
```
* analytics_prod.sg_instagram_metrics
* analytics_prod.sg_instagram_audience_country
* analytics_prod.sg_instagram_audience_language
* analytics_prod.sg_instagram_gender_age
```
API reference
https://developers.facebook.com/docs/instagram-api/insights

### 3. Collect Media Insights
```
php yiic instagram mediaInsights
```
Description: 
- Collect data of media, insights, comments of media.

Database reference
```
* analytics_prod.sg_instagram_media
* analytics_prod.sg_instagram_media_carousel
* analytics_prod.sg_instagram_media_carousel_insights
* analytics_prod.sg_instagram_media_comments
* analytics_prod.sg_instagram_media_insights
```
API reference
https://developers.facebook.com/docs/instagram-api/reference/media

### 4. Collect Story Insights
```
php yiic instagram hourlyStoryInsights
```
Description: 
- Collect story insights and get metric hourly.

Database reference
```
* analytics_prod.sg_instagram_stories_hourly_insights
* analytics_prod.sg_instagram_stories_metrics
```
API reference
https://developers.facebook.com/docs/instagram-api/insights

### 5. Update Story Thumbnail
```
php yiic instagram storyThumbnail
```
Description: 
- Get story thumbnail and upload to S3.
- Update S3 link of thumbnail to database.

Database reference
```
* analytics_prod.sg_instagram_media
```

## Instagram Webhook
Description: 
- Get Media action Realtime
Not Implement Yet

Link Reference
https://developers.facebook.com/docs/instagram-api/webhooks
