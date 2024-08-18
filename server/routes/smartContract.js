router.post('/execute', async (req, res) => {
    try {
      const { contractId, functionName, params } = req.body;
  
      let functionParams = new ContractFunctionParameters();
      if (params && params.message) {
        functionParams.addString(params.message);
      }
  
      const transaction = await new ContractExecuteTransaction()
        .setContractId(contractId)
        .setGas(100000)
        .setFunction(functionName, functionParams);
  
      const txResponse = await transaction.execute(client);
      const record = await txResponse.getRecord(client);
  
      res.json({ result: record.contractFunctionResult.getString(0) });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;