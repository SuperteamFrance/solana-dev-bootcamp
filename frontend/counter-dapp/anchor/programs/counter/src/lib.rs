#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("EFiNutCg61xZtpWd2LtZvn93yKDinVwKZQE4vAD1frYz");

#[program]
pub mod counter {
    use super::*;

  pub fn close(_ctx: Context<CloseCounterdapp>) -> Result<()> {
    Ok(())
  }

  pub fn decrement(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.counter.count = ctx.accounts.counter.count.checked_sub(1).unwrap();
    Ok(())
  }

  pub fn increment(ctx: Context<Update>) -> Result<()> {
    ctx.accounts.counter.count = ctx.accounts.counter.count.checked_add(1).unwrap();
    Ok(())
  }

  pub fn initialize(_ctx: Context<InitializeCounterdapp>) -> Result<()> {
    Ok(())
  }

  pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
    ctx.accounts.counter.count = value.clone();
    Ok(())
  }
}

#[derive(Accounts)]
pub struct InitializeCounterdapp<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  init,
  space = 8 + Counterdapp::INIT_SPACE,
  payer = payer
  )]
  pub counter: Account<'info, Counterdapp>,
  pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseCounterdapp<'info> {
  #[account(mut)]
  pub payer: Signer<'info>,

  #[account(
  mut,
  close = payer, // close account and return lamports to payer
  )]
  pub counter: Account<'info, Counterdapp>,
}

#[derive(Accounts)]
pub struct Update<'info> {
  #[account(mut)]
  pub counter: Account<'info, Counterdapp>,
}

#[account]
#[derive(InitSpace)]
pub struct Counterdapp {
  count: u8,
}
