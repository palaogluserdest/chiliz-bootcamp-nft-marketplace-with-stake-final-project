import { getMarketplaceContract } from "@/util/getContracts";
import { useCancelDirectListing } from "@thirdweb-dev/react";
import { FC } from "react";

interface CancelSellingCardProps {
    price: number;
    symbol: string;
    listingID: string;
}

const CancelSellingCard: FC<CancelSellingCardProps> = ({
    price,
    symbol,
    listingID,
}) => {
    const {marketplace} = getMarketplaceContract()
    const {mutate:cancelDirectListing, isLoading, error} = useCancelDirectListing(marketplace)
    const handleDelist = () => {
        try{
            cancelDirectListing(listingID)
        }catch(e){
            console.log("Error Delisting", e);
        }
    };

    return (
        <div className="relative bg-gray-800 text-white p-6 rounded-lg w-8/12 shadow-md mt-4">
            <h1 className="text-2xl font-semibold mb-2 ">
                {`NFT is listed for ${price} ${symbol}`}
            </h1>

            <button
                onClick={handleDelist}
                className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
            >
                Cancel Listing
            </button>
            {(error as unknown as boolean) ? (<div className="text-center mt-4">
                Error Listing...
            </div>) : null}
            {isLoading && <div className="text-center mt-4">Listing in Progress</div>}
        </div>
    );
};
export default CancelSellingCard;
