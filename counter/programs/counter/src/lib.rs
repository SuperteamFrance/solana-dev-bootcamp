use anchor_lang::prelude::*;

declare_id!("3TTcv28paq43s4vgKHLCVZeqKUdxvtCggEQajJ3wjxVd");

#[program]
pub mod counter {
    use super::*;

    // Initialise un nouveau compteur à zéro
    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count = 0;
        msg!("Compteur initialisé avec la valeur: {}", counter.count);
        Ok(())
    }

    // Incrémente le compteur de 1
    pub fn increment(ctx: Context<Update>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count += 1;
        msg!("Compteur incrémenté à: {}", counter.count);
        Ok(())
    }

    // Décrémente le compteur de 1
    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        let counter = &mut ctx.accounts.counter;
        counter.count -= 1;
        msg!("Compteur décrémenté à: {}", counter.count);
        Ok(())
    }
}

// Structure pour l'initialisation du compte
#[derive(Accounts)]
pub struct Initialize<'info> {
    // Le compte du compteur à initialiser
    #[account(init, payer = user, space = 8 + 8)]
    pub counter: Account<'info, Counter>,
    // L'utilisateur qui paie pour la création du compte
    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

// Structure pour la mise à jour du compteur
#[derive(Accounts)]
pub struct Update<'info> {
    // Le compte du compteur à modifier
    #[account(mut)]
    pub counter: Account<'info, Counter>,
}

// Structure de données du compteur
#[account]
pub struct Counter {
    pub count: i64,
}
