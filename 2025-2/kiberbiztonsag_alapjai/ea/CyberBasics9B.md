# **Cybersecurity Basics**
## Security of Embedded and IoT Devices

**Introduction to Cybersecurity Challenges in the Connected World**

## **What are Embedded Devices and IoT?**
![embeded_devices_and_iot](img\11\01.png)
* **Embedded Devices:**
  * Purpose-built computers
  * Limited resources
  * Real-time operations
* **IoT Devices:**
  * Connected embedded devices
  * Internet connectivity
  * Sensor integration
* **Examples:** Smart home devices, industrial sensors, medical devices

## **Real-World IoT Security Incidents**
![embeded_devices_and_iot_2](img\11\02.png)
* 2016: Mirai botnet takes down major websites

![embeded_devices_and_iot_3](img\11\03.png)
* 2016: Mirai botnet takes down major websites
* 2017: Casino hacked through IoT fish tank

![embeded_devices_and_iot_4](img\11\04.png)
* 2016: Mirai botnet takes down major websites
* 2017: Casino hacked through IoT fish tank
* Medical device vulnerabilities (as discussed before)

![embeded_devices_and_iot_5](img\11\05.png)
- 2016: Mirai botnet takes down major websites
- 2017: Casino hacked through IoT fish tank
- Medical device vulnerabilities (as discussed before)
- 2022: Eufy webcam data leak

![embeded_devices_and_iot_6](img\11\06.png)
* 2024: Pagers

![embeded_devices_and_iot_7](img\11\07.png)

- 2024: Pagers
- 2025: BadBox 2.0

![embeded_devices_and_iot_8](img\11\08.png)

- 2024: Pagers
- 2025: BadBox 2.0
- 2025–2026: Aisuru-Kimwolf Botnet
  IoT botnet; record **31.4 Tbps** DDoS attack

## **Threat Landscape and Security Impact**
* **Threats:**
  * Botnets
  * Data breaches, privacy violations
  * Entry point into network
  * Supply chain vulnerabilities
  * Physical tampering
* **Key Point:** Security failures in IoT can cascade into widespread consequences!
* **Prevention:** Security by design, regular updates, and following industry best practices

## **Challenges in Securing IoT Devices**
* **Resource Constraints:** Limited processing power, memory, and energy
* **Cost:** Security features add to the bill of materials
* **Connectivity:** Always-on nature increases attack surface
* **Scale:** Billions of devices need security management

## **Hardware Security Considerations (Reminder)**
* **Attack Surfaces:**
  * Physical (JTAG, debug headers)
  * Side-Channel (power analysis, EMI)
  * Invasive (chip decapping, fault injection)
* **Protection Measures:**
  * Secure enclosures
  * Tamper-evident seals
  * Protected ports
  * Security fuses

## **IoT Communication Landscape**
* **Short Range:** 
    * Bluetooth LE, 
    * Zigbee, 
    * NFC

* **Long Range:** 
    * WiFi, 
    * LoRaWAN, 
    * Cellular (4G/5G)

*Each protocol brings its own security challenges and requirements!*

## **Common IoT Vulnerabilities**
* **Authentication:** 
    * Default passwords, 
    * Weak passwords, 
    * Hardcoded credentials

* **Network Services:** 
    * Unencrypted protocols, 
    * Insecure configurations, 
    * Outdated software

* **Updates & Components:** 
    * Insecure update mechanisms, 
    * Missing security patches, 
    * Outdated libraries

* **Data Protection:** 
    * Insufficient encryption, 
    * Insecure storage, 
    * Lack of physical protection

## **Accessing Your Smart Devices**
Different methods for interacting with your devices remotely, with varying security implications:

* **Local Only Access**
  * *Description:* Access only from within your home network (LAN/Wi-Fi).
  * *Pros:* Minimal attack surface.
  * *Cons:* No remote access.
* **VPN (e.g., WireGuard, OpenVPN, Tailscale, ZeroTier)**
  * *Description:* Secure, encrypted tunnel into your home network. (Mesh VPNs offer simpler setup).
  * *Pros:* Encrypted traffic, User authentication, Only one entry point.
  * *Cons:* Server setup/management, Additional app required, Provider trust (mesh VPN).
* **Cloud Tunnels (e.g., Cloudflare Tunnel, ngrok, zrok)**
  * *Description:* Outbound connection to provider; proxied remote access.
  * *Pros:* No open inbound ports, Hides public IP, Provider security (e.g. auth).
  * *Cons:* Provider trust (can even read HTTPS traffic), Potential cost.
* **Port Forwarding (Opening Ports)**
  * *Description:* Router forwards internet traffic directly to internal device.
  * *Pros:* No third-party reliance, Potentially lower latency.
  * *Cons:* Highest risk, Direct internet exposure.
* **Vendor Cloud (Often Default)**
  * *Description:* Access via manufacturer's app/portal, mediated by their servers.
  * *Pros:* Easy setup, No user network config.
  * *Cons:* Relies on vendor (cost?), Privacy concerns, Vendor breach risk, Service discontinuation.


## **Secure by Design Principles**
* **Security First:** Built-in, not bolted-on
* **Least Privilege:** Minimal required access
* **Defense in Depth:** Multiple security layers
* **Fail Secure:** Safe failure modes

**EU Cyber Resilience Act (2022-2027):** Mandates baseline security for products sold in the EU.
  * Secure default configuration
  * Security updates for the product's supported lifetime
  * Vulnerability disclosure obligations
    *Full application only by the end of 2027.*

**Remember:** Security decisions made during design impact the entire device lifecycle!

## **Lessons from Security Incidents**
* Default credentials enable massive botnets
* One weak device can compromise entire networks
* Poor update mechanisms leave devices exposed
* Supply chain vulnerabilities can be dangerous
* **Key Takeaway:** Prevention is always cheaper than recovery!
