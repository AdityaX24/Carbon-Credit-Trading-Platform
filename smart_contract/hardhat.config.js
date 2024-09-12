// https://eth-sepolia.g.alchemy.com/v2/99FnjbEZlE4x9kgX-LyfUU1Ez_PIZcwl

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks: {
    sepolia: {
      // url: 'https://eth-sepolia.g.alchemy.com/v2/99FnjbEZlE4x9kgX-LyfUU1Ez_PIZcwl',
      url: 'https://eth-sepolia.g.alchemy.com/v2/_rIjNCEu7s2Ekv_svFbDjgkEV2iOohYm',
      accounts: [ '2ac10bf7f28acc3709fb614b7c67cd7843e4c12e322c834ce0bfd388e5a29d62']
    }
  }
}