// Importation des dépendances nécessaires
use anchor_lang::prelude::*;
use anchor_spl::{
    associated_token::AssociatedToken,
    token::{Mint, Token, TokenAccount},
};

// Déclaration de l'ID du programme
declare_id!("8HVZGqEij8joAH1h9SuzkcdKgtkpwc4cxKumm1GHERo");

#[program]
pub mod create_token {
    use super::*;

    // Initialise une nouvelle monnaie avec un nombre de décimales spécifié ou par défaut
    pub fn initialize_mint(ctx: Context<InitializeMint>, decimals: Option<u8>) -> Result<()> {
        let decimals = decimals.unwrap_or(6);
        msg!(
            "Created mint with {} decimals: {:?}",
            decimals,
            ctx.accounts.mint.key()
        );
        Ok(())
    }

    // Frappe de nouveaux jetons et les envoie à un compte spécifié
    pub fn mint_token(ctx: Context<MintToken>, amount: u64) -> Result<()> {
        // Préparation des comptes pour le minting
        let mint_accounts = anchor_spl::token::MintTo {
            mint: ctx.accounts.mint.to_account_info(),
            to: ctx.accounts.token_account.to_account_info(),
            authority: ctx.accounts.mint_authority.to_account_info(),
        };

        // Création du contexte CPI pour l'instruction de minting
        let cpi_ctx = CpiContext::new(ctx.accounts.token_program.to_account_info(), mint_accounts);

        // Exécution de l'instruction de minting
        anchor_spl::token::mint_to(cpi_ctx, amount)?;

        msg!(
            "Minted {} tokens to {}",
            amount,
            ctx.accounts.token_account.key()
        );
        Ok(())
    }
}

// Structure de validation des comptes pour l'initialisation de la monnaie
#[derive(Accounts)]
#[instruction(decimals: Option<u8>)]
pub struct InitializeMint<'info> {
    // Compte de la monnaie à initialiser
    #[account(
        init,
        payer = payer,
        mint::decimals = decimals.unwrap_or(6),
        mint::authority = mint_authority,
    )]
    pub mint: Account<'info, Mint>,

    // Autorité qui pourra frapper de nouveaux jetons
    pub mint_authority: Signer<'info>,

    // Compte qui paie les frais de transaction
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

// Structure de validation des comptes pour le minting de jetons
#[derive(Accounts)]
pub struct MintToken<'info> {
    // Compte de la monnaie source
    #[account(mut)]
    pub mint: Account<'info, Mint>,

    // Compte de jetons associé qui recevra les jetons
    #[account(
        init_if_needed,
        payer = payer,
        associated_token::mint = mint,
        associated_token::authority = token_owner,
    )]
    pub token_account: Account<'info, TokenAccount>,

    // Propriétaire du compte de jetons
    pub token_owner: SystemAccount<'info>,

    // Vérification que l'autorité de minting est correcte
    #[account(
        constraint = mint_authority.key() == mint.mint_authority.unwrap()
    )]
    pub mint_authority: Signer<'info>,

    // Compte qui paie les frais de transaction
    #[account(mut)]
    pub payer: Signer<'info>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub rent: Sysvar<'info, Rent>,
}
