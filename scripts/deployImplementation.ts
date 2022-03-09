const hre = require('hardhat')
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'
const { ethers } = hre

import {
  InstaFlashAggregatorArbitrum,
  InstaFlashAggregatorArbitrum__factory,
} from '../typechain'

let Aggregator, aggregator: InstaFlashAggregatorArbitrum

async function scriptRunner() {
  let signer: SignerWithAddress
  ;[signer] = await ethers.getSigners()

  console.log((await ethers.provider.getBalance(signer.address)).toString())
  console.log(signer.address)

  Aggregator = new InstaFlashAggregatorArbitrum__factory(signer)
  aggregator = await Aggregator.deploy()
  await aggregator.deployed()

  await hre.run('verify:verify', {
    address: aggregator.address,
    constructorArguments: [],
  })

  console.log((await ethers.provider.getBalance(signer.address)).toString())
}

scriptRunner()
  .then(() => console.log(`Deployed aggregator on ${aggregator.address}`))
  .catch((err) => console.error('❌ failed due to error: ', err))
