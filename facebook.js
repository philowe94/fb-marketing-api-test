import fs from "fs";
import { encode, decode } from "node-base64-image";
import adsSdk from "facebook-nodejs-business-sdk";
import { imageBytes } from "./imagebytes.js";

//constants
const AdAccount = adsSdk.AdAccount;
const Ad = adsSdk.Ad;
const AdCreative = adsSdk.AdCreative;
const AdImage = adsSdk.AdImage;
const Campaign = adsSdk.Campaign;
const pageid = "100468496223051"; //Testpage
let app_id = "655126982751581";
const postid = "139311262328428"; //post on testpage
const pagepostid = pageid + "_" + postid;

//access tokens
const sandbox_access_token =
  "EAAJT1aMW9V0BADJ77N8HnhuXyY2ypxF8isR4HdxSzO35PdUyu4OzmzZA4MLgfKtjxkOlDf0TmB4ReXn7iZCUEiHcojZBILiW9ZC1PYqnoOhjKMfdZBpm1DMdUzE7cWqY5dACujEUGNweRmJRqZAm6F1p7kGEePifrUPVAqZAiyI6keLOM7L7jIZAVPDrNCfsvG4ZD";
const sandbox_ad_account_id = "act_1431237097286304";
const phil_access_token =
  "EAAJT1aMW9V0BADWhXZCaCVXifILbDOOVEE394ADM42eeJL9RBCdLqJAd2TMGxZCEGktFP3BBbbTZCMVQG5EOa09l4rcv0AJchOhT9nvk266Mr5g14YxQ7ZBgIbFYBZCkWSCVSa6UjZA2jZBsXP8tZB3NZA5MZBLArJUkcvtUQQXeWrtgRBU6qJP93VGoidcoS2zXc9QSsvZCZBmRsA7j16pbwfEiWpNeEGuWoJUZD";
const phil_ad_account_id = "act_182486723160335";

//initialize facebook api
const api = adsSdk.FacebookAdsApi.init(phil_access_token);
const account = new AdAccount(phil_ad_account_id); //this is from the Sandbox Ad account number

const showDebugingInfo = false; // Setting this to true shows more debugging info.
if (showDebugingInfo) {
  api.setDebug(true);
}

//create a facebook ad campaign, returning campaign id
const createCampaign = async () => {
  const fields = [];
  const params = {
    name: "My Campaign",
    buying_type: "AUCTION",
    objective: "PAGE_LIKES",
    status: "PAUSED",
    special_ad_categories: ["NONE"],
  };

  let campaign_id = "";
  try {
    await account.createCampaign(fields, params).then((result) => {
      campaign_id = result.id;
    });
    return campaign_id;
  } catch (error) {
    console.log(error);
  }
};

//create a facebook ad set, returning ad set id
const createAdSet = async (campaignId) => {
  const fields = [];
  const params = {
    name: "My AdSet",
    campaign_id: campaignId,
    daily_budget: "1000",
    billing_event: "IMPRESSIONS",
    optimization_goal: "REACH",
    bid_amount: "2",
    promoted_object: {
      page_id: pageid,
    },
    targeting: {
      geo_locations: {
        countries: ["US"],
      },
    },
    status: "PAUSED",
  };
  let adset_id = "";
  try {
    await account.createAdSet(fields, params).then((result) => {
      adset_id = result.id;
    });
    return adset_id;
  } catch (error) {
    console.log(error);
  }
};

//create a facebook ad image, returning image hash
const createAdImage = async (imageBytes) => {
  let hash = "";
  try {
    await account
      .createAdImage([], {
        bytes: imageBytes,
      })
      .then((result) => {
        hash = result.images.bytes.hash;
      });
    return hash;
  } catch (error) {}
};

//create a facebook ad creative, returning creative id
const createAdCreative = async (name, imageHash, link, message) => {
  let fields, params;
  fields = [];
  params = {
    name: "Sample Creative",
    object_story_spec: {
      page_id: pageid,
      link_data: {
        image_hash: imageHash,
        link: link,
        message: message,
      },
    },
  };
  let creative_id = "asdf"; //this is the creative id
  try {
    await account.createAdCreative(fields, params).then((result) => {
      creative_id = result.id;
    });
    return creative_id;
  } catch (error) {
    console.log(error);
  }
};

//create a facebook ad, returning ad id
const createAd = async (name, ad_set_id, creative_id) => {
  let fields, params;
  fields = [];
  params = {
    name: name,
    adset_id: ad_set_id,
    creative: { creative_id: creative_id },
    status: "PAUSED",
  };
  let ad_id = "";
  try {
    await account.createAd(fields, params).then((result) => {
      ad_id = result.id;
    });
    return ad_id;
  } catch (error) {
    console.log(error);
  }
};

//test call
createCampaign().then((campaignId) => {
  console.log(campaignId);

  createAdImage(imageBytes).then((imageHash) => {
    console.log(imageHash);

    createAdCreative(
      "testname",
      imageHash,
      "www.google.com",
      "testmessage"
    ).then((creativeId) => {
      console.log(creativeId);

      createAdSet(campaignId).then((adSetId) => {
        console.log(adSetId);

        createAd("testname", adSetId, creativeId).then((adId) => {
          console.log(adId);
        });
      });
    });
  });
});

export { createAdImage, createAdCreative, createAd };
