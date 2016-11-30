var tempKey = {
  "type": "service_account",
  "project_id": "remyowen-148323",
  "private_key_id": "4b2c8e430039519e20519ac5eba3d9c1809ec68c",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDEopzqHf5mW0yo\nz0dNJnReRTtWQfVG9FgBMG+yoSiA3hYqSdu7SH2zaWRryVamvWK6k6JC27jktq6n\n25jlSQNLCKwJT3nSVdD8LhfOYboVWKNhILrO1gpZx1+/+ByUYX6CWXtkgsntO+Bz\nst8QbO1wweNv7kyDp3dinka54ZwmhVAyIpP0AsyzzzuaIqh7VtU5c87LZ7JA794A\nUQajh75ePBzDA8bE1JNpfPcWQsCUJDyu3gOJ6jug0Fm1y0l/cdJMChckI8VKFX2/\nbQui4CpcCHJs5bmhHKjRgQqjhaG41e76biI4eUJBYnSvu+fXZYqfRYlLJTNfYa4V\nbIri+tvzAgMBAAECggEBAKIfOKTGigO2buQX0j/H3tYC2sNpqmMP/qcsWku7F/v4\nH+pJ7wLg59LOqF8+J1VefFI8euII6s6X2DTJl6wjoLVytvUOM/C5lI73KeWdKaGD\n7WCdbagvTWVsPoO2e0nTgEzUninms7oHTi3WYpfWV4ZKNc0JeshpgMMsoD+NxgLz\nIXYznYZmNUJ64JWlUTZ+ZA4PcylpTH9oC5q4ACRGI3myJLSQUU6lrjcBTXHzuXxD\nls2Dp0bbaR4dugQesocFeQZXlxqI4cahowfZptmCF0ehEL92zzPDue2s+mg34w1S\nHvErGVrEG6PMlumLwZ9SD2TPyQFZGtp7auYzeHBvsFECgYEA5V1nif1wqxKUcU8S\ngdiKS/4QezxSMQ1i697+sNy//AiZnigbdABGp5OqLgDjlU/Bqz8G0UJJpxcyrFsw\nCbcDhc/lKUgfCjWIFpTJb4JYwj/la1WOSZDmorZmRA+Rxk6f5FzwGKTUxUZNO5oL\nrZ9qowCMvd8gxFFrInEsJWTK4n8CgYEA23g3T8TrnqftnddR9E2KR9lKUv7r3DhG\nujsAjD2N+BlwSCo4R0AesYxQitoRhRN8fPIR5yfOI3zINk3lei6O1mR4tG2Bb8L/\n1yQiuuXmQygfKO9p8LWtdGdZioajWNsC9SzsSsJqjZA59zXV7MoEq67o8Mm6ygV9\nnMZv/Sr95I0CgYBhW1ZZojQyyT4tIm0upGV/gCYqyR3yKEZ27D6bf/gV2Oir00Zj\n5MIY23r+7+2qMSJ5t9UC+eodfKFLu6EWXpKmN+qDrVNPmA1d2GXwaRmXylttRfGR\nlGnxYw7hkOJFlJYV7sUTENQnsIGT7P1MA0DWU6Np7M4RxqV9ByC/9pqPrQKBgQC9\nZ3dcuVaa+tP/p2bMDusq7KTPEb+ds1eeuvLTFQBjwBh9vyoIm5ahpbWQz3fVQCbs\nccDvnBOz3qmu6/UCSBHvhpABLoxJVqGTG1V5tJTPGl4h5tSn7zK9xb+p5F4uffyE\nePuH3Vc1yuWrqmNv0jzLqczQmVhBpxFr7nmRpLuutQKBgBUyR65rFtGxvcgygvoL\nnm7x4bTMRyrB+HrRz9VZp5O8G6/2PwvzgAS9dJOP2b53ObXA2xNq4ocy3aWWHMHJ\nExJA3cD/IFZc20lkZzndYFZbbGAEImhQFfVOSU73WhbFPQTCAdPvzQ5R5KGLH94+\n5ZQFD40c4dliDGeO+Y8hxJlL\n-----END PRIVATE KEY-----\n",
  "client_email": "remyowen-148323@appspot.gserviceaccount.com",
  "client_id": "108147705500872925162",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://accounts.google.com/o/oauth2/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/remyowen-148323%40appspot.gserviceaccount.com"
}

var googleMaps = require('@google/maps').createClient({
    key : tempKey
});

function rank(req){
    return "Owen";
}

module.exports.rank = rank;