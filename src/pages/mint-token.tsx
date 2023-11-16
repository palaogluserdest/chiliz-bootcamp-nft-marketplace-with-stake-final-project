import Layout from "@/layout/Layout";
import { getTokenAddress } from "@/util/getContractAddress";
import { useAddress, useContract, useMintNFT, useMintToken } from "@thirdweb-dev/react";
import { useState } from "react";

export default function mintToken() {
    const address = useAddress()
    const token_address = getTokenAddress()
    const { contract } = useContract(token_address);
    const {
        mutate: mintTokens,
        isLoading: tokenLoading,
        error: tokenError,
    } = useMintToken(contract);

    if (tokenError) {
        console.error("failed to mint tokens", tokenError);
    }

    const [amount, setAmount] = useState(0)
    const [message, setMessage] = useState("")


    const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(Number(event.target.value));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        try {
            event.preventDefault();
            if (amount === 0) return

            mintTokens({ to: address ?? "", amount: amount })

        } catch (error) {
            setMessage("Someting wrong!")
        }
    };
    return (
        <Layout>
            <div>
                <h1 className="text-6xl font-semibold my-4 text-center">
                    Mint a few TOKEN
                </h1>

                <div className="relative bg-gray-800 text-white p-6 rounded-lg shadow-md w-full max-w-2xl">
                    <h1 className="text-2xl font-semibold my-4 text-center">
                        Enter token amount you want to mint{" "}
                    </h1>
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label className="font-bold text-xl">Amount:</label>
                            <input
                                className=" ml-2 bg-gray-800"
                                placeholder="Enter token amount"
                                type="text"
                                onChange={handleAmountChange}
                            />
                        </div>
                        <button
                            className="mt-6 bg-blue-700 text-white font-bold py-2 px-4  rounded text-center"
                            type="submit"
                        >
                            Mint
                        </button>
                    </form>
                    {tokenLoading && (
                        <div className="text-center mt-4">
                            Minting is progress
                        </div>
                    )}
                    {(tokenError as unknown as boolean) ? (
                        <div className="text-center mt-4">
                            Minting error
                        </div>
                    ) : null}
                </div>
            </div>
        </Layout>
    );
}
