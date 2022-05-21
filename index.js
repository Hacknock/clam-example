import Clam from "./clam/clam.js";
const clam = new Clam();
let authInfo;
let json = {
  clientId: "hoge",
  scope: "hoge",
  redirectUrl: "hoge",
};

/**
 * Set Credential Information to get an access token
 */
document.getElementById("set-cred").addEventListener("click", () => {
  json.clientId = document.getElementById("clientId").value;
  json.scope = document.getElementById("scope").value;
  json.redirectUrl = document.getElementById("redirectUrl").value;
  try {
    clam.setCred(json);
    if (json.clientId && json.scope && json.redirectUrl) {
      document.getElementById("set-cred").textContent = "COMPLETE";
      document.getElementById("set-cred").style.color = "#4CAF50";
    }
    document.getElementById("message-cred").textContent = "";
  } catch (err) {
    document.getElementById("set-cred").textContent = "SET";
    document.getElementById("set-cred").style.color = "#F44336";
    document.getElementById("message-cred").textContent = err;
  }
});

document.getElementById("get-token").addEventListener("click", clam.getAuth);

authInfo = clam.getAuthInfo();
if (authInfo.token) {
  const ele = document.createElement("span");
  ele.textContent = authInfo.token;
  document.getElementById("message-token").appendChild(ele);
  document.getElementById("submit-button").disabled = false;
} else {
  // Do nothing
}

/**
 * Set default value to redirect URL text field
 */
if (!location.hash)
  document.getElementById("redirectUrl").value = location.href.replace(
    /\/$/,
    ""
  );
else
  document.getElementById("redirectUrl").value = location.href.replace(
    /\/\#.*/,
    ""
  );

function callback(err, fileName) {
  if (err) {
    console.error("failure: " + fileName);
    console.error(err);
    const ele = document.createElement("li");
    ele.setAttribute("class", "fail-item-upload");
    ele.textContent = "failure: " + fileName;
    document.getElementById("list-message").appendChild(ele);
  } else {
    console.log("success: " + fileName);
    const ele = document.createElement("li");
    ele.setAttribute("class", "success-item-upload");
    ele.textContent = "success: " + fileName;
    document.getElementById("list-message").appendChild(ele);
  }
}

formElem.onsubmit = async (e) => {
  e.preventDefault();
  const files = document.getElementById("file-upload").files;
  console.log(files);
  const result = await clam.uploadFiles(
    files,
    document.getElementById("bucket-name").value,
    callback
  );
  console.log(result);
};
