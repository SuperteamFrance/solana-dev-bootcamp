use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("ZGaUJiLT5MbBTmyEDvNZQiBy7VUnBeCa6oX8jB8fLvk");

#[program]
pub mod escrow_sol {
    use super::*;

    pub fn initialize_escrow(ctx: Context<InitializeEscrow>, amount: u64) -> Result<()> {
        // TODO: Store maker public key and amount in the escrow account
        let escrow_account = &mut ctx.accounts.escrow_account;
        escrow_account.amount = amount;
        escrow_account.maker = *ctx.accounts.maker.key;

        // TODO: Transfer SOL from the maker to the escrow account
        system_program::transfer(
            CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                system_program::Transfer {
                    from: ctx.accounts.maker.to_account_info(),
                    to: ctx.accounts.escrow_account.to_account_info(),
                },
            ),
            amount,
        )?;
        Ok(())
    }

    pub fn accept_escrow(ctx: Context<AcceptEscrow>) -> Result<()> {
        // TODO: Transfer SOL from the escrow account to the taker
        let escrow_account = &ctx.accounts.escrow_account;

        **ctx
            .accounts
            .escrow_account
            .to_account_info()
            .try_borrow_mut_lamports()? -= escrow_account.amount;

        **ctx
        .accounts
        .taker
        .to_account_info()
        .try_borrow_mut_lamports()? += escrow_account.amount;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeEscrow<'info> {
    // maker
    #[account(mut)]
    pub maker: Signer<'info>,

    // escrow
    #[account(
        init,
        payer = maker,
        space = 8 + 8 + 32, // 8 Discriminator Anchor + 8 + 32
        seeds = [b"escrow", maker.key().as_ref()],
        bump // PDA unique et déterministe
    )]
    pub escrow_account: Account<'info, EscrowAccount>,

    //program_system
    pub system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct AcceptEscrow<'info> {
       // maker
       /// CHECK: Je veux verifier que l'addresse est bien cette du maker dans l'ecrow
       #[account(
        mut,
        address = escrow_account.maker
        )]
       pub maker: AccountInfo<'info>,
   
       // escrow
       #[account(
           mut,
           seeds = [b"escrow", escrow_account.maker.as_ref()],
           bump, // PDA unique et déterministe
           close = maker
       )]
       pub escrow_account: Account<'info, EscrowAccount>,

       #[account(mut)]
       pub taker: Signer<'info>, 
   
       //program_system
       pub system_program: Program<'info, System>
}

#[account]
pub struct EscrowAccount {
    amount: u64, // Montant en lamport SOL que le maker va déposer
    maker: Pubkey // Wallet du maker
}