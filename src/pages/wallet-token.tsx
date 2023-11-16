import NFTCard from "@/components/NFTCard";
import TokenCard from "@/components/TokenCard";
import Layout from "@/layout/Layout";
import { getTokenAddress } from "@/util/getContractAddress";
import { getNFTContract, getTokenContract } from "@/util/getContracts";
import { useAddress, useOwnedNFTs, useTokenSupply } from "@thirdweb-dev/react";

export default function WalletToken() {

    const token_address = getTokenAddress()
    const { token_contract } = getTokenContract()
    const address = useAddress()
    const { data: totalSupply, isLoading: supplyLoading, error: supllyError } = useTokenSupply(token_contract);

    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    My TOKENs
                </h1>

                <div className="flex flex-row">
                    {!address && (<div>No Wallet Detected...</div>)}
                    {supplyLoading ? <div>Loading NFT Data...</div> : <div>
                        {totalSupply && <TokenCard />}</div>}
                </div>
            </div>
        </Layout>
    );
}
