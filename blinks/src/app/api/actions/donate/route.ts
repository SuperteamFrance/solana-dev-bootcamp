/**
 * Solana Actions Example
 */

import {
  ActionPostResponse,
  ACTIONS_CORS_HEADERS,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
} from "@solana/actions";
import {
  clusterApiUrl,
  ComputeBudgetProgram,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

const DEFAULT_SOL_ADDRESS = "7ytz8nC61oANn6mtJG7ZaQZEieP4ZkqeeB6A7XzcNS1r";
const DEFAULT_SOL_AMOUNT = 0.1;

const NGROK_URL =
  "https://ab62-2a01-cb00-362-6b00-3d5a-35da-1f53-e45.ngrok-free.app";

export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);

    const baseHref = new URL(
      `/api/actions/donate`,
      NGROK_URL || requestUrl.origin
    ).toString();

    const payload: ActionGetResponse = {
      title: "Support 76th dev",
      icon: new URL(
        "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png",
        requestUrl.origin
      ).toString(),
      description:
        "Donate SOL to support the 76th dev chewing glass on Solana!",
      label: "Send",
      links: {
        actions: [
          {
            label: "0.1 SOL",
            href: `${baseHref}?amount=${"0.1"}`,
            type: "transaction",
          },
          {
            label: "0.25 SOL",
            href: `${baseHref}?amount=${"0.25"}`,
            type: "transaction",
          },
          {
            label: "0.5 SOL",
            href: `${baseHref}?amount=${"0.5"}`,
            type: "transaction",
          },
          {
            label: "Send",
            href: `${baseHref}?amount={amount}`,
            type: "transaction",
            parameters: [
              {
                name: "amount", // parameter name in the `href` above
                label: "Amount of SOL to donate",
                required: true,
              },
            ],
          },
        ],
      },
    };

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.log(err);
    let message = "An unknown error occurred";
    if (typeof err == "string") message = err;
    return new Response(message, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

// DO NOT FORGET TO INCLUDE THE `OPTIONS` HTTP METHOD
// THIS WILL ENSURE CORS WORKS FOR BLINKS
export const OPTIONS = GET;

export const POST = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { amount } = validatedQueryParams(requestUrl);

    const body: ActionPostRequest = await req.json();

    // validate the client provided input
    let fromPubkey: PublicKey;
    try {
      fromPubkey = new PublicKey(body.account);
    } catch (err) {
      return new Response('Invalid "from" provided', {
        status: 400,
        headers: ACTIONS_CORS_HEADERS,
      });
    }

    const toPubkey = new PublicKey(DEFAULT_SOL_ADDRESS);
    const connection = new Connection(
      process.env.SOLANA_RPC! || clusterApiUrl("devnet")
    );

    // ensure the receiving account will be rent exempt
    const minimumBalance = await connection.getMinimumBalanceForRentExemption(
      0 // note: simple accounts that just store native SOL have `0` bytes of data
    );
    if (amount * LAMPORTS_PER_SOL < minimumBalance) {
      throw `account may not be rent exempt: ${toPubkey.toBase58()}`;
    }

    const transaction = new Transaction();

    transaction.add(
      // Set transaction compute units
      ComputeBudgetProgram.setComputeUnitLimit({
        units: 800,
      }),
      SystemProgram.transfer({
        fromPubkey: fromPubkey,
        toPubkey: toPubkey,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );

    // set the end user as the fee payer
    transaction.feePayer = fromPubkey;

    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        type: "transaction",
        transaction,
        message: `Send ${amount} SOL to ${toPubkey.toBase58()}`,
      },
      // note: no additional signers are needed
      // signers: [],
    });

    return Response.json(payload, {
      headers: ACTIONS_CORS_HEADERS,
    });
  } catch (err) {
    console.log(err);
    let message = "An unknown error occurred";
    if (typeof err == "string") message = err;
    return new Response(message, {
      status: 400,
      headers: ACTIONS_CORS_HEADERS,
    });
  }
};

function validatedQueryParams(requestUrl: URL) {
  let toPubkey: PublicKey = new PublicKey(DEFAULT_SOL_ADDRESS);
  let amount: number = DEFAULT_SOL_AMOUNT;

  try {
    if (requestUrl.searchParams.get("to")) {
      toPubkey = new PublicKey(requestUrl.searchParams.get("to")!);
    }
  } catch (err) {
    throw "Invalid input query parameter: to";
  }

  try {
    if (requestUrl.searchParams.get("amount")) {
      amount = parseFloat(requestUrl.searchParams.get("amount")!);
    }

    if (amount <= 0) throw "amount is too small";
  } catch (err) {
    throw "Invalid input query parameter: amount";
  }

  return {
    amount,
    toPubkey,
  };
}
