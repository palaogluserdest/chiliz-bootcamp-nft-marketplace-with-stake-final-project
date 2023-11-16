import { createListingFromPriceID } from "@/util/createListing";
import { getMarketplaceAddress } from "@/util/getContractAddress";
import { getMarketplaceContract, getNFTContract } from "@/util/getContracts";
import {
    Marketplace,
    RequiredParam,
    useCreateDirectListing,
    useGrantRole,
} from "@thirdweb-dev/react";
import { type FC } from "react";

interface SellNFTCardProps {
    price: number;
    onUpdatePrice: (newPrice: number) => void;
    amount: number;
    onUpdateAmount: (newAmount: number) => void;
    id: string;
}

const SellNFTCard: FC<SellNFTCardProps> = ({ price, onUpdatePrice, amount, onUpdateAmount, id }) => {

    const { marketplace } = getMarketplaceContract()
    const { nft_contract } = getNFTContract()
    const { mutate: grantRole, error: roleError } = useGrantRole(nft_contract)
    const { mutate: createDirectListing, isLoading: listingLoading, error: ListError } = useCreateDirectListing(marketplace as RequiredParam<Marketplace>)

    const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onUpdatePrice(Number(event.target.value));
    };

    const handleTokenAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
        onUpdateAmount(Number(event.target.value))
    }

    const handleListing = () => {
        try {
            grantRole({
                role: 'admin',
                address: getMarketplaceAddress()
            })
            const listing = createListingFromPriceID(price, id)
            createDirectListing(listing)

        } catch (error) {
            console.log('Error Listing ', error)
        }
    };

    return (
        <div className="relative bg-gray-800 text-white p-6 rounded-lg w-6/12 shadow-md mt-4">
            <h1 className="text-2xl font-semibold mb-2 ">Sell NFT</h1>
            <div className="flex flex-col">
            <div className="flex-col mt-3">
                <label className="font-bold text-xl mt-2">Chz Price</label>
                <input
                    className=" ml-2 bg-gray-800 w-100"
                    placeholder="Recipient Address"
                    type="number"
                    value={price}
                    onChange={handlePriceChange}
                />
            </div>
            <div className="flex-col mt-3">
                <label className="font-bold text-xl">Token Amount</label>
                <input
                    className=" ml-2 bg-gray-800 w-100"
                    placeholder="Recipient Address"
                    type="number"
                    value={amount}
                    onChange={handleTokenAmount}
                />
            </div>
            </div>

            <button
                onClick={handleListing}
                className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
                List
            </button>
            {(roleError as unknown as boolean) || (ListError as unknown as boolean) ? (<div className="text-center mt-4">
                Error Listing...
            </div>) : null}
            {listingLoading && <div className="text-center mt-4">Listing in Progress</div>}
        </div>
    );
};
export default SellNFTCard;
