use anchor_lang::prelude::*;

declare_id!("98bqNzo1m1KGGS7E5AojHF7AohYB5uCMtY6FVaSR85RG");

#[program]
pub mod hello_world {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        msg!("Greetings from: {:?}", ctx.program_id);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize {}
