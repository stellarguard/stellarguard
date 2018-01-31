= Open questions =

Should I separate payments from verification?

* Allows users to pay without verifying.
* Lets you link payments to users instead of stellar accounts

= TODO =

[x] add email strategy as default when creating account
[] - wait until they verify their email?
[] sanitize body of POST /tfa based on type
[] idea -- federation for verification
[] - log IP addresses

= IDEAS =

* federation for verifications paul\*stellarguard.io -- naw... we're building this ourselves anyway

= Code improvements =

[] Have first-class response objects in controllers
[] Drastically improve TFA strategy code... it sucks
[] Standardize how create works -- do i need to pass a full class, or just props?
[] change StellarAccount to Account
[] middleware for fetching objects
[] get case sensitivity on everything
[]

NEXT:

Next Steps
= implement email verification
= Test End to End Scenario
= UI
= Postgres
= Google Domains
= Google App Engine
= Sendgrid
