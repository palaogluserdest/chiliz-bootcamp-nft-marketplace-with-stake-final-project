import { createListingFromPriceID } from "@/util/createListing";
import { getMarketplaceAddress, getTokenAddress } from "@/util/getContractAddress";
import { getMarketplaceContract, getNFTContract, getTokenContract } from "@/util/getContracts";
import {
    Marketplace,
    RequiredParam,
    useCreateDirectListing,
    useGrantRole,
    useTransferToken,
} from "@thirdweb-dev/react";
import { useState, type FC } from "react";

interface TransferTokenCardProps {
    amountToken: number;
    onUpdateAmount: (newAmount: number) => void;
}

const TransferTokenCard: FC<TransferTokenCardProps> = ({ amountToken, onUpdateAmount }) => {

    const token_address = getTokenAddress()
    const { token_contract } = getTokenContract()
    const [transferAddress, setTransferAddress] = useState("")

    const {
        mutate: transferTokens,
        isLoading: tokenLoading,
        error: tokenError,
    } = useTransferToken(token_contract);

    if (tokenError) {
        console.error("failed to transfer tokens", tokenError);
    }

    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onUpdateAmount(Number(event.target.value));
    };
    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const transferAddress = event.target.value;
        setTransferAddress(transferAddress)
    };

    const handleTransfer = () => {
        transferTokens({ to: `${transferAddress}`, amount: `${amountToken}`})
    }



    return (
        <div className="relative bg-gray-800 text-white p-6 rounded-lg w-100 shadow-md mt-4">
            <h1 className="text-2xl font-semibold mb-2 ">Transfer Token</h1>

            <div className="flex flex-col gap-3">
                <label className="font-bold text-xl">Amount</label>
                <input
                    className=" ml-2 bg-gray-800 w-100"
                    placeholder="Transfer amount"
                    type="number"
                    onChange={handleAmountChange}
                />
            </div>
            <div className="flex flex-col gap-3">
                <label className="font-bold text-xl">Transfer Address</label>
                <input
                    className=" ml-2 bg-gray-800 w-100"
                    placeholder="Transfer Address"
                    type="text"
                    onChange={handleAddressChange}
                />
            </div>

            <button
                onClick={handleTransfer}
                className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
                Transfer
            </button>
            {(tokenError as unknown as boolean) ? (<div className="text-center mt-4">
                Error transfering...
            </div>) : null}
            {tokenLoading && <div className="text-center mt-4">Transfer in Progress</div>}
        </div>
    );
};
export default TransferTokenCard;
