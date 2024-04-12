---
title: iOS Provisioning Profiles
---

### Types of profiles

 * __Development__ - deploy to an iPhone via XCode
 * __Adhoc__ - deploy via testflightapp.com
 * __Appstore__ - only used for submitting to the app store

### Requirements

| What            | Dev | Adhoc | Appstore |
|-----------------|-----|-------|----------|
| CSR file        |     | √     | √        |
| Device UDIDs    | √   | √     |          |
| Developers list | √   |       |          |

### Obtaining a CSR file

Needed for Adhoc & Appstore builds.

 * Open *Keychain Access.app*
 * *Keychain Access* menu -> *Certificate Assistant* menu -> *Request a 
 certificate...*
   * User email address is *your email*
   * Common name is *your name*
   * CA Email address is *blank*
   * Request is *Saved to disk*

### Get the `.cer` files

Needed for Adhoc & Appstore builds.

 * in the iOS dev portal, go to *Certificates*, and download the certificate.  
 Install it on the dev machine.

### Obtaining device UDIDs

Needed for Dev and Adhoc builds.

 * via iTunes: http://whatsmyudid.com
 * via XCode: cmd+shift+2 (Organizer), Devices

For developers
--------------

Don't ever ask Xcode to *Fix issue...* for you.

### Using a provisioning profile

No need to use `.mobileprovision` files since XCode 5.

 * Open the `*.mobileprovision` file using Finder
 * XCode Project -> *Build settings* tab -> *Code signing* section -> 
 *Provisioning Profile* section
   * Set *Debug* to the *development* profile
   * Set *Release* to the *ad-hoc* profile

### Building an .ipa (Adhoc or Appstore)

  * In the toolbar, select "iOS Device" as the target
  * *Product* menu -> *Archive*
  * In the Organizer (Cmd+Shift+2) -> *Archives* tab -> *Distribute...* button
