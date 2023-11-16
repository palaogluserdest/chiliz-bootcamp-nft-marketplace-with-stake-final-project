import Layout from "@/layout/Layout";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getMarketplaceContract, getNFTContract } from "@/util/getContracts";
import { useContract, useNFT, useTransferNFT, useValidDirectListings } from "@thirdweb-dev/react";
import NFTDetails from "@/components/NFTDetails";
import CancelSellingCard from "@/components/CancelSelling";
import SellNFTCard from "@/components/SellNFTCard";
import { getNFTAddress } from "@/util/getContractAddress";

function NFTDetailsPage() {
    const { nft_contract } = getNFTContract()
    const { marketplace } = getMarketplaceContract()
    const router = useRouter();
    const [price, setPrice] = useState(0.01);
    const [amount, setAmount] = useState(0)
    const [symbol, setSymbol] = useState("");
    const [address, setAddress] = useState("")
    const [listingID, setListingID] = useState("");
    const [nftID, setNftID] = useState("");
    const { data: nft, isLoading: isNftLoading } = useNFT(nft_contract, nftID)
    const { data: directListings } = useValidDirectListings(marketplace, {
        start: 0,
        count: 100
    })
    // *********************************************************************************************
    const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(event.target.value);
    };
    const nft_address = getNFTAddress()
    const { contract } = useContract(nft_address);
    const {
        mutate: transferNFT,
        isLoading:listingLoading,
        error,
    } = useTransferNFT(contract);

    if (error) {
        console.error("failed to transfer NFT", error);
    }

    // *********************************************************************************************

    useEffect(() => {
        if (typeof window !== "undefined") {
            const { id } = router.query;
            setNftID(id as string);
        }

        let listedNFT = directListings?.find(item => item.tokenId === nftID)
        if (listedNFT) {
            setListingID(listedNFT.id)
            setPrice(Number(listedNFT.currencyValuePerToken.displayValue))
            setSymbol(listedNFT.currencyValuePerToken.symbol)
        }
    }, [router.query]);

    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    NFT Details
                </h1>
                {isNftLoading || !nft ? <div className="text-center">
                    {`Loading NFT with id ${nftID}`}
                </div> : <>
                    <NFTDetails {...nft} />
                    <div className="flex flex-row gap-2">
                    {listingID ? (<CancelSellingCard price={price} symbol={symbol} listingID={listingID} />) : (<SellNFTCard price={price} onUpdatePrice={setPrice} amount={amount} onUpdateAmount={setAmount} id={nftID} />)}
                    <div className="relative bg-gray-800 text-white p-6 rounded-lg w-6/12 shadow-md mt-4">
                        <h1 className="text-2xl font-semibold mb-2 ">Transfer NFT</h1>

                        <div className="flex flex-col">
                            <label className="font-bold text-xl">Transfer Address</label>
                            <input
                                className=" ml-2 bg-gray-800 w-100"
                                placeholder="Transfer Address"
                                type="text"
                                onChange={handleAddressChange}
                            />
                        </div>

                        <button
                            onClick={() => transferNFT({
                                to: `${address}`,
                                tokenId: `${nftID}`
                            })}
                            className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded"
                        >
                            Transfer
                        </button>
                        {listingLoading && <div className="text-center mt-4">Transfer in Progress</div>}
                    </div>
                    </div>
                </>}
            </div>
        </Layout>
    );
}
export default NFTDetailsPage;
