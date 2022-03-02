// const request = require("request");

// exports.cardFund = (req, res) => {
//   request("https://api.paystack.co/charge", {
//     card: {
//       number: "4084084084084081",
//       expiry_month: "01",
//       expiry_year: "99",
//     },
//   });
// };

const request = require("request");
let options = {
  method: "POST",
  url: "https://api.paystack.co/charge",
  headers: {
    Authorization: `Bearer ${process.env.SECRET_KEY}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    email: "adedigbaadedotunemmanuel@gmail.com",
    amount: "10000",
    metadata: {
      custom_fields: [
        {
          value: "makurdi",
          display_name: "Donation for",
          variable_name: "donation_for",
        },
      ],
    },
    card: {
      cvv: "408",
      number: "4084084084084081",
      expiry_month: "01",
      expiry_year: "99",
    },
    pin: "0000",
  }),
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});
