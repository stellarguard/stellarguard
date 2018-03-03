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

Nice to Have
[] Known accounts list -- warn if it's unknown or someone you haven't sent to before
[] Expiring transactions
[] One-time-use of totp codes

https://cloud.google.com/kms/

PROTECTED ACCOUNT:

// GAGFWJVTYUEPG7EQCUET5CI2AAATOLLYLXUWIHF6JRD2SQXN3EJGVNGL SDZ3UUJHTHWCMTW63PF4P42TEHHD7BC4OTTIBBLKXXB4EIZFN7XKFGFC

//GABVLZKTQOAKX4WRE6P6YVSOQ4WADFLF3IGQS5FGOMHKMLQXOVTTFOUT
SDKXD6MW5SCFM6CQXZSGALA5QMAPGETQW34EDO5LWO7QDLSU3HC3CZTQ

GBM2UYNQQJITSXIYA7SKRXJ4Z5APVS7X7EWZ72EBTJ2SG7W6ONBRDA2V
SDW6MSTMUYFRT7UB4K63X6QQNM4XT6KE4AH22HOZINIGFZYTJTTJS5IV

pselden4@gmail.com
GDM44B674RGB27TO2IBZL6TQNHDEWM7OJZMEXQR4CZ7QCHFVP6B2WOAX
SCGJAARQ35WE36EAT5PSCJZ3XLC2MPBOA3B37EREZXTJDT3ISYSIKVV6

TODO:
Proper Order:

@withStyles(styles)
@withRouter
@inject('rootStore')
@observer

Cloud Sql

cloud_sql_proxy -instances=stellarguard-test:us-central1:stellarguard=tcp:5432

source .env.test && db-migrate -e test

Home Page:

* Try out on test net
* Brief "what's this"

Footer:

Contact Us
FAQ
Donations
