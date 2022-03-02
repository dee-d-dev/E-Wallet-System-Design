exports.initiateWallet = (req, res) => {
  const wallet = new Wallet(req.body);

  if (wallet) {
    res.send("wallet exists");
  }
};
