# StellarGuard.me

Announcing StellarGuard.me, an app that secures your precious XLM by using Stellar's multisignatures and two factor authentication.

StellarGuard is currently available for testing using Stellar's testnet at: https://test.stellarguard.me and will be available for the public net by March 15.

## Project Motivation and Goals

Every time I enter my secret key to sign a transaction I get a sense of dread that it might be intercepted or stolen by a hacker and all of my XLM would be gone. After the Blackwallet hack, it became clear to me that there are so many different attack vectors on the web that there needed to be a way to keep your XLM safe even if your computer or wallet was compromised. Thankfully, Stellar multisignatures can help make that possible, but you still need a safe and secure way to handle the 2nd signature. That's where StellarGuard comes in.

StellarGuard was built with 3 driving principles in mind:

1. Your XLM should be safe even if your computer is hacked and your secret key is stolen.
2. Your XLM should be safe even if StellarGuard is hacked and it's secret keys are stolen. The only way you should ever be able to lose your XLM is if someone gets your secret key AND StellarGuard's.
3. StellarGuard should be able to work with other wallets, including paper wallets. Its primary goal is not to be a wallet itself, but to add an additional layer of protection.

## How it works

1. Sign up for a StellarGuard account
2. Add a StellarGuard public key as an additional signer to your Stellar Account.
3. Submit your half-signed transactions directly to StellarGuard.
4. Enter your authorization code (emailed to you, or authenticator app).
5. StellarGuard signs the transaction and submits it to horizon.

## Two Factor Authorization

StellarGuard currently supports two methods for authorizing transactions.

1. Email: An authorization code is emailed to you when you submit a transaction.
2. Authenticator: A rotating passcode from a supported authenticator app must be entered to authorize a transaction.

## Screenshots

(Coming Soon)

## Work still to be done

1. Make it easier to deactivate StellarGuard (currently you must build a transaction manually to remove the StellarGuard signer)
2. Optionally allow you to build and sign transactions in the app itself (client side only) so you don't have to be copy/pasting XDRs around
3. Wallet Integrations - contact Stellar wallet developers to see if they'd be interested in integrating StellarGuard. It's a simple API call to submit the transaction to StellarGuard instead of to Horizon.
4. UI/UX improvements. Looking for feedback on this. If anyone has suggestions for improvements please let me know!
5. Get it live on production/public network
