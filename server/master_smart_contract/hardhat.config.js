require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      url: 'https://eth-sepolia.g.alchemy.com/v2/u21v3QE_kKB_QqyFhoOtmxBCU0gwLZZx',
      accounts: ['29a54bf89d9a45b6621cf9a3d6e8788e2d5a1e54a695b586711fdcaf78da11cc']
    }
  }
}

// https://eth-sepolia.g.alchemy.com/v2/u21v3QE_kKB_QqyFhoOtmxBCU0gwLZZx
