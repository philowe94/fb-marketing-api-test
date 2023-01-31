/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the
 * LICENSE file in the root directory of this source tree.
 * @flow
 */

import bizSdk from "facebook-nodejs-business-sdk";
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;
const AdSet = bizSdk.AdSet;
const AdCreative = bizSdk.AdCreative;
const Ad = bizSdk.Ad;
const AdPreview = bizSdk.AdPreview;

let access_token = 'EAAQhdJ7O2pEBAE5FB2FOZAoZAVLZC2JGSsSprs3ZAim8mJeXbujnDXMGDvf14MhE1l9e5KmFeiZC2aKZC9KwwjqnZBCyJbHX6gPxGAEPXVeaqtWTfiZBm072jfiTZA71J4hnFPjPbHZBxNuZAjPCZByUR9zVHfQNGrA03qoWLbiPmZB4TKmwZCeUnn60cZAoKm5UfRRmEvQBDDLCEie6FynOxAoYc9OGxxvdSsBPVUbsR8r3PDktFO96VzF7M0IxFeZCrT3znr8ZD';
let ad_account_id = 'act_182486723160335';
let app_secret = '380bab6bae5f8683fd0458e925949a71';
let page_id = '100468496223051';
let app_id = '655126982751581';
const api = bizSdk.FacebookAdsApi.init(access_token);
const account = new AdAccount(ad_account_id);
const showDebugingInfo = true; // Setting this to true shows more debugging info.
if (showDebugingInfo) {
  api.setDebug(true);
}

let campaign;
let campaign_id;
let ad_set;
let ad_set_id;
let creative;
let creative_id;
let ad;
let ad_id;
let adpreview;
let adpreview_id;

const logApiCallResult = (apiCallName, data) => {
  console.log(apiCallName);
  if (showDebugingInfo) {
    console.log('Data:' + JSON.stringify(data));
  }
};

const fields = [
];
const params = {
  'name' : 'My Campaign',
  'buying_type' : 'AUCTION',
  'objective' : 'PAGE_LIKES',
  'status' : 'PAUSED',
  'special_ad_categories' : ['NONE'],

};
campaign =  (new AdAccount(ad_account_id)).createCampaign(
  fields,
  params

);
campaign
.then((result) => {
  logApiCallResult('campaign api call complete.', result);
  campaign_id = result.id;
  const fields = [
  ];
  const params = {
    'name' : 'My AdSet',
    'optimization_goal' : 'PAGE_LIKES',
    'billing_event' : 'IMPRESSIONS',
    'bid_amount' : '20',
    'promoted_object' : {'page_id': page_id},
    'daily_budget' : '1000',
    'campaign_id' : campaign_id,
    'targeting' : {'geo_locations':{'countries':['US']}},
    'status' : 'PAUSED',
  };
  return (new AdAccount(ad_account_id)).createAdSet(
    fields,
    params
  );
})
.then((result) => {
  logApiCallResult('ad_set api call complete.', result);
  ad_set_id = result.id;
  const fields = [
  ];
  const params = {
    'name' : 'My Creative',
    'object_id' : page_id,
    'title' : 'My Page Like Ad',
    'body' : 'Like My Page',
    'image_url' : 'https://images.ctfassets.net/2qg9pmsql6il/4O3zuGmfc8doIeNDMyLOyk/fcf6426fd5a9e0c2438a3a661a999185/doge.jpg?h=250',
  };
  return (new AdAccount(ad_account_id)).createAdCreative(
    fields,
    params
  );
})
.then((result) => {
  logApiCallResult('creative api call complete.', result);
  creative_id = result.id;
  const fields = [
  ];
  const params = {
    'name' : 'My Ad',
    'adset_id' : ad_set_id,
    'creative' : {'creative_id':creative_id},
    'status' : 'PAUSED',
  };
  return (new AdAccount(ad_account_id)).createAd(
    fields,
    params
  );
})
.then((result) => {
  logApiCallResult('ad api call complete.', result);
  ad_id = result.id;
  const fields = [
  ];
  const params = {
    'ad_format' : 'DESKTOP_FEED_STANDARD',
  };
  return (new Ad(ad_id)).getPreviews(
    fields,
    params
  );
})
.then((result) => {
  logApiCallResult('adpreview api call complete.', result);
  adpreview_id = result[0].id;
})
.catch((error) => {
  console.log(error);
});
