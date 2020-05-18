var SquareVerifier = artifacts.require('SquareVerifier');


let proofJson = {
    "proof": {
        "a": ["0x1ba0df5159c4c75da8a30d34e28b0a2242b9634aed77c9b41b979e6081ed5033", "0x04a81e18c8c57362b000213bce6d533055ba4f830dc76abf9c5bf37907ffbdd0"],
        "b": [["0x272c1132c59a11b904df2e3921eaf7b40ce948a1a24e9b36dd6e2e04cc3e9560", "0x1535e1e6c5cb4d685ef68595487910d68d8813765f422b977b53e32f8c53fc94"], ["0x26e8a26d9bd754c038c42bb9b5b32b91a0c1463aba53b03eb8e224f1230f853a", "0x2c080f65faca972f26229da56b338fc12d62261f8626ec42659bc1090e7a983d"]],
        "c": ["0x08c833d09a989255fa84bd16e9b4374fbf2c59f92f8b67298771b72c03e56f7f", "0x2f85944aef8c9f217463077e0d8f85fdf5546b3b570820ade0cf9c95a3feb440"]
    },
    "inputs": ["0x0000000000000000000000000000000000000000000000000000000000000009", "0x0000000000000000000000000000000000000000000000000000000000000001"]
}

contract('SquareVerifier', accounts => {
  describe('Test SquareVerifier', function () {

      const account_one = accounts[0];

      beforeEach(async function () { 
          this.contract = await SquareVerifier.new({from: account_one});
      })
      it('should verify correct proof', async function () {
          let verified = await this.contract.verifyTx.call(
            proofJson.proof.a, proofJson.proof.b, proofJson.proof.c,
            proofJson.inputs
          )
          assert.equal(verified, true, 'should not fail with a correct proof')
      })
      it('should reject incorrect proof', async function () {
          let verified = await this.contract.verifyTx.call(
            proofJson.proof.a, proofJson.proof.b, proofJson.proof.a,
            proofJson.inputs
          )
          assert.strictEqual(verified, false, 'should accept a incorrect proof')
      })
  })
})
