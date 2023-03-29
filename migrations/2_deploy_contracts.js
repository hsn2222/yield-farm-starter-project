const TokenFarm = artifacts.require(`TokenFarm`)
const DappToken = artifacts.require(`DappToken`)
const DaiToken = artifacts.require(`DaiToken`)

module.exports = async function (deployer, newtwork, accounts) {
  /** 各スマートコントラクトのデプロイ */
  // DaiTokenのデプロイ
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // DappTokenのデプロイ
  await deployer.deploy(DappToken)
  const dappToken = await DappToken.deployed()

  // TokenFarmのデプロイ
  await deployer.deploy(TokenFarm, dappToken.address, daiToken.address)
  const tokenFarm = await TokenFarm.deployed()

  /** トークンの適用 */
  // 100万Dappデプロイする（存在するトークンの総供給量）
  // 投資家の見返りとなるDappトークンを管理するために、tokenFarmのアドレスが所有する
  await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

  // 100万Daiデプロイする（存在するトークンの総供給量）
  // 投資家Aに既存通貨(仮)であるDaiトークンを所有していると仮定する
  await daiToken.transfer(accounts[1], '100000000000000000000')
}
