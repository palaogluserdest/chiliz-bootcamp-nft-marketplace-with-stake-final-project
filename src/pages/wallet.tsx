import NFTCard from "@/components/NFTCard";
import TokenCard from "@/components/TokenCard";
import Layout from "@/layout/Layout";
import { getNFTContract } from "@/util/getContracts";
import { useAddress, useOwnedNFTs } from "@thirdweb-dev/react";

export default function Wallet() {

    const { nft_contract } = getNFTContract()
    const address = useAddress()
    const { data: ownedNFTs, isLoading, error } = useOwnedNFTs(nft_contract, address, { start: 0, count: 100 });

    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    My NFTs
                </h1>

                <div className="flex flex-row">
                    {!address && (<div>No Wallet Detected...</div>)}
                    {isLoading ? <div>Loading NFT Data...</div> : <div>
                        {ownedNFTs && ownedNFTs.map((nft, id) => {
                            return (<NFTCard key={id} {...nft} />)
                        })}</div>}
                </div>


                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-6 ">
                    {/* Mapping Owned NFTS */}
                </div>
            </div>
        </Layout>
    );
}
