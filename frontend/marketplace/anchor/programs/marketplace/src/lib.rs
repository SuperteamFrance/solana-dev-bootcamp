use anchor_lang::prelude::*;
use anchor_lang::system_program;
use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{self, Mint, Token, TokenAccount, Transfer};

declare_id!("86pLXiqvd8h51GLDsd9FCGJ5DLxuJZcSYarq2MRWPp6W");

#[program]
pub mod marketplace {
    use super::*;

    // Initializes the escrow by transferring SOL from the maker to a PDA (escrow account)
    pub fn initialize_escrow(
        ctx: Context<InitializeEscrow>,
        maker_amount: u64,
        taker_amount: u64,
        taker_token_mint: Pubkey,
    ) -> Result<()> {
        let escrow_account = &mut ctx.accounts.escrow_account;
        // Store the maker's public key, the escrow SOL amount, token mint, and token amount in the escrow account
        escrow_account.maker = *ctx.accounts.maker.key;
        escrow_account.maker_amount = maker_amount;
        escrow_account.taker_amount = taker_amount;
        escrow_account.taker_token_mint = taker_token_mint;

        // Transfer SOL from the maker account to the escrow account (PDA)
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.maker.to_account_info(),
                    to: ctx.accounts.escrow_account.to_account_info(),
                },
            ),
            maker_amount,
        )?;

        Ok(())
    }

    pub fn accept_escrow(ctx: Context<AcceptEscrow>) -> Result<()> {
        let escrow_account = &ctx.accounts.escrow_account;

        // Transfer tokens from the taker's token account to the maker's token account
        let token_transfer_cpi = Transfer {
            from: ctx.accounts.taker_token_account.to_account_info(),
            to: ctx.accounts.maker_token_account.to_account_info(),
            authority: ctx.accounts.taker.to_account_info(),
        };
        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token_transfer_cpi,
        );
        token::transfer(cpi_ctx, escrow_account.taker_amount)?;

        // Transfer SOL from the escrow account to the taker account
        **ctx
            .accounts
            .escrow_account
            .to_account_info()
            .try_borrow_mut_lamports()? -= escrow_account.maker_amount;
        **ctx
            .accounts
            .taker
            .to_account_info()
            .try_borrow_mut_lamports()? += escrow_account.maker_amount;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeEscrow<'info> {
    #[account(
        init, // Initialize a new account
        payer = maker, // The maker pays for the account creation
        space = 8 + 32 + 8 + 8 + 32, // Space for the account: discriminator (8 bytes), maker (32 bytes), amounts (8 + 8 bytes), token mint (32 bytes)
        seeds = [b"escrow", maker.key().as_ref()], // Derive the PDA using the maker public key
        bump // Generate a bump to make the PDA unique
    )]
    pub escrow_account: Account<'info, EscrowAccount>, // The PDA that holds the escrowed funds
    #[account(mut)] // The maker's account, which will fund the escrow
    pub maker: Signer<'info>, // The maker must sign the transaction
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct AcceptEscrow<'info> {
    #[account(
        mut, // The escrow account will be modified (funds transferred)
        seeds = [b"escrow", escrow_account.maker.as_ref()], // Validate the PDA matches the original maker's public key
        bump, // Use the same bump used during initialization
        close = maker // Close the escrow account and refund any remaining lamports to the maker
    )]
    pub escrow_account: Account<'info, EscrowAccount>,
    #[account(mut)]
    pub taker: Signer<'info>, // The taker must sign the transaction
    #[account(mut)]
    pub taker_token_account: Account<'info, TokenAccount>, // Taker's token account (from which tokens will be sent)
    /// CHECK: The maker account is only checked to match the stored maker key in the escrow account
    #[account(mut, address = escrow_account.maker)]
    pub maker: AccountInfo<'info>,
    #[account(
        init_if_needed,
        payer = taker,
        associated_token::mint = taker_token_mint,
        associated_token::authority = maker
    )]
    pub maker_token_account: Account<'info, TokenAccount>, // Maker's token account (to which tokens will be sent)
    pub taker_token_mint: Account<'info, Mint>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct EscrowAccount {
    pub maker: Pubkey,     // The public key of the maker who initialized the escrow
    pub maker_amount: u64, // The amount of SOL to be escrowed
    pub taker_amount: u64, // The amount of tokens to be received
    pub taker_token_mint: Pubkey, // The mint of the token to be received
}

