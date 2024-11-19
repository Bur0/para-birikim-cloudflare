import { getTokenFromGCPServiceAccount } from "@sagi.io/workers-jwt";

/**
 * Getting the access token to use in the header.
 */

// For example's sake, the file contents (modified) from the private key has been
// listed below, but the recommended way would be to use environment variables.

let jsonToDocument = function (value) {
  if (!isNaN(value)) {
    if (value.toString().indexOf(".") != -1) return { doubleValue: value };
    else return { integerValue: value };
  } else if (
    value === "true" ||
    value === "false" ||
    typeof value == "boolean"
  ) {
    return { booleanValue: value };
  } else if (Date.parse(value)) {
    return { timestampValue: value };
  } else if (typeof value == "string") {
    return { stringValue: value };
  } else if (value && value.constructor === Array) {
    return { arrayValue: { values: value.map((v) => jsonToDocument(v)) } };
  } else if (typeof value === "object") {
    let obj = {};
    for (let o in value) {
      obj[o] = jsonToDocument(value[o]);
    }
    return { mapValue: { fields: obj } };
  }
};
let documentToJson = function (fields) {
  let result = {};
  for (let f in fields) {
    let key = f,
      value = fields[f],
      isDocumentType = [
        "stringValue",
        "booleanValue",
        "doubleValue",
        "integerValue",
        "timestampValue",
        "mapValue",
        "arrayValue",
      ].find((t) => t === key);
    if (isDocumentType) {
      let item = [
        "stringValue",
        "booleanValue",
        "doubleValue",
        "integerValue",
        "timestampValue",
      ].find((t) => t === key);
      if (item) return value;
      else if ("mapValue" == key) return documentToJson(value.fields || {});
      else if ("arrayValue" == key) {
        let list = value.values;
        return !!list ? list.map((l) => documentToJson(l)) : [];
      }
    } else {
      result[key] = documentToJson(value);
    }
  }
  return result;
};
let documentData = {
  list1: {
    arrayValue: {
      values: [{ stringValue: "item1" }, { stringValue: "item2" }],
    },
  },
};

export async function getAccessToken() {
  console.log("getAccessToken");
  const jwtToken = await getTokenFromGCPServiceAccount({
    serviceAccountJSON: {
      type: "service_account",
      project_id: "parakredim-7c769",
      private_key_id: "8cef3acba4fdf84811a0ab4b29d3c953104f414e",
      private_key:
        "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCfZ0qfGwpSjyfh\njRzUVi+tRyUvBas3XEM48uTWk5LSkEleT78yznVZTGjqVo+y/10HAnVTYXKwwN7F\nXQx2y4BMUWHdOnYP6g7I4cfS5Hx6hNEArjFtibY5sPos4sv9DB2jvxm5aNWuF2NP\n1BUjtnVGKHBfkygziVRVTIzT+VJ351kGuVTZSHtS67KT+KD7u7WJJ2Rm3T8x9UAE\nTVBkHCf38L6Ivo+LCvWDbhcyG5Oco2UHuLMWBu+AssfRbSMX4t7VR9agHc/mnYK1\nIZls/kwe9Mje9xqy4kFcUfP9bsBznk+l7NBeRHXpxcatRY+J3W68pSuJNCgALtMM\ng+gnOSsNAgMBAAECggEADfSrYBQsOm+toG3sFvwHtw46R2xh4doqSX9cgRvQ+C3p\nOoBVX0ObmwqZSeDzukposN8qefcXZTmxl0pu96yX6jaa0JVYdkq56iT4S3K1Ij3k\nFYDqs2oh4dmogYsGrHwl0Sr/O9Admx0RlRDem+6SxGZwdjGqTJ7KmyA1WS6kJXqg\ngB14+bK7nRrj3RtjXzvzex2vEfSZu1JdFVTEsgTwO4lyt9IDWKkl9OTdFpykicOJ\nY3xGBUsO/NPTdx6ypxlvucROnILCaT3ZOg1zFdIik4EtvIDsvmHjYkcV7SOUXuNa\nV+ul97kCqJSL2Ba9bkko3wiOnaNyASV9WSQso1takQKBgQDbBKM68w7ZCv1xHbYK\ngAKOkPNQG1J8oSjUART2rGS564AvBm2WLvmhw26i8jHKAjj9TuHOhdQRYg/B3jIL\n1DfZoyr1vDwsGnEYVCzgGslCQMgXbgN6qgYsyg8mw71FMu1jniRRtMyFH3FOCfuZ\nSOEBwMQgEdIGQNul/8ZJqsHSEQKBgQC6Ubp/tQxSotZU02XHvvUeZm7ahXJvfhxp\ntMSiuF5f6tXOmKuPnwmoss97DghSLepZIaA5z9RyLKegxdZM76xHAfKQnEFB0awN\n7+lUTsuaPdgLWNn1nkOoUtbrmXDPGanrAM/q1Hrm2RER3kHlhXrc2hXGclPnYm7Z\niylPwitNPQKBgHh7cJ/5HW3gUdNsGLxl9wIeUvr6TMIqlZ8qiTG5XB+6oWU9EAPS\nC5klPTN+ME2EM32Fa0qE7EgzvZ9UcAt5zs92pydPSXqpgRV1GMqfcZ90q53X8yoD\nZio1bWhRvUjX3ycx06Du6KNCzL21WCbWpJCmTj2mD/dIrov+zEGyIbVBAoGALS1y\nDlNFGKh5VfooXMW1w9hMmtnuxJAMrajyYQ5Ze+KCU2T7fIiwm+I3ovvlEqAlidU4\nd6woNEMVpksySld3K4SSX3Qz8pS3pm184z9z6QOD5kR2HTNx7lef22LKUr1DUUNS\nJvu8jUsm83E0A0ZZY0HSM9s28w0QGdm/e6J2Q3UCgYEA0cxGemXMHINbDFZwU8LF\nqKJZxUNHmxACl/ruExPl4C0/z9Yx7SBOkP/u2mOO4Kg1AoZJBRv/+13EGihxnO4M\n96ZY665uk4V+JVNGLsOFlNMO7qlbZRUpE8+TnPlHaG51g4jCANQes5V5l9rW/r88\n+n5Ylt4clZW8xgUO0Yo5PDA=\n-----END PRIVATE KEY-----\n",
      client_email:
        "firebase-adminsdk-196u8@parakredim-7c769.iam.gserviceaccount.com",
      client_id: "115956467680422063521",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url:
        "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-196u8%40parakredim-7c769.iam.gserviceaccount.com",
      universe_domain: "googleapis.com",
    },
    aud: "https://oauth2.googleapis.com/token",
    payloadAdditions: {
      scope: [
        // scope required for firestore
        "https://www.googleapis.com/auth/datastore",
        // The following scopes are required only for realtime database
        "https://www.googleapis.com/auth/userinfo.email",
        "https://www.googleapis.com/auth/firebase.database",
      ].join(" "),
    },
  });

  const accessToken = await (
    await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwtToken, // the JWT token generated in the previous step
      }),
    })
  ).json();

  return accessToken;
}

/**
 * Get all documents in a collection
 */
export async function getCollection() {
  console.log("getCollection");
  const accessToken = await getAccessToken();

  const response = await (
    await fetch(
      "https://firestore.googleapis.com/v1/projects/parakredim-7c769/databases/(default)/documents/exchange_rates",
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken.access_token,
        },
      }
    )
  ).json();

 

  return documentToJson(response.documents[0].fields);
}
