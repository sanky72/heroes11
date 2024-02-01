import { User, Token } from "../../../../models/index.js";
import { validateRegister } from "../../../validators/user.validator.js";
import {
  errorHelper,
  generateRandomCode,
  sendCodeToEmail,
  logger,
  getText,
  turkishToEnglish,
  signConfirmCodeToken,
  signAccessToken,
  signRefreshToken,
} from "../../../../utils/index.js";
import ipHelper from "../../../../utils/helpers/ip-helper.js";
import bcrypt from "bcryptjs";
const { hash } = bcrypt;
import geoip from "geoip-lite";
const { lookup } = geoip;

export default async (req, res) => {
  const { error } = validateRegister(req.body);
  console.log("error", error);
  if (error) {
    let code = "00025";
    if (error.details[0].message.includes("email")) code = "00026";
    else if (error.details[0].message.includes("password")) code = "00027";
    else if (error.details[0].message.includes("name")) code = "00028";

    return res
      .status(400)
      .json(errorHelper(code, req, error.details[0].message));
  }

  const authenticationType = req.body?.authDetails?.authenticationType;
  const isOauth = authenticationType === "oauth";
  const referralID = req.body?.referralID;
  let doesReferredUserExist = false;
  let referredUserWalletAmount = 0;

  if (referralID) {
    const referredUser = await User.findById(referralID).catch((err) => {
      return res
        .status(500)
        .json({ error: "crashed during referredUser check" });
    });

    // console.log("ref status", referredUser.statusCode);
    // console.log("referredUser ", referredUser, referredUser._id);

    // if (referredUser.statusCode !== 200) doesReferredUserExist = false;
    if (referredUser._id) {
      doesReferredUserExist = true;
      referredUserWalletAmount = referredUser.wallet;
    }
  }


  const exists = await User.exists({ email: req.body.email }).catch((err) => {
    return res.status(500).json(errorHelper("00031", req, err.message));
  });

  if (exists) return res.status(409).json(errorHelper("00032", req));

  let hashed = "NA";
  if (!isOauth) {
    hashed = await hash(req.body.password, 10);
  }

  const emailCode = generateRandomCode(4);
  await sendCodeToEmail(
    req.body.email,
    req.body.name,
    emailCode,
    req.body.language,
    "register",
    req,
    res
  );

  let username = "";
  let tempName = "";
  let existsUsername = true;
  let name = turkishToEnglish(req.body.name);
  if (name.includes(" ")) {
    tempName = name.trim().split(" ").slice(0, 1).join("").toLowerCase();
  } else {
    tempName = name.toLowerCase().trim();
  }
  do {
    username = tempName + generateRandomCode(4);
    existsUsername = await User.exists({ username: username }).catch((err) => {
      return res.status(500).json(errorHelper("00033", req, err.message));
    });
  } while (existsUsername);

  const geo = lookup(ipHelper(req));

  let user = new User({
    email: req.body.email,
    password: hashed,
    name: name,
    username: username,
    language: req.body.language,
    phoneNumber: req.body.phoneNumber,
    countryCode: geo == null ? "US" : geo.country,
    lastLogin: Date.now(),
    authenticationType: authenticationType || "normal",
    wallet: doesReferredUserExist ? 100 : 50,
  });

  user = await user.save().catch((err) => {
    console.log(err);
    return res
      .status(500)
      .json({ test: "test", error: errorHelper("00034", req, err.message) });
  });

  // update wallet of referring user

  if (doesReferredUserExist) {
    await User.updateOne(
      { _id: referralID },
      {
        $set: {
          wallet: referredUserWalletAmount + 25,
        },
      }
    ).catch((err) => {
      return res.status(500).json(errorHelper("00090", req, err.message));
    });
  }

  user.password = null;

  const confirmCodeToken = signConfirmCodeToken(user._id, emailCode);
  const accessToken = signAccessToken(user._id);
  const refreshToken = signRefreshToken(user._id);

  await Token.updateOne(
    { userId: user._id },
    {
      $set: {
        refreshToken: refreshToken,
        status: true,
        expiresIn: Date.now() + 604800000,
        createdAt: Date.now(),
      },
    },
    { upsert: true }
  ).catch((err) => {
    return res.status(500).json(errorHelper("00046", req, err.message));
  });

  logger("00035", user._id, getText("en", "00035"), "Info", req);
  return res.status(200).json({
    resultMessage: { en: getText("en", "00035"), tr: getText("tr", "00035") },
    code: "00035",
    user,
    confirmToken: confirmCodeToken,
    accessToken,
    refreshToken,
  });
};

/**
 * @swagger
 * /user:
 *    post:
 *      summary: Registers the user
 *      requestBody:
 *        description: All required information about the user
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                name:
 *                  type: string
 *                language:
 *                  type: string
 *                  enum: ['tr', 'en']

 *                deviceId:
 *                  type: string
 *      tags:
 *        - User
 *      responses:
 *        "200":
 *          description: You registered successfully.
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          resultMessage:
 *                              $ref: '#/components/schemas/ResultMessage'
 *                          code:
 *                              $ref: '#/components/schemas/ResultCode'
 *                          user:
 *                              $ref: '#/components/schemas/User'
 *                          confirmToken:
 *                              type: string
 *        "400":
 *          description: Please provide all the required fields!
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 *        "500":
 *          description: An internal server error occurred, please try again.
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Result'
 */
