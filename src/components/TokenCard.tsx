import { getTokenAddress } from "@/util/getContractAddress";
import { getTokenContract } from "@/util/getContracts";
import { useTokenBalance, useTokenSupply } from "@thirdweb-dev/react";
import TransferTokenCard from "./TransferTokenCard";
import { useState } from "react";


 const TokenCard = () => {
  const [amountToken, setAmountToken] = useState(0)


  const token_address = getTokenAddress()
  const {token_contract} = getTokenContract()
  const { data: balance, isLoading:BalanceLoading, error: balanceError } = useTokenBalance(token_contract, token_address);
  const { data: totalSupply, isLoading: supplyLoading, error: supllyError } = useTokenSupply(token_contract);

  console.log("Balance: ", balance)
  console.log("TotalSuplly: ", totalSupply)


  return (
    <>
      <div
        className="block rounded-lg bg-white p-6 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:bg-neutral-700 my-3">
        <h5
          className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
          Your own TOKENs
        </h5>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          Name: {totalSupply?.name}
        </p>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          Symbol: {totalSupply?.symbol}
        </p>
        <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
          Amount: {totalSupply?.displayValue}
        </p>
      </div>

      <TransferTokenCard amountToken={amountToken} onUpdateAmount={setAmountToken}  />
    </>
  )
}

export default TokenCard