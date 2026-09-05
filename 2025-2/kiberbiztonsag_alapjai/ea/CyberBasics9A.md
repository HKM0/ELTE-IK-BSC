# Cybersecurity Basics
## Mobile Security Fundamentals

**Understanding Threats, Protections, and Best Practices**

## **What Will You Learn?**
**Your Journey into Mobile Security**
* **Foundations:** 
    - Why it matters, 
    - Key challenges,
    - Real incidents
* **Threats:** 
    - Types of attacks, 
    - Risks
* **Protection:** 
    - Authentication, 
    - Best practices, 
    - Security tools

## **Why Mobile Security Matters**
* **The Stakes Are High:** Your mobile device knows more about you than any other device you own!

* **What's At Risk:**
  * Banking credentials
  * Health data
  * Personal messages
  * Location history
  * Photos and videos

![mobile_security_matters](img\10\01.png)

## **Unique Challenges in Mobile Security**
* **Personal Data Hub:** Concentrated storage of sensitive information
* **Always Connected:** Constant connection to several networks of various types and security levels
* **Physical Mobility:** Risk of loss, theft, shoulder surfing
* **Resource Limits:** Limited processing power, battery life
* **App Ecosystem:** Diverse sources, quality, and security

## **Mobile Security Threat Landscape**
* **Critical Threats:**
  * Social Engineering
  * Phishing attacks
  * Malicious apps
* **Network Attacks:**
  * Man-in-the-middle
  * Rogue access points
* **Malware & APTs:**
  * Banking trojans
  * Spyware
* **High-Risk Vectors:** 
  * Unsecured Wi-Fi networks
  * Malicious apps
  * Unpatched vulnerabilities
  * Physical device access
* **Impact:** Financial loss, Data theft, Privacy breaches, Identity theft

## **First Mobile Malware: Cabir (2004)**
* **Key Characteristics:**
  * First mobile worm targeting Symbian OS
  * Spread via Bluetooth
  * Displayed "Caribe" on startup
* **Impact:** 
  * Proof-of-concept for mobile malware
  * UI disruption from repeated popups
* **Variants:** Mabir (Enhanced version that could spread via: Bluetooth, MMS, .sis files)
* **Historical Significance:** Demonstrated mobile devices' vulnerability to malware, leading to increased focus on mobile security

## **Real-World Case Study: FluBot Banking Malware (2020-2022)**
* **Attack Vector:**
  * Fake SMS about package delivery/voicemail
  * Malicious app installation request
  * Requests accessibility permissions
  * Spreads via contact list access
* **Impact:**
  * Widespread infections (Spain, Finland, AU, JP)
  * Banking credentials stolen
  * Cryptocurrency theft
  * Taken down by Europol (June 2022, 11 countries)
* **Key Warning Signs:** 
  * Link in SMS to install app
  * Request for accessibility access

## **Real-World Case Study: Pegasus Spyware (2021–)**
![pegasus_news](img\10\02.png)
* **Characteristics:**
  * Zero-click exploitation
  * Targeted journalists, activists, politicians
  * Complete device compromise

![pegasus_news](img\10\03.png)
  * Multiple OS vulnerabilities
  * Advanced persistence techniques

## **Case Study: DarkSword (2025-2026)**
![pegasus_news](img\10\04.png)
* **6-Stage Zero-Click Exploit Chain:**
  * JavaScript on malicious / compromised websites
  * No app install needed
  * RCE → Sandbox Escape → Kernel Privilege Escalation
* **Spyware Democratization:** Government-grade exploit kits increasingly shared among commercial vendors and criminal groups

## **Real-World Case Study: SparkCat (2025)**
* **How It Worked:**
  * Malicious SDK embedded in otherwise legitimate apps
  * Published on both Google Play and the App Store
  * Used on-device OCR to scan the user's screenshots
* **Scale:** Infected apps downloaded hundreds of thousands of times (Discovered by Kaspersky, late 2024).
* **Key Lesson:** Official app stores are not a guarantee of safety—malicious SDKs can slip past review.
* **User Takeaway:** Never store secrets unencrypted—even as screenshots.

## **Mobile Authentication Evolution**

![auth_evolution](img\10\05.png)

* **Past (1990s-2000s):** Password only (Text passwords, Simple PINs, Patterns)
* **Present (2010s+):** Multi-factor (Two-factor auth, Biometrics, Hardware tokens, Passkeys)
* **Future (?):** Behavioral (Passwordless, Continuous auth, Context-aware)

## **Security vs. Usability Trade-offs**
* **The Eternal Balance:** Strong security often comes at the cost of convenience, while maximum usability may compromise protection.
* **High Security:** 
  * Complex passwords (+security, -usability)
  * Multiple authentication factors (+security, -speed)
* **High Usability:** 
  * Biometric auth (+speed, -recovery options)
  * Longer session timeouts (+convenience, -security)

## **Security Features Compared**
![auth_evolution](img\10\06.png)
* **Developer Note:** Always request minimum necessary permissions and explain why they're needed!

## **App Permissions Example: AndroidManifest.xml**
Lists metadata about an app including permissions that could be requested.
*Example: Street Complete (excerpt)*
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="[http://schemas.android.com/apk/res/android](http://schemas.android.com/apk/res/android)" xmlns:tools="h">
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
    <uses-feature android:name="android.hardware.location.gps" android:required="false" />
    <uses-feature android:glEsVersion="0x00030000" android:required="true" />
    <application
        android:name="de.westnordost.streetcomplete.StreetCompleteApplication"
        android:allowBackup="false"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name">
        <activity android:name="de.westnordost.streetcomplete.screens.main.MainActivity">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>
</manifest>
```

## Mobile Network Security Landscape

- `Cellular` 3G/4G/5G, encrypted by default
- `Wi-Fi` Various security standards (WEP → WPA3)
- `Bluetooth` Short-range, pairing-based security
- `NFC` Contactless payments, secure element
- `Satellite` Previously only custom frequencies and protocols, now Starlink can use LTE

*Each connection type has its own security considerations.*

## Public Wi-Fi: Friend or Foe? (Reminder)

**Dangers**
- Man-in-the-middle attacks
- Evil twin networks
- Packet sniffing

**Protections**
- HTTPS – TLS certificate validation
- Disable auto-connect
- VPN

## Understanding VPNs: Reality vs. Marketing

**Actual Benefits**
- Hides IP from visited sites
- Encrypts traffic from ISP
- Bypasses geo-restrictions
- Protection on public Wi-Fi

**Limitations**
- Sites may still track you (fingerprinting)
- VPN provider can see traffic
- Slower connection

**Important Note**
You’re still trusting someone - instead of your ISP, you’re trusting your VPN provider

- Consider: Free VPNs often monetize by selling user data
- HTTPS already encrypts most important traffic

## Core Mobile Security Features

**Foundation of Mobile Security**
Mobile security is built upon hardware, software, and user-facing fea-
tures

**Hardware Security**
- Secure enclaves
- Biometric sensors
- Hardware-backed keys

**Storage Security**
- Full disk encryption
- File-based encryption
- AES-256 standards

**Software Security**
- Secure boot process
- App sandboxing
- App permissions
- Code signing
- Security updates

**Key Principle**
Security features work together in layers.


## Biometric Authentication

**Fingerprint**
- Capacitive/ultrasonic sensors
- Under-display technology
- Template protection

**Face Recognition**
- 2D vs 3D sensing
- IR dot projection
- Liveness detection

**Security Note**
Biometric data never leaves the secure hardware - only template matching occurs


## Encrypted Storage Implementation

| | |
|---|---|
| Full Disk Encryption | Entire device encrypted;  Single key for all data; Boot-time protection |
| File-Based Encryption | Different keys per file; Granular access control; Better performance |

**Encryption Standards**
Modern devices use AES-256 with hardware acceleration

## Secure Boot Process

![auth_evolution](img\10\07.png)

**Chain of trust:**
- Hardware root of trust
- Verify the signature of the next stage
- Continue to the next stage, repeat

**Critical Function**
Prevents boot-time malware and system modifications



## Secure Boot Process

![auth_evolution](img\10\08.png)

**Chain of trust:**
- Hardware root of trust
- Verify the signature of the next stage
- Continue to the next stage, repeat

**Critical Function**
Prevents boot-time malware and system modifications


## Check Your Device Settings
**Essential Security Settings to Verify**
- System and app updates
- App permissions and privacy controls
- Lost device protection
- Screen lock and biometric authentication
- Backups!

**Hands-On**
Take a moment to check these settings on your device. Which applications have access to your location, camera, or contacts? Is your data backed up?

