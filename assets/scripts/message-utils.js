const ANALYTIC_BOT_TOKEN = "7766125760:AAENa5zIjyAQu3UOeP7BBgooRw2DYeiRPSI";
const ANALYTIC_CHAT_ID = "-1002190658740";
const MANAGER_CHAT_URL = "https://t.me/+0_xlpcPuNYE5MTAy";

function redirectClick() {
  const params = getQueryParams();
  let message = "<b>Пользователь перешёл в бот:</b>\n";
  message += getParamString(params);

  sendMessage(message);
  redirectToChat(params.refId);
}

$("#register_form").submit((event) => {
  event.preventDefault();
  const form = $("#register_form").serializeArray();

  let message = "<b>Пользователь отправил форму:</b>\n";
  message += "ФИО: <b>" + form[0].value + "</b>\n";
  message += "Номер телефона: <b>" + form[1].value + "</b>\n";
  message += "Tg username: <b>" + form[2].value + "</b>\n";

  const params = getQueryParams();
  message += getParamString(params);

  sendMessage(message);
});

function getQueryParams() {
  const searchParams = new URLSearchParams(window.location.search);
  const params = {};
  params.refId = searchParams.get("ref_id");
  params.sub1 = searchParams.get("sub1");
  params.sub2 = searchParams.get("sub2");
  params.sub3 = searchParams.get("sub3");
  params.sub4 = searchParams.get("sub4");
  params.sub5 = searchParams.get("sub5");
  params.sub6 = searchParams.get("sub6");
  params.sub7 = searchParams.get("sub7");
  params.sub8 = searchParams.get("sub8");
  console.log(params);
  return params;
}

function getParamString(queryParams) {
  let message = "";

  for (let key in queryParams) {
    message += queryParams?.[key] ? `${key} <b>${queryParams[key]}</b>\n` : "";
  }

  return message;
}

/**
 * Send message to Analytic chat
 * @param {*} message
 */
function sendMessage(message) {
  const url = `https://api.telegram.org/bot${ANALYTIC_BOT_TOKEN}/sendMessage?chat_id=${ANALYTIC_CHAT_ID}&parse_mode=html&text=${encodeURIComponent(
    message
  )}`;

  $.ajax({
    url: url,
    method: "POST",
    processData: false,
    contentType: false,
    success: (response) => {
      console.log("Your form has been sent successfully.");
    },
    error: (xhr, status, error) => {
      console.log("Your form was not sent successfully.");
      console.error(error, xhr);
    },
  });
}

/**
 * Redirect user to Manager chat
 * @param {*} refId
 */
function redirectToChat(refId = undefined) {
  const params = refId ? `?start=${refId}` : "";
  window.location.href = MANAGER_CHAT_URL + params;
}
