import adsSdk from "facebook-nodejs-business-sdk";
const api = adsSdk.FacebookAdsApi.init(
  "EAAJT1aMW9V0BAL27XqHZCkISUtkITlPrwHLbLxTiHwb2dXYGXH5fpuWR1DkMunyTzlpaha2XcKZCzfhqDAMiUmMJYSIGoliokkmEa2o2DdUbsuZAH8cZCUnZAKK0truYZCf5jgZBwpEsyRyXh1maPBd8xNgDOtvLZCGEENZA0ztMLfB9ZCpqPFeF6Cb0UbkSMykIIZD"
);

const pageid = "100468496223051"; //Testpage
const postid = "139311262328428"; //post on testpage
const pagepostid = pageid + "_" + postid;

const AdAccount = adsSdk.AdAccount;
const Ad = adsSdk.Ad;
const AdCreative = adsSdk.AdCreative;
const AdImage = adsSdk.AdImage;
const account = new AdAccount("act_1431237097286304");//this is from the Sandbox Ad account number

console.log(account.id);

const logApiCallResult = (apiCallName, data) => {
  console.log(apiCallName);
  if (showDebugingInfo) {
    console.log("Data:" + JSON.stringify(data));
  }
};

//create a facebook ad image, returning image hash
const createAdImage = async (url) => {
  console.log("here");
  account
    .createAdImage([AdImage.Fields.Hash], {
      [AdImage.Fields.url]: url,
    })
    .then((result) => {
      console.log(result);
      return result.hash;
    })
    .catch((error) => {
      console.log(error);
    });
};

//create a facebook ad creative, returning creative id
const createAdCreative = async (name, object_story_id) => {
  console.log("lolol");
  account
    .createAdCreative([AdCreative.Fields.Id], {
      [AdCreative.Fields.name]: name,
      [AdCreative.Fields.object_story_id]: object_story_id,
    })
    .then((result) => {
      console.log(result);
      return result.id;
    })
    .catch((error) => {
      console.log(error);
    });
};

//create a facebook ad, returning ad id
const createAd = async (name, creativeId) => {
  account
    .createAd([Ad.Fields.Id], {
      [Ad.Fields.name]: name,
      [Ad.Fields.creative]: {
        creative_id: creativeId,
      },
      [Ad.Fields.status]: Ad.Status.paused,
      [Ad.Fields.adset_id]: fbcreds.facebook_adset_id,
      [Ad.Fields.campaign_id]: fbcreds.facebook_campaign_id,
    })
    .then((result) => {
      console.log(result);
      return result.id;
    })
    .catch((error) => {
      console.log(error);
    });
};

// createAdImage("https://images.ctfassets.net/2qg9pmsql6il/4O3zuGmfc8doIeNDMyLOyk/fcf6426fd5a9e0c2438a3a661a999185/doge.jpg");
createAdCreative("Sample Creative", pagepostid);
// createAd("Sample Ad", "test");

export { createAdImage, createAdCreative, createAd };
