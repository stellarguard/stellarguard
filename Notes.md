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

[] Have first-class response objects in controllers
[] Drastically improve TFA strategy code... it sucks
[] Standardize how create works -- do i need to pass a full class, or just props?
[] change StellarAccount to Account
[] middleware for fetching objects
[] get case sensitivity on everything -- usernames, email
[] Error codes and standardized errors

NEXT:

Next Steps
= UI

* Verify email page just says "HELLO THERE"
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
