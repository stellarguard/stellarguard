= Open questions =

Should I separate payments from verification?

* Allows users to pay without verifying.
* Lets you link payments to users instead of stellar accounts

= TODO =

[x] add email strategy as default when creating account
[] - wait until they verify their email?
[] - sanitize body of POST /tfa based on type
[] - log IP addresses
[] - add change email address to verify email card and user profile
[] - make sure they verify that they've set up google auth by entering the code when adding authenticator
[] - error handling when stellar account doesnt exist and getting account

= IDEAS =

* federation for verifications paul\*stellarguard.me -- be careful not to leak ids

= Code improvements =

[] Standardize how create works -- do i need to pass a full class, or just props?
[] change StellarAccount to Account
[] middleware for fetching objects
[] Error codes and standardized errors
[] Look into mobx-utils for state handling
[] standardize terminology of authorize vs verification -- ex: transactionVerificationType

NEXT:

Next Steps
= UI

= Postgres
= Google Domains
= Google App Engine
= Sendgrid

Nice to Have
[] Known accounts list -- warn if it's unknown or someone you haven't sent to before
[] Expiring transactions
[] One-time-use of totp codes

PROTECTED ACCOUNT:

// GAGFWJVTYUEPG7EQCUET5CI2AAATOLLYLXUWIHF6JRD2SQXN3EJGVNGL SDZ3UUJHTHWCMTW63PF4P42TEHHD7BC4OTTIBBLKXXB4EIZFN7XKFGFC

//GABVLZKTQOAKX4WRE6P6YVSOQ4WADFLF3IGQS5FGOMHKMLQXOVTTFOUT
SDKXD6MW5SCFM6CQXZSGALA5QMAPGETQW34EDO5LWO7QDLSU3HC3CZTQ
TODO:

* test errors for activating account
* OK button does nothing after activating stellar account
* add authenticator to sign in
