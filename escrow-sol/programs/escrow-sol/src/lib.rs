use anchor_lang::prelude::*;
use anchor_lang::system_program;

declare_id!("Chut5skvT2DiHpNX6DPmaWLxe5UTg2HXwmmLczBTupjh");

#[program]
pub mod escrow_sol {
    use super::*;

    pub fn initialize_escrow(ctx: Context<InitializeEscrow>, amount: u64) -> Result<()> {
        // TODO: Store maker public key and amount in the escrow account
        // TODO: Transfer SOL from the maker to the escrow account
        Ok(())
    }

    pub fn accept_escrow(ctx: Context<AcceptEscrow>) -> Result<()> {
        // TODO: Transfer SOL from the escrow account to the taker
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeEscrow<'info> {
    
}

#[derive(Accounts)]
pub struct AcceptEscrow<'info> {
   
}

#[account]
pub struct EscrowAccount {

}
